const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


// Import routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/routes');
const trendingRoutes = require('../backend/routes/routes');
const cartRoutes = require('../backend/routes/routes');
const wishlistRoute = require('../backend/routes/routes');
const connectMongo = require('./db');
const orderRoute = require('../backend/routes/routes');
const audioRoutes = require('../backend/routes/routes');
const adminRoutes = require('../backend/routes/admin');

// Middleware
app.use(cors({
  origin: "https://vedpath.netlify.app", // your Netlify frontend URL
  credentials: true
}));
app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send("Server is running");
});
app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/trending', trendingRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoute);
app.use('/order', orderRoute);
app.use('/audio', audioRoutes);
app.use('/admin',adminRoutes);

connectMongo();

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
