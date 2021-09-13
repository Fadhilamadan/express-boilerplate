const express = require('express');
const app = express();

const authRouter = require('./auth');
const bookRouter = require('./book');

app.use('/auth/', authRouter);
app.use('/book/', bookRouter);

module.exports = app;
