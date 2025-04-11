const db = require('../config/db');

exports.findByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

exports.createUser = (userData, callback) => {
  const { name, email, password, address, role = 'normal' } = userData;
  db.query(
    'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, address, role],
    callback
  );
};
