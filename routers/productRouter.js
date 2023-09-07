const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authMiddleware = require('../auth');

// Ürün oluşturma
router.post('/product-create',authMiddleware, ProductController.createProduct);

// Tüm ürünleri listeleme
router.get('/product-list',authMiddleware, ProductController.listProducts);

// Ürün detayını getirme
router.get('/product/:productId',authMiddleware, ProductController.getProductById);

// Ürünü güncelleme
router.put('/product/:productId',authMiddleware, ProductController.updateProduct);

// Ürünü silme
router.delete('/product/:productId',authMiddleware, ProductController.deleteProduct);

module.exports = router;
