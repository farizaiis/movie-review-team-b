const { MoviesTags, Tag, Movies } = require('../models/indexModels');


class MoviesTagsControllers {
    static create (req, res, next) {
        let { tagsId, moviesId } = req.body;

        MoviesTags.create({
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
        MoviesTags.findAll({
            include: [
                {
                    model: Movies
                },
                {
                    model: Tag
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesTags)
    };

    static getMoviesByTag(req, res, next) {
        let { tagsId, page } = req.params;

        MoviesTags.findAndCountAll({
            where: { 
                tagsId: tagsId
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
        res.status(200).json(MoviesTags)
    };

    static getTagsByMovie(req, res, next) {
        let { moviesId } = req.params;

        MoviesTags.findAll({
            where: { 
                moviesId: moviesId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Tag
                } 
            ],
        });
        res.status(200).json(MoviesTags)
    };

    static update (req, res, next){
        let { id } = req.params;
        let { moviesId, tagsId } = req.body;

        MoviesTags.update({
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

        MoviesTags.destroy({
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

module.exports = MoviesTagsControllers;