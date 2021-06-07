'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
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
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.User, { foreignKey: 'userId'})
    Rating.belongsTo(models.Product, { foreignKey: 'productId'})
  };
  return Rating;
};
