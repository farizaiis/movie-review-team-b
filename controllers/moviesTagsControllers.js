const { MoviesTag, Tags, Movies } = require('../models');


class MoviesTagControllers {
    static create (req, res, next) {
        let { tagsId, moviesId } = req.body;

        MoviesTag.create({
            moviesId: moviesId,
            tagsId: tagsId
        })
        .then(data => {
            res.status(201).json({ message: 'movies tags models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByTag(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        MoviesTag.findAll({
            include: [
                {
                    model: Movies
                },
                {
                    model: Tags
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesTag)
    };

    static getMoviesByTag(req, res, next) {
        let { tagsId, page } = req.params;

        MoviesTag.findAndCountAll({
            where: { 
                tagsId: tagsId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Tags
                } 
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesTag)
    };

    static getTagsByMovie(req, res, next) {
        let { moviesId } = req.params;

        MoviesTag.findAll({
            where: { 
                moviesId: moviesId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Tags
                } 
            ],
        });
        res.status(200).json(MoviesTag)
    };

    static update (req, res, next){
        let { id } = req.params;
        let { moviesId, tagsId } = req.body;

        MoviesTag.update({
            moviesId: moviesId,
            tagsId: tagsId
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

        MoviesTag.destroy({
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

module.exports = MoviesTagControllers;