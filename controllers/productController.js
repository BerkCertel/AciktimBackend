const db = require('../models');
const db = require('../db');

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const newProduct = await db.product.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Ürün oluşturulurken hata oluştu.' });
    }
  },

  listProducts: async (req, res) => {
    try {
      const products = await db.product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Ürünler listelenirken hata oluştu.' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await db.product.findByPk(req.params.productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Ürün bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ürün getirilirken hata oluştu.' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await db.product.update(req.body, {
        where: { Product_Id: req.params.productId },
        returning: true
      });
      if (updatedProduct[0] === 1) {
        res.json(updatedProduct[1][0]);
      } else {
        res.status(404).json({ message: 'Ürün bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ürün güncellenirken hata oluştu.' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await db.product.destroy({ where: { Product_Id: req.params.productId } });
      if (deletedProduct === 1) {
        res.json({ message: 'Ürün silindi.' });
      } else {
        res.status(404).json({ message: 'Ürün bulunamadı.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ürün silinirken hata oluştu.' });
    }
  }
};

module.exports = ProductController;