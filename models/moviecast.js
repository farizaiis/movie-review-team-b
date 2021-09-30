'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesCasts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MoviesCasts.belongsTo(models.Movies, { foreignKey: "MovieId"})
      MoviesCasts.belongsTo(models.Artists, { foreignKey: "ArtistId"})
    }
  };
  MoviesCasts.init({
    MovieId: DataTypes.INTEGER,
    ArtistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesCasts',
  });
  return MoviesCasts;
};