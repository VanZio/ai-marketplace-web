const express = require('express');
const router = express.Router();
const pool = require('./settings');

router.get('/api/users', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    connection.query('SELECT * FROM users', (err, results) => {
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

module.exports = router;
