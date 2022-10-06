const express = require('express');

const bookRouter = require('./book');
const authRouter = require('./auth');

const router = express();

router.use('/books', bookRouter);
router.use('/auth', authRouter);

module.exports = router;