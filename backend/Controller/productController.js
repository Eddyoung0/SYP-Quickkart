import db from '../config/db.js';

const getProducts = (req, res) => {
  db.query('SELECT id, name, price, description, created_at FROM products ORDER BY id DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
    return res.status(200).json({ success: true, data: results });
  });
};

const createProduct = (req, res) => {
  const { name, price, description } = req.body;

  if (!name || price === undefined || price === null || Number.isNaN(Number(price))) {
    return res.status(400).json({ message: 'Name and valid price are required' });
  }

  const normalizedDescription = description?.trim() || null;

  db.query(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name.trim(), Number(price), normalizedDescription],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create product', error: err.message });
      }

      db.query(
        'SELECT id, name, price, description, created_at FROM products WHERE id = ?',
        [result.insertId],
        (fetchErr, rows) => {
          if (fetchErr) {
            return res.status(500).json({ message: 'Product created, but failed to fetch created record', error: fetchErr.message });
          }
          return res.status(201).json({ success: true, message: 'Product created successfully', data: rows[0] });
        }
      );
    }
  );
};

export { getProducts, createProduct };
