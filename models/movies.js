'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies.belongsToMany(models.Users,
        {
          through: models.Watchlist,
          as: "Watch list"
        }
      )
      Movies.belongsToMany(models.Users,
        {
          through: models.reviews,
          as : "Movie Review"
        }
      )
      Movies.belongsToMany(models.Tags,
        {
          through: models.MoviesTag,
          as: "Movie Tag"
        }
      )
      Movies.belongsToMany(models.Genre, {
        through: models.MoviesGenre,
        as: "Genre Movie"
      })
      Movies.belongsToMany(models.Artists, {
        through: models.movieCast,
        as: "Movie Cast"
      })
    }
  };
  Movies.init({
    title: DataTypes.STRING,
    poster: DataTypes.STRING,
    sinopsys: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    trailer: DataTypes.STRING,
    release_date: DataTypes.STRING,
    director: DataTypes.STRING,
    featured_song: DataTypes.STRING,
    budget: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};