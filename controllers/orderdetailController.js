const db = require('../models');
const db = require('../db');

const OrderdetailController = {
  createOrderdetail: async (req, res) => {
    try {
      const newOrderdetail = await db.orderdetail.create(req.body);
      res.status(201).json(newOrderdetail);
    } catch (error) {
      res.status(500).json({ message: 'Sipariş detayı oluşturulurken hata oluştu.' });
    }
  },

  listOrderdetails: async (req, res) => {
    try {
      const orderdetails = await db.orderdetail.findAll();
      res.json(orderdetails);
    } catch (error) {
      res.status(500).json({ message: 'Sipariş detayları listelenirken hata oluştu.' });
    }
  },

  getOrderdetailById: async (req, res) => {
    try {
      const orderdetail = await db.orderdetail.findByPk(req.params.orderdetailId);
      if (orderdetail) {
        res.json(orderdetail);
      } else {
        res.status(404).json({ message: 'Sipariş detayı bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş detayı getirilirken hata oluştu.' });
    }
  },

  updateOrderdetail: async (req, res) => {
    try {
      const updatedOrderdetail = await db.orderdetail.update(req.body, {
        where: { Productdetails_Id: req.params.orderdetailId },
        returning: true
      });
      if (updatedOrderdetail[0] === 1) {
        res.json(updatedOrderdetail[1][0]);
      } else {
        res.status(404).json({ message: 'Sipariş detayı bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş detayı güncellenirken hata oluştu.' });
    }
  },

  deleteOrderdetail: async (req, res) => {
    try {
      const deletedOrderdetail = await db.orderdetail.destroy({ where: { Productdetails_Id: req.params.orderdetailId } });
      if (deletedOrderdetail === 1) {
        res.json({ message: 'Sipariş detayı silindi.' });
      } else {
        res.status(404).json({ message: 'Sipariş detayı bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Sipariş detayı silinirken hata oluştu.' });
    }
  }
};

module.exports = OrderdetailController;

