const express = require('express');
const router = express.Router();
const PaymentTypeController = require('../controllers/paymentTypeController');
const authMiddleware = require('../auth');

// Ödeme türü oluşturma
router.post('/payment-create',authMiddleware, PaymentTypeController.createPaymentType);

// Tüm ödeme türlerini listeleme
router.get('/payment-list',authMiddleware, PaymentTypeController.listPaymentTypes);

// Ödeme türü detayını getirme
router.get('/payment/:paymentTypeId',authMiddleware, PaymentTypeController.getPaymentTypeById);

// Ödeme türünü güncelleme
router.put('/payment/:paymentTypeId',authMiddleware, PaymentTypeController.updatePaymentType);

// Ödeme türünü silme
router.delete('/payment/:paymentTypeId',authMiddleware, PaymentTypeController.deletePaymentType);

module.exports = router;