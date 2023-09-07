const express = require('express');
const router = express.Router();
const OrderdetailController = require('../controllers/orderdetailController');
const authMiddleware = require('../auth');

// Sipariş detayı oluşturma
router.post('/order-create',authMiddleware, OrderdetailController.createOrderdetail);

// Tüm sipariş detaylarını listeleme
router.get('/orderdetail-list',authMiddleware, OrderdetailController.listOrderdetails);

// Sipariş detayını getirme
router.get('/orderdetail/:orderdetailId',authMiddleware, OrderdetailController.getOrderdetailById);

// Sipariş detayını güncelleme
router.put('/orderdetail/:orderdetailId',authMiddleware, OrderdetailController.updateOrderdetail);

// Sipariş detayını silme
router.delete('/orderdetail/:orderdetailId',authMiddleware, OrderdetailController.deleteOrderdetail);

module.exports = router;
