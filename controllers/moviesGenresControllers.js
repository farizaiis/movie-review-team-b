const { Movies, Genres, MoviesGenres} = require('../models')


class MoviesGenresControllers {
    static create (req, res, next) {
        let { MovieId, GenreId } = req.body;

        MoviesGenres.create({
            MovieId: MovieId,
            GenreId: GenreId
        })
        .then(data => {
            res.status(201).json({ message: 'Movies Genres models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByGenres(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        MoviesGenres.findAll({
            include: [
                {
                    model: Movies
                },
                {
                    model: Genres
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesGenres)
    };

    static getMoviesByGenres(req, res, next) {
        let { GenreId, page } = req.params;

        MoviesGenres.findAndCountAll({
            where: { 
                GenreId: GenreId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Genres
                } 
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesGenres)
    };

    static getGenresByMovie(req, res, next) {
        let { MovieId } = req.params;

        MoviesGenres.findAll({
            where: { 
                MovieId: MovieId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Genres
                } 
            ],
        });
        res.status(200).json(MoviesGenres)
    }; 

    static update (req, res, next){
        let { id } = req.params;
        let { MovieId, GenreId } = req.body;

        MoviesGenres.update({
            MovieId: MovieId,
            GenreId: GenreId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies Genress id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${MovieId} with Genress id ${id} has been updated`})
            }
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        MoviesGenres.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Movies Genress id ${id} has not found`}
            } else {
                res.status(200).json({ message: `Movies Genress id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesGenresControllers;