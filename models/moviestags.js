'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        MoviesTags.belongsTo(models.Movies, {
          foreignKey: "MoviesId"
        });
    
        MoviesTags.belongsTo(models.Tags, {
          foreignKey: "TagsId"
        });
    };
  }

  MoviesTags.init({
    TagsId: DataTypes.INTEGER,
    MoviesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesTags',
  });

  return MoviesTags;
};