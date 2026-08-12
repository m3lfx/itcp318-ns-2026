const express = require('express');
const app = express();
const cors = require('cors')
const products = require('./routes/product');

app.use(cors());
app.use('/api/v1', products);

module.exports = app