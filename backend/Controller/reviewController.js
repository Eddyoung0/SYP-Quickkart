import db from '../config/db.js';

const getReviews = (req, res) => {
  const query = `
    SELECT
      c.id,
      c.comment,
      c.created_at,
      COALESCE(u.name, 'Anonymous') AS user_name,
      COALESCE(p.name, 'Product') AS product_name
    FROM comments c
    LEFT JOIN users u ON c.user_id = u.id
    LEFT JOIN products p ON c.product_id = p.id
    ORDER BY c.created_at DESC
    LIMIT 12
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
    }

    return res.status(200).json({ success: true, data: results });
  });
};

const createReview = (req, res) => {
  const { user_id, product_id, comment } = req.body;

  if (!user_id || Number.isNaN(Number(user_id))) {
    return res.status(400).json({ message: 'Valid user_id is required' });
  }

  if (!product_id || Number.isNaN(Number(product_id))) {
    return res.status(400).json({ message: 'Valid product_id is required' });
  }

  if (!comment || !comment.trim()) {
    return res.status(400).json({ message: 'Comment is required' });
  }

  const userId = Number(user_id);
  const productId = Number(product_id);
  const normalizedComment = comment.trim();

  db.query('SELECT id, name FROM users WHERE id = ?', [userId], (userErr, userRows) => {
    if (userErr) {
      return res.status(500).json({ message: 'Failed to validate user', error: userErr.message });
    }

    if (!userRows.length) {
      return res.status(400).json({ message: 'user_id does not exist in users table' });
    }

    db.query('SELECT id, name FROM products WHERE id = ?', [productId], (productErr, productRows) => {
      if (productErr) {
        return res.status(500).json({ message: 'Failed to validate product', error: productErr.message });
      }

      if (!productRows.length) {
        return res.status(400).json({ message: 'product_id does not exist in products table' });
      }

      db.query(
        'INSERT INTO comments (product_id, user_id, comment) VALUES (?, ?, ?)',
        [productId, userId, normalizedComment],
        (insertErr, insertResult) => {
          if (insertErr) {
            return res.status(500).json({ message: 'Failed to create review', error: insertErr.message });
          }

          const createdQuery = `
            SELECT
              c.id,
              c.comment,
              c.created_at,
              COALESCE(u.name, 'Anonymous') AS user_name,
              COALESCE(p.name, 'Product') AS product_name
            FROM comments c
            LEFT JOIN users u ON c.user_id = u.id
            LEFT JOIN products p ON c.product_id = p.id
            WHERE c.id = ?
          `;

          db.query(createdQuery, [insertResult.insertId], (fetchErr, createdRows) => {
            if (fetchErr) {
              return res.status(500).json({ message: 'Review created, but failed to fetch created record', error: fetchErr.message });
            }

            return res.status(201).json({ success: true, message: 'Review created successfully', data: createdRows[0] });
          });
        }
      );
    });
  });
};

export { getReviews, createReview };
