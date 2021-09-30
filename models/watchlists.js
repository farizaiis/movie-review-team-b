'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watchlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Watchlists.belongsTo(models.Movies, {
        foreignKey: 'MoviesId'
      });
  
      Watchlists.belongsTo(models.Users, {
        foreignKey: 'UsersId'
      });
  };
}

  Watchlists.init({
    MoviesId: DataTypes.INTEGER,
    UsersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Watchlists',
  });

  return Watchlists;
};
