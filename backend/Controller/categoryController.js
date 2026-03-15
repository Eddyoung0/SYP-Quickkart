import db from '../config/db.js';

const getCategories = (req, res) => {
  db.query('SELECT id, name, created_at FROM categories ORDER BY id DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
    }
    return res.status(200).json({ success: true, data: results });
  });
};

const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  db.query('INSERT INTO categories (name) VALUES (?)', [name.trim()], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create category', error: err.message });
    }

    db.query(
      'SELECT id, name, created_at FROM categories WHERE id = ?',
      [result.insertId],
      (fetchErr, rows) => {
        if (fetchErr) {
          return res.status(500).json({ message: 'Category created, but failed to fetch created record', error: fetchErr.message });
        }
        return res.status(201).json({ success: true, message: 'Category created successfully', data: rows[0] });
      }
    );
  });
};

export { getCategories, createCategory };
