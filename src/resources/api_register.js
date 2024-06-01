const express = require('express');
const router = express.Router();
const pool = require('./settings');

router.post('/api/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username, and password are required' });
  }

  pool.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (error, results) => {
    if (error) {
      console.error('Error checking existing user:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'User with the same email or username already exists' });
    }

    pool.query('INSERT INTO users (email, username, password, type) VALUES (?, ?, ?, ?)', [email, username, password, 'buyer'], (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      console.log('User registered successfully');
      res.json({ message: 'User registered successfully' });
    });
  });
});

module.exports = router;
