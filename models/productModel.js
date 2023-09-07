const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    Product_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Product_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Product_Description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Product_Photo: {
      type: DataTypes.BLOB
    }
  });

  Product.sync({ force: false })
    .then(() => {
      console.log('Product table created or updated.');
    })
    .catch(err => {
      console.error('Error creating Product table:', err);
    });

  return Product;
};
