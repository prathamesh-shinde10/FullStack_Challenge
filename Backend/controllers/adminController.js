const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getDashboard = async (req, res) => {
  try {
    const [userCount] = await db.promise().query('SELECT COUNT(*) as total FROM users');
    const [storeCount] = await db.promise().query('SELECT COUNT(*) as total FROM stores');
    const [ratingCount] = await db.promise().query('SELECT COUNT(*) as total FROM ratings');

    res.json({
      users: userCount[0].total,
      stores: storeCount[0].total,
      ratings: ratingCount[0].total,
    });
  } catch (err) {
    res.status(500).json({ message: 'Dashboard error', error: err });
  }
};

exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashed, address, role],
    (err) => err ? res.status(500).json({ message: 'Add user failed' }) : res.json({ message: 'User added' }));
};

exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;
  db.query('INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
    [name, email, address, owner_id],
    (err) => err ? res.status(500).json({ message: 'Add store failed' }) : res.json({ message: 'Store added' }));
};
