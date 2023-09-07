const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const authMiddleware = require('../auth');

// Sipariş oluşturma
router.post('/order-create', authMiddleware, OrderController.createOrder);

// Tüm siparişleri listeleme
router.get('/order-list', authMiddleware, OrderController.listOrders);

// Sipariş detayını getirme
router.get('/order/:orderId', authMiddleware, OrderController.getOrderById);

// Siparişi güncelleme
router.put('/order/:orderId', authMiddleware, OrderController.updateOrder);

// Siparişi silme
router.delete('/order/:orderId', authMiddleware, OrderController.deleteOrder);

module.exports = router;