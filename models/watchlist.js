'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      watchlist.belongsTo(models.users, {
        foreignKey: 'userId',
        sourceKey: 'id'
      })

      watchlist.belongsTo(models.movies, {
        foreignKey: 'movieId',
        sourceKey: 'id'
      })
    }
  };
  watchlist.init({
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'watchlist',
  });
  return watchlist;
};