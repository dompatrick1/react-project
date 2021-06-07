'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Products' }
    },
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, { foreignKey: 'userId'})
    Cart.belongsTo(models.Product, { foreignKey: 'productId'})
  };
  return Cart;
};
