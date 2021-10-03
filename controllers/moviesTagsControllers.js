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
            return res.status(400).json({
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
            return res.status(400).json({
                status: "failed",
                message: "Movie have already the Tag, please input another"
            })
        } else {const createTagMovie = await MoviesTags.create({
            MovieId: MovieId,
            TagId: TagId
        })}
        return res.status(201).json({
            status: "success",
            message: 'movies tags models has been created'
        });
        
    };

    static async update (req, res, next){
        let { id } = req.params;
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
            return res.status(400).json({
                status: "failed",
                message: "Movie or Tag Not Found"
            })
        }

        const dataMovieTag = await MoviesTags.findOne({where: {id: id}});

        if(!dataMovieTag) {
            return res.status(400).json({
                status: "failed",
                message: `Movies tags id ${id} has not found`
            })
        } else if (!MovieId || !TagId) {
            return res.status(400).json ({
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
            return res.status(400).json({
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
            return res.status(200).json({
                status: "Success",
                message: `Movie id ${MovieId} has been updated`
            })
        }
    };
        
    

    static async delete (req, res, next) {
        let { id } = req.params;
        const idMovieTag = await MoviesTags.findOne({where: {id:id}});

        if(!idMovieTag) {
            return res.status(400).json({
                status: "failed",
                message: `Movies tags id ${id} has not found`
            })
        } else {
            MoviesTags.destroy({
                where : {
                    id: id
                }
            })
        }
        return res.status(200).json({ 
            status: "success",
            message: `Movies tags id ${id} has been deleted`
        })
    };
}

module.exports = MoviesTagsControllers;