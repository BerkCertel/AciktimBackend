const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../auth');

// Kullanıcı oluşturma
router.post('/user-create',authMiddleware, UserController.createUser);

// Tüm kullanıcıları listeleme
router.get('/user-list',authMiddleware, UserController.listUsers);

// Kullanıcı detayını getirme
router.get('/user/:userId',authMiddleware, UserController.getUserById);

// Kullanıcıyı güncelleme
router.put('/user/:userId',authMiddleware, UserController.updateUser);

// Kullanıcıyı silme
router.delete('/user/:userId',authMiddleware, UserController.deleteUser);

module.exports = router;