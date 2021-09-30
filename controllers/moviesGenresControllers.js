const { Movies, Genres, MoviesGenres} = require('../models')


class MoviesGenresControllers {
    static create (req, res, next) {
        let { MoviesId, GenresId } = req.body;

        MoviesGenres.create({
            MoviesId: MoviesId,
            GenresId: GenresId
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
        let { GenresId, page } = req.params;

        MoviesGenres.findAndCountAll({
            where: { 
                GenresId: GenresId
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
        let { MoviesId } = req.params;

        MoviesGenres.findAll({
            where: { 
                MoviesId: MoviesId
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
        let { MoviesId, GenresId } = req.body;

        MoviesGenres.update({
            MoviesId: MoviesId,
            GenresId: GenresId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies Genress id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${MoviesId} with Genress id ${id} has been updated`})
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