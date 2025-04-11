const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.get('/dashboard', (req, res) => {
  const queries = [
    'SELECT COUNT(*) as total FROM users',
    'SELECT COUNT(*) as total FROM stores',
    'SELECT COUNT(*) as total FROM ratings',
  ];

  Promise.all(queries.map(q => new Promise((resolve, reject) => {
    db.query(q, (err, results) => err ? reject(err) : resolve(results[0].total));
  })))
  .then(([users, stores, ratings]) => {
    res.json({ users, stores, ratings });
  })
  .catch(err => res.status(500).json({ message: 'Failed to fetch dashboard', error: err }));
});

router.post('/users', async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashed, address, role],
    (err) => err ? res.status(500).json({ message: 'Failed to add user' }) : res.json({ message: 'User added' }));
});

router.post('/stores', (req, res) => {
  const { name, email, address, owner_id } = req.body;
  db.query('INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
    [name, email, address, owner_id],
    (err) => err ? res.status(500).json({ message: 'Failed to add store' }) : res.json({ message: 'Store added' }));
});

router.get('/users', (req, res) => {
  const { name = '', email = '', role = '', address = '' } = req.query;
  const query = `
    SELECT id, name, email, address, role FROM users 
    WHERE name LIKE ? AND email LIKE ? AND role LIKE ? AND address LIKE ?
  `;
  db.query(query, [`%${name}%`, `%${email}%`, `%${role}%`, `%${address}%`], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch users' });
    res.json(results);
  });
});

router.get('/stores', (req, res) => {
  const { name = '', email = '', address = '' } = req.query;
  const query = `
    SELECT s.*, COALESCE(AVG(r.rating), 0) as rating 
    FROM stores s 
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.name LIKE ? AND s.email LIKE ? AND s.address LIKE ?
    GROUP BY s.id
  `;
  db.query(query, [`%${name}%`, `%${email}%`, `%${address}%`], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch stores' });
    res.json(results);
  });
});

module.exports = router;
