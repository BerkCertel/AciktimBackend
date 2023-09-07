const db = require('../models');
const db = require('../db');
const { generateToken } = require('../auth');

const UserController = {
  createUser: async (req, res) => {
    try {
      const newUser = await db.user.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Kullanıcı oluşturulurken hata oluştu.' });
    }
  },

  listUsers: async (req, res) => {
    try {
      const users = await db.user.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Kullanıcılar listelenirken hata oluştu.' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await db.user.findByPk(req.params.userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Kullanıcı getirilirken hata oluştu.' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await db.user.update(req.body, {
        where: { User_Id: req.params.userId },
        returning: true
      });
      if (updatedUser[0] === 1) {
        res.json(updatedUser[1][0]);
      } else {
        res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Kullanıcı güncellenirken hata oluştu.' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await db.user.destroy({ where: { User_Id: req.params.userId } });
      if (deletedUser === 1) {
        res.json({ message: 'Kullanıcı silindi.' });
      } else {
        res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Kullanıcı silinirken hata oluştu.' });
    }
  },

  loginUser: async (req, res) => {
    const { UserName, Passwords } = req.body;

    try {
      const user = await db.user.findOne({ where: { UserName, Passwords } });

      if (user) {
        const token = generateToken(user); // Token oluşturuluyor
        res.json({ message: 'Login successful', token }); // Token yanıt olarak gönderiliyor
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  },

  registerUser: async (req, res) => {
    try {
      const newUser = await db.user.create(req.body);
      const token = generateToken(newUser); // Oluşturulan kullanıcı için token oluşturuluyor
      res.status(201).json({ message: 'User created', token }); // Token yanıt olarak gönderiliyor
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  }
};

module.exports = UserController;
