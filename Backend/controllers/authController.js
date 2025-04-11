const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.signup = async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address)
    return res.status(400).json({ message: 'All fields required' });

  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, "normal")',
    [name, email, hashed, address],
    (err) => {
      if (err) return res.status(500).json({ message: 'Signup failed' });
      res.status(201).json({ message: 'User registered' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, users) => {
    if (err || users.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
};
