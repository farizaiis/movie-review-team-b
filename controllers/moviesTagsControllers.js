const { moviestags, tags, movies } = require('../models/indexModels');


class moviestagsControllers {
    static create (req, res, next) {
        let { tagsId, moviesId } = req.body;

        moviestags.create({
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
        moviestags.findAll({
            include: [
                {
                    model: movies
                },
                {
                    model: tags
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(moviestags)
    };

    static getMoviesByTag(req, res, next) {
        let { tagsId, page } = req.params;

        moviestags.findAndCountAll({
            where: { 
                tagsId: tagsId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: tags
                } 
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(moviestags)
    };

    static getTagsByMovie(req, res, next) {
        let { moviesId } = req.params;

        moviestags.findAll({
            where: { 
                moviesId: moviesId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: tags
                } 
            ],
        });
        res.status(200).json(moviestags)
    };

    static update (req, res, next){
        let { id } = req.params;
        let { moviesId, tagsId } = req.body;

        moviestags.update({
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

    static delete (res, res, next) {
        let { id } = req.params;

        moviestags.destroy({
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

module.exports = moviestagsControllers;