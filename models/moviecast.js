'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCasts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieCasts.belongsTo(models.Movies, { foreignKey: "MoviesId"})
      MovieCasts.belongsTo(models.Artists, { foreignKey: "ArtistsId"})
    }
  };
  MovieCasts.init({
    MoviesId: DataTypes.INTEGER,
    ArtistsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieCasts',
  });
  return MovieCasts;
};