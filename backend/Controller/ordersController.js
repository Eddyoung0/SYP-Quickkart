import db from '../config/db.js';

const queryAsync = (sql, values = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });

const VALID_DELIVERY_STATUSES = ['processing', 'packed', 'shipped', 'out-for-delivery', 'delivered', 'cancelled'];
const VALID_PAYMENT_METHODS = ['card', 'esewa', 'khalti', 'ime-pay', 'bank-transfer', 'cash-on-delivery'];

const checkoutOrders = async (req, res) => {
  try {
    const { user_id, items, payment_method } = req.body;

    if (!user_id || Number.isNaN(Number(user_id))) {
      return res.status(400).json({ message: 'Valid user_id is required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'At least one cart item is required' });
    }

    const selectedMethod = String(payment_method || 'card').trim().toLowerCase();
    if (!VALID_PAYMENT_METHODS.includes(selectedMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    const paymentStatus = selectedMethod === 'cash-on-delivery' ? 'pending' : 'paid';
    const trackingNote =
      selectedMethod === 'cash-on-delivery'
        ? 'Order placed. Payment pending (Cash on Delivery).'
        : 'Order placed successfully';

    const normalizedItems = items
      .map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
      }))
      .filter((item) => Number.isFinite(item.product_id) && Number.isFinite(item.quantity) && item.quantity > 0);

    if (!normalizedItems.length) {
      return res.status(400).json({ message: 'Cart items must contain valid product_id and quantity' });
    }

    const userId = Number(user_id);

    const userRows = await queryAsync('SELECT id FROM users WHERE id = ?', [userId]);
    if (!userRows.length) {
      return res.status(400).json({ message: 'user_id does not exist in users table' });
    }

    const productIds = [...new Set(normalizedItems.map((item) => item.product_id))];
    const placeholders = productIds.map(() => '?').join(',');
    const productRows = await queryAsync(`SELECT id, price FROM products WHERE id IN (${placeholders})`, productIds);

    if (productRows.length !== productIds.length) {
      return res.status(400).json({ message: 'One or more product_id values do not exist' });
    }

    const productsMap = new Map(productRows.map((row) => [row.id, Number(row.price || 0)]));

    await queryAsync('START TRANSACTION');

    const insertedOrderIds = [];

    try {
      for (const item of normalizedItems) {
        const unitPrice = productsMap.get(item.product_id) || 0;
        const total = unitPrice * item.quantity;

        const result = await queryAsync(
          `INSERT INTO orders (
            user_id,
            product_id,
            quantity,
            total_price,
            payment_method,
            payment_status,
            delivery_status,
            tracking_note
          ) VALUES (?, ?, ?, ?, ?, ?, 'processing', ?)` ,
          [userId, item.product_id, item.quantity, total, selectedMethod, paymentStatus, trackingNote]
        );

        insertedOrderIds.push(result.insertId);
      }

      await queryAsync('COMMIT');
    } catch (insertErr) {
      await queryAsync('ROLLBACK');
      throw insertErr;
    }

    const idPlaceholders = insertedOrderIds.map(() => '?').join(',');
    const createdOrders = await queryAsync(
      `SELECT
        o.id,
        o.user_id,
        o.product_id,
        p.name AS product_name,
        p.image_url AS product_image,
        o.quantity,
        o.total_price,
        o.payment_method,
        o.payment_status,
        o.delivery_status,
        o.tracking_note,
        o.created_at,
        o.updated_at
      FROM orders o
      INNER JOIN products p ON p.id = o.product_id
      WHERE o.id IN (${idPlaceholders})
      ORDER BY o.id DESC`,
      insertedOrderIds
    );

    return res.status(201).json({
      success: true,
      message: 'Payment completed and orders created',
      data: createdOrders,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to complete checkout', error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId || Number.isNaN(userId)) {
      return res.status(400).json({ message: 'Valid user id is required' });
    }

    const rows = await queryAsync(
      `SELECT
        o.id,
        o.user_id,
        o.product_id,
        p.name AS product_name,
        p.image_url AS product_image,
        o.quantity,
        o.total_price,
        o.payment_method,
        o.payment_status,
        o.delivery_status,
        o.tracking_note,
        o.created_at,
        o.updated_at
      FROM orders o
      INNER JOIN products p ON p.id = o.product_id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC`,
      [userId]
    );

    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch user orders', error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const rows = await queryAsync(
      `SELECT
        o.id,
        o.user_id,
        u.name AS user_name,
        u.email AS user_email,
        o.product_id,
        p.name AS product_name,
        p.image_url AS product_image,
        o.quantity,
        o.total_price,
        o.payment_method,
        o.payment_status,
        o.delivery_status,
        o.tracking_note,
        o.created_at,
        o.updated_at
      FROM orders o
      INNER JOIN users u ON u.id = o.user_id
      INNER JOIN products p ON p.id = o.product_id
      ORDER BY o.created_at DESC`
    );

    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch all orders', error: err.message });
  }
};

const updateDeliveryStatus = async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const { delivery_status, tracking_note } = req.body;

    if (!orderId || Number.isNaN(orderId)) {
      return res.status(400).json({ message: 'Valid order id is required' });
    }

    if (!delivery_status || !VALID_DELIVERY_STATUSES.includes(delivery_status)) {
      return res.status(400).json({ message: 'Invalid delivery status' });
    }

    await queryAsync(
      'UPDATE orders SET delivery_status = ?, tracking_note = ? WHERE id = ?',
      [delivery_status, tracking_note?.trim() || null, orderId]
    );

    const rows = await queryAsync(
      `SELECT
        o.id,
        o.user_id,
        o.product_id,
        p.name AS product_name,
        p.image_url AS product_image,
        o.quantity,
        o.total_price,
        o.payment_method,
        o.payment_status,
        o.delivery_status,
        o.tracking_note,
        o.created_at,
        o.updated_at
      FROM orders o
      INNER JOIN products p ON p.id = o.product_id
      WHERE o.id = ?`,
      [orderId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ success: true, message: 'Delivery status updated', data: rows[0] });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update delivery status', error: err.message });
  }
};

export { checkoutOrders, getUserOrders, getAllOrders, updateDeliveryStatus, VALID_DELIVERY_STATUSES };
