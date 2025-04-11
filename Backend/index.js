const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const ownerRoutes = require('./routes/owner');
const { verifyToken } = require('./middleware/auth');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', verifyToken, adminRoutes);
app.use('/user', verifyToken, userRoutes);
app.use('/owner', verifyToken, ownerRoutes);

// Test DB Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    process.exit(1);
  } else {
    console.log('✅ Connected to MySQL database');
    connection.release();
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

