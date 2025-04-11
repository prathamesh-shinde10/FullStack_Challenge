const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();
require('dotenv').config();

router.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, "normal")';

  db.query(query, [name, email, hashed, address], (err, results) => {
    if (err) return res.status(500).json({ message: 'Signup failed', error: err });
    res.status(201).json({ message: 'User registered' });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Login error' });
    if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
