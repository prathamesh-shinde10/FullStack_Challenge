const db = require('../config/db');

exports.getRatingByStoreAndUser = (store_id, user_id, callback) => {
  db.query('SELECT * FROM ratings WHERE store_id = ? AND user_id = ?', [store_id, user_id], callback);
};

exports.submitRating = (store_id, user_id, rating, callback) => {
  db.query(
    'REPLACE INTO ratings (store_id, user_id, rating) VALUES (?, ?, ?)',
    [store_id, user_id, rating],
    callback
  );
};

exports.getOwnerRatings = (owner_id, callback) => {
  db.query(`
    SELECT r.*, u.name AS user_name, s.name AS store_name
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
  `, [owner_id], callback);
};
