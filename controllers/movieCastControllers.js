const { MovieCasts, Movies, Artists, Genres } = require('../models');


class MovieCastsControllers {
    static create (req, res, next) {
        let { MoviesId, ArtistsId } = req.body;

        MovieCasts.create({
            MoviesId: MoviesId,
            ArtistsId: ArtistsId
        })
        .then(data => {
            res.status(201).json({ message: 'movies characters models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByCharacters(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        MovieCasts.findAll({
            include: [
                {
                    model: Movies
                },
                {
                    model: Artists
                },
                {
                    model: Genres
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MovieCasts)
    };
    

    static getMoviesByCharacters(req, res, next) {
        let { MoviesId, page } = req.params;

        MovieCasts.findAndCountAll({
            where: { 
                MoviesId: MoviesId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Artists
                },
                {
                    model: Genres
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MovieCasts)
    };

    static getCharactersByMovies(req, res, next) {
        let { ArtistsId } = req.params;

        MoviesTags.findAll({
            where: { 
                ArtistsId: ArtistsId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Artists
                },
                {
                    model: Genres
                }
            ],
        });
        res.status(200).json(MoviesTags)
    };

    static update (req, res, next){
        let { id } = req.params;
        let { MoviesId, ArtistsId } = req.body;

        MovieCasts.update({
            MoviesId: MoviesId,
            ArtistsId: ArtistsId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Characters id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Characters id ${id} has been updated`})
            }
        });
    };

    static delete (res, res, next) {
        let { id } = req.params;

        MovieCasts.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Character id ${id} not found`}
            } else {
                res.status(200).json({ message: `Character id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MovieCastsControllers;
