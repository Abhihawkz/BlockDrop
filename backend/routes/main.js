const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const postRoutes = require('./posts');

// Root route
router.get('/', (req, res) => {
  res.send('API is working');
});

// Use sub-routers
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
