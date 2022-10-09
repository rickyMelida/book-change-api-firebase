const express = require('express');

const bookRouter = require('./book');
const authRouter = require('./auth');
const userRoutes = require('./user');

const router = express();

router.use('/book', bookRouter);
router.use('/auth', authRouter);
router.use('/user', userRoutes);

module.exports = router;