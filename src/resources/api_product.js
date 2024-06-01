const express = require('express');
const router = express.Router();
const pool = require('./settings');

// Route to fetch all products
router.get('/api/products', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    connection.query('SELECT * FROM products', (err, results) => {
      connection.release();

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.json(results);
    });
  });
});

// Route to like a product
router.put('/api/products/:id/like', (req, res) => {
  const productId = req.params.id;

  pool.query('UPDATE products SET likes = likes + 1 WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error updating likes:', error);
      return res.status(500).json({ error: 'Failed to update likes' });
    }
    res.json({ message: 'Likes incremented successfully' });
  });
});

// Route to add a new product
router.post('/api/products', (req, res) => {
  const { title, description, price, image, color } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const query = 'INSERT INTO products (title, description, price, image, color) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [title, description, price, image, color], (err, results) => {
      connection.release();

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
    });
  });
});

// Route to delete a product
router.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const query = 'DELETE FROM products WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      connection.release();

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    });
  });
});

// Route to update a product
router.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, price, image, color } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const query = 'UPDATE products SET title = ?, description = ?, price = ?, image = ?, color = ? WHERE id = ?';
    connection.query(query, [title, description, price, image, color, id], (err, results) => {
      connection.release();

      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.status(200).json({ message: 'Product updated successfully' });
    });
  });
});

module.exports = router;
