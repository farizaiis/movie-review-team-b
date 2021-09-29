'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.belongsTo(models.movies, { foreignKey: "movieId", targetKey: 'id'})
      review.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'id'})
    }
  };
  review.init({
    reviewId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};