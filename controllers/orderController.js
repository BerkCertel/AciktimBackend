const db = require('../models');
const db = require('../db');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = await db.order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Sipariş oluşturulurken hata oluştu.' });
    }
  },

  listOrders: async (req, res) => {
    try {
      const orders = await db.order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Siparişler listelenirken hata oluştu.' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await db.order.findByPk(req.params.orderId);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Sipariş bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş getirilirken hata oluştu.' });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await db.order.update(req.body, {
        where: { Order_Id: req.params.orderId },
        returning: true
      });
      if (updatedOrder[0] === 1) {
        res.json(updatedOrder[1][0]);
      } else {
        res.status(404).json({ message: 'Sipariş bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş güncellenirken hata oluştu.' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deletedOrder = await db.order.destroy({ where: { Order_Id: req.params.orderId } });
      if (deletedOrder === 1) {
        res.json({ message: 'Sipariş silindi.' });
      } else {
        res.status(404).json({ message: 'Sipariş bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş silinirken hata oluştu.' });
    }
  }
};

module.exports = OrderController;






