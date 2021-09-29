const { movies } = require('../models/indexModels')
const { genre } = require('../models/indexModels')
const { moviesgenre } = require('../models/indexModels');



class moviesgenreControllers {
    static create (req, res, next) {
        let { moviesId, genreId } = req.body;

        moviesgenre.create({
            moviesId: moviesId,
            genreId: genreId
        })
        .then(data => {
            res.status(201).json({ message: 'movies genre models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByGenre(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        moviesgenre.findAll({
            include: [
                {
                    model: movies
                },
                {
                    model: genre
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(moviesgenre)
    };

    static getMoviesByGenre(req, res, next) {
        let { genreId, page } = req.params;

        moviesgenre.findAndCountAll({
            where: { 
                genreId: genreId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: genre
                } 
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(moviesgenre)
    };

    static getGenresByMovie(req, res, next) {
        let { moviesId } = req.params;

        moviesgenre.findAll({
            where: { 
                moviesId: moviesId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: genre
                } 
            ],
        });
        res.status(200).json(movie)
    }; 

    static update (req, res, next){
        let { id } = req.params;
        let { moviesId, genreId } = req.body;

        moviesgenre.update({
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

    static delete (res, res, next) {
        let { id } = req.params;

        moviesgenre.destroy({
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

module.exports = moviesgenreControllers;