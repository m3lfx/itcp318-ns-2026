const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const {
    newProduct,
    getSingleProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getAdminProducts

} = require('../controllers/product');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')


router.post('/admin/product/new', isAuthenticatedUser, upload.array('images', 10), newProduct);
router.get('/product/:id', getSingleProduct)
router.get('/products', getProducts)
router.put('/admin/product/:id', isAuthenticatedUser, upload.array('images', 10), updateProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, deleteProduct);
router.get('/admin/products', getAdminProducts)
module.exports = router