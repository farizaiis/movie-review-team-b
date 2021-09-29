'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rating.belongsTo(models.movies, { foreignKey: "movieId", targetKey: 'id'})
    }
  };
  rating.init({
    movieId: DataTypes.INTEGER,
    rateCount: DataTypes.INTEGER,
    rateValue: DataTypes.INTEGER,
    average: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rating',
  });
  return rating;
};