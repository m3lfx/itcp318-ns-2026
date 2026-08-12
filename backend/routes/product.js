const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const {
    newProduct,
} = require('../controllers/product');

router.post('/admin/product/new', upload.array('images', 10), newProduct);

module.exports = router