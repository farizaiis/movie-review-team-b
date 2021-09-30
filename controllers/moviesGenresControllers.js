const { Movies, Genre, MoviesGenre} = require('../models')


class MoviesGenreControllers {
    static create (req, res, next) {
        let { moviesId, genreId } = req.body;

        MoviesGenre.create({
            moviesId: moviesId,
            genreId: genreId
        })
        .then(data => {
            res.status(201).json({ message: 'Movies Genre models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByGenre(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        MoviesGenre.findAll({
            include: [
                {
                    model: Movies
                },
                {
                    model: Genre
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesGenre)
    };

    static getMoviesByGenre(req, res, next) {
        let { genreId, page } = req.params;

        MoviesGenre.findAndCountAll({
            where: { 
                genreId: genreId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Genre
                } 
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesGenre)
    };

    static getGenreByMovie(req, res, next) {
        let { moviesId } = req.params;

        MoviesGenre.findAll({
            where: { 
                moviesId: moviesId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Genre
                } 
            ],
        });
        res.status(200).json(MoviesGenre)
    }; 

    static update (req, res, next){
        let { id } = req.params;
        let { moviesId, genreId } = req.body;

        MoviesGenre.update({
            moviesId: moviesId,
            genreId: genreId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies Genres id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${moviesId} with Genres id ${id} has been updated`})
            }
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        MoviesGenre.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Movies Genres id ${id} has not found`}
            } else {
                res.status(200).json({ message: `Movies Genres id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesGenreControllers;