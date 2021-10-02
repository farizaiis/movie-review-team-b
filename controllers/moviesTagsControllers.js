const { MoviesTags, Tags, Movies } = require('../models');


class MoviesTagsControllers {
    static async create (req, res, next) {
        let { MovieId, TagId } = req.body;

        const checkMovieId = await Movies.findOne({
            where: {
                id: MovieId
            }
        })

        const checkTagId = await Tags.findOne({
            where: {
                id: TagId
            }
        })

        if(!checkMovieId || !checkTagId) {
            res.status(400).json({
                status: "failed",
                message: "Movie or Tag Not Found"
            })
        }

        const dataMovieTag = await MoviesTags.findOne({
            where: {
                MovieId: MovieId,
                TagId: TagId
            }
        });

        if(dataMovieTag) {
            res.status(400).json({
                status: "failed",
                message: "Movie have already the Tag, please input another"
            })
        } else {const createTagMovie = await MoviesTags.create({
            MovieId: MovieId,
            TagId: TagId
        })}
        res.status(201).json({
            status: "success",
            message: 'movies tags models has been created'
        });
        
    };

    static async getAllMoviesByTags(req, res, next) {
        let { page } = req.query;

        if(!page) {
            page = 1
        }
        const allMovies = await Movies.findAll({
                include: [
                    {
                        model: MoviesTags,
                        include: [{
                            model: Tags,
                            attributes: ["name"]
                        }],
                    }
                ],
                offset: 15*(page-1),
                limit: 15
            });
        res.status(200).json(allMovies)
    };

    static async getMovieByTagId(req, res) {
        let { page } = req.query;
        let { TagId } = req.query;

        if(!page) {
            page = 1
        }
        const moviesByTag = await Movies.findAll({
                        include: [ 
                            { 
                                model: MoviesTags,
                                attributes : { exclude : ["id", "MovieId", "updatedAt", "createdAt"]},
                                where: {
                                    TagId: TagId
                                }, include: Tags,
                            }
                        ],
                offset: 15*(page-1),
                limit: 15
            });
        res.status(200).json(moviesByTag)
    };


    static async getTagsByMovie(req, res, next) {
        let { page } = req.query;
        let { MovieId } = req.query;

        if(!page) {
            page = 1
        }
        const dataTagMovie = await Movies.findAll({
                        include: [ 
                            { 
                                model: MoviesTags,
                                where: {
                                    MovieId: MovieId
                                }, include: Tags,
                            }
                        ],
                offset: 15*(page-1),
                limit: 15
            });
        res.status(200).json(dataTagMovie)
    }; 

    static async update (req, res, next){
        let { id } = req.params;
        let { MovieId, TagId } = req.body;

        const dataMovieTag = await MoviesTags.findOne({where: {id: id}});

        if(!dataMovieTag) {
            res.status(400).json({
                status: "failed",
                message: `Movies tags id ${id} has not found`
            })
        } else if (!MovieId || !TagId) {
            res.status(400).json ({
                status: "failed",
                message: "Please fill the required"
            })
        } 

        const dataUpdateTag = await MoviesTags.findOne({
            where: {
                MovieId: MovieId,
                TagId: TagId
            }
        });

        if(dataUpdateTag) {
            res.status(400).json({
                status: "failed",
                message: "Movie already have the Tag"
            });
        };

        const createUpdateTag = await MoviesTags.update({
            MovieId: MovieId,
            TagId: TagId
        }, {
            where: {
                id: id
            }
        })
        
        if(createUpdateTag) {
            res.status(200).json({
                status: "Success",
                message: `Movie id ${MovieId} has been updated`
            })
        }
    };
        
    

    static async delete (req, res, next) {
        let { id } = req.params;
        const idMovieTag = await MoviesTags.findOne({where: {id:id}});

        if(!idMovieTag) {
            res.status(400).json({
                status: "failed",
                message: `Movies tags id ${id} has not found`
            })
        } else {
            MovieTag.destroy({
                where : {
                    id: id
                }
            })
        }
        res.status(200).json({ 
            status: "success",
            message: `Movies tags id ${id} has been deleted`
        })
    };
}

module.exports = MoviesTagsControllers;
