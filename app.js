const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/book');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const transactionRouter = require('./routes/transaction');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(/.*/, cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

});

app.use('/api', bookRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', transactionRouter);

module.exports = app;
