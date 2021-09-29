'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MoviesGenre.belongsTo(models.Movies, {
        foreignKey: "moviesId"
      });
  
      MoviesGenre.belongsTo(models.Genre, {
        foreignKey: "genreId"
      })
    }
  };
  MoviesGenre.init({
    genreId: DataTypes.INTEGER,
    moviesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesGenre',
  });
  
  return MoviesGenre
};