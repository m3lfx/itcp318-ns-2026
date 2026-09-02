const express = require('express');
const app = express();
const cors = require('cors')
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1', products);
app.use('/api/v1', auth);

module.exports = app