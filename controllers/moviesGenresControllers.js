const { movies } = require('../models/indexModels')
const { genres } = require('../models/indexModels')
const { moviesgenres } = require('../models/indexModels');



class moviesgenresControllers {
    static create (req, res, next) {
        let { moviesId, genresId } = req.body;

        moviesgenres.create({
            moviesId: moviesId,
            genresId: genresId
        })
        .then(data => {
            res.status(201).json({ message: 'movies genres models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesBygenres(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        moviesgenres.findAll({
            include: [
                {
                    model: movies
                },
                {
                    model: genres
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(moviesgenres)
    };

    static getMoviesBygenres(req, res, next) {
        let { genresId, page } = req.params;

        moviesgenres.findAndCountAll({
            where: { 
                genresId: genresId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: genres
                } 
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(moviesgenres)
    };

    static getgenresByMovie(req, res, next) {
        let { moviesId } = req.params;

        moviesgenres.findAll({
            where: { 
                moviesId: moviesId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: genres
                } 
            ],
        });
        res.status(200).json(movie)
    }; 

    static update (req, res, next){
        let { id } = req.params;
        let { moviesId, genresId } = req.body;

        moviesgenres.update({
            moviesId: moviesId,
            genresId: genresId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies genress id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${moviesId} with genress id ${id} has been updated`})
            }
        });
    };

    static delete (res, res, next) {
        let { id } = req.params;

        moviesgenres.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Movies genress id ${id} has not found`}
            } else {
                res.status(200).json({ message: `Movies genress id ${id} has been deleted`})
            };
        });
    };

}

module.exports = moviesgenresControllers;