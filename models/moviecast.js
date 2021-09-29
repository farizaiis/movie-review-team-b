'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movieCast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // movieCast.belongsTo(artist, { foreignKey: 'userId'})
      movieCast.belongsTo(models.Movies, { foreignKey: "moviesId"})
      movieCast.belongsTo(models.Artists, {foreignKey: "artistId"})
    }
  };
  movieCast.init({
    moviesId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movieCast',
  });
  return movieCast;
};