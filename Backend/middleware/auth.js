const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

exports.isOwner = (req, res, next) => {
  if (req.user?.role !== 'owner') return res.status(403).json({ message: 'Owner access required' });
  next();
};

exports.isUser = (req, res, next) => {
  if (req.user?.role !== 'normal') return res.status(403).json({ message: 'User access required' });
  next();
};
