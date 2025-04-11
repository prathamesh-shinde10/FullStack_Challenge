const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/ratings', (req, res) => {
  const ownerId = req.user.id;
  db.query(`
    SELECT r.*, u.name as user_name, s.name as store_name
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
  `, [ownerId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch ratings' });
    res.json(results);
  });
});

router.get('/store-rating', (req, res) => {
  const ownerId = req.user.id;
  db.query(`
    SELECT s.name, COALESCE(AVG(r.rating), 0) as average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.owner_id = ?
    GROUP BY s.id
  `, [ownerId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch rating' });
    res.json(results);
  });
});

module.exports = router;
