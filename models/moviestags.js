'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        MoviesTag.belongsTo(models.Movies, {
          foreignKey: "moviesId"
        });
    
        MoviesTag.belongsTo(models.Tags, {
          foreignKey: "tagsId"
        });
    };
  }

  MoviesTag.init({
    tagsId: DataTypes.INTEGER,
    moviesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesTags',
  });

  return MoviesTag;
};