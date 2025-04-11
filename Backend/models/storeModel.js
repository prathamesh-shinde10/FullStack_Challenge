const db = require('../config/db');

exports.getAllStores = (callback) => {
  db.query(`
    SELECT s.id, s.name, s.address, COALESCE(AVG(r.rating), 0) as overall_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `, callback);
};

exports.createStore = (storeData, callback) => {
  const { name, email, address, owner_id } = storeData;
  db.query(
    'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
    [name, email, address, owner_id],
    callback
  );
};
