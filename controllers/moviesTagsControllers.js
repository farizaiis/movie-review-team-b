const { MoviesTags, Tags, Movies } = require('../models');


class MoviesTagsControllers {
    static create (req, res, next) {
        let { TagId, MovieId } = req.body;

        MoviesTags.create({
            MovieId: MovieId,
            TagId: TagId
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
                    model: Tags
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesTags)
    };

    static getMoviesByTag(req, res, next) {
        let { TagId, page } = req.params;

        MoviesTags.findAndCountAll({
            where: { 
                TagId: TagId
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
        res.status(200).json(MoviesTags)
    };

    static getTagsByMovie(req, res, next) {
        let { MovieId } = req.params;

        MoviesTags.findAll({
            where: { 
                MovieId: MovieId
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
        res.status(200).json(MoviesTags)
    };

    static update (req, res, next){
        let { id } = req.params;
        let { MovieId, TagId } = req.body;

        MoviesTags.update({
            MovieId: MovieId,
            TagId: TagId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies Genres id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${MovieId} with Genres id ${id} has been updated`})
            }
        });
    };

    static delete (req, res, next) {
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