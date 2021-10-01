'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsToMany(models.Movies, {
        through: models.Watchlists,
        as: 'watchlists'
      });
      Users.belongsToMany(models.Movies, {
        through: models.Reviews,
        as : "reviews"
      });
    }
  };
  Users.init({
    role: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  
  return Users;
};