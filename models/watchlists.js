'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Watchlist.belongsTo(models.Movies, {
        foreignKey: 'moviesId'
      });
  
      Watchlist.belongsTo(models.Users, {
        foreignKey: 'usersId'
      });
  };
}

  Watchlist.init({
    moviesId: DataTypes.INTEGER,
    usersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Watchlist',
  });

  return Watchlist;
};
