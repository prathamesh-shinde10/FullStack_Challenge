const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/stores', (req, res) => {
  db.query(`
    SELECT s.id, s.name, s.address, COALESCE(AVG(r.rating), 0) as overall_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch stores' });
    res.json(results);
  });
});

router.get('/ratings/:storeId', (req, res) => {
  const storeId = req.params.storeId;
  const userId = req.user.id;
  db.query('SELECT * FROM ratings WHERE store_id = ? AND user_id = ?', [storeId, userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch rating' });
    res.json(results[0] || {});
  });
});

router.post('/ratings', (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;
  db.query('REPLACE INTO ratings (store_id, user_id, rating) VALUES (?, ?, ?)',
    [store_id, user_id, rating],
    (err) => err ? res.status(500).json({ message: 'Failed to submit rating' }) : res.json({ message: 'Rating submitted' }));
});

module.exports = router;
