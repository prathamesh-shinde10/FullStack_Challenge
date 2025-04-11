const db = require('../config/db');

exports.getRatings = (req, res) => {
  const ownerId = req.user.id;
  db.query(`
    SELECT r.*, u.name AS user_name, s.name AS store_name
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
  `, [ownerId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Owner ratings error' });
    res.json(results);
  });
};

exports.getStoreRating = (req, res) => {
  const ownerId = req.user.id;
  db.query(`
    SELECT s.name, COALESCE(AVG(r.rating), 0) as average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.owner_id = ?
    GROUP BY s.id
  `, [ownerId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Store rating error' });
    res.json(results);
  });
};
