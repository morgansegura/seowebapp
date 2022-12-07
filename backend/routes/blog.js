const express = require('express');
const router = express.Router();

// [Controllers]
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create } = require('../controllers/blog');

router.post('/blog', requireSignin, adminMiddleware, create);

module.exports = router;
