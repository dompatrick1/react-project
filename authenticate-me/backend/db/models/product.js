'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(5, 2)
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      referencees: { model: 'Users'}
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {});

  const cartMapping = {
    through: 'Cart',
    otherKey: 'userId',
    foreignKey: 'productId'
  }

  const reviewMapping = {
    through: 'Review',
    otherKey: 'userId',
    foreignKey: 'productId'
  }

  const ratingMapping = {
    through: 'Rating',
    otherKey: 'userId',
    foreignKey: 'productId'
  }
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Review, { foreignKey: 'productId'})
    Product.hasMany(models.Rating, { foreignKey: 'productId'})
    Product.hasMany(models.Cart, { foreignKey: 'productId'})
    Product.belongsToMany(models.User, cartMapping)
    Product.belongsToMany(models.User, reviewMapping)
    Product.belongsToMany(models.User, ratingMapping)

  };
  return Product;
};
