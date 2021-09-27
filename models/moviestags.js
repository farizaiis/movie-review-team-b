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
    }
  };
  MoviesTags.init({
    tagsId: DataTypes.INTEGER,
    moviesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesTags',
  });

  MoviesTags.associate = function(models) {
    MoviesTags.belongsTo(models.Movies, {
      foreignKey: "moviesId"
    });

    MoviesTags.belongsTo(models.Tag, {
      foreignKey: "tagsId"
    });
  };

  return MoviesTags;
};