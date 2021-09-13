const express = require('express');
const app = express();

const bookRouter = require('./book');

app.use('/book/', bookRouter);

module.exports = app;
