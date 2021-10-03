const { Movies, Genres, Artists, Tags } = require('../models')
require('dotenv').config();
const Joi = require('joi').extend(require('@joi/date'))
const sequelize = require('sequelize')

module.exports = {
    postMovie : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                title : Joi.string().required(),
                poster : Joi.string().required(),
                sinopsys : Joi.string().required(),
                rating : Joi.number().max(0).required(),
                trailer : Joi.string().required(),
                release_date : Joi.date().format("YYYY-M-D").required(),
                director : Joi.string().required(),
                budget : Joi.number().required(),
                featured_song : Joi.string().required()
            })

            const check = schema.validate({
                title : body.title,
                poster : req.file ? req.file.path : "poster",
                sinopsys : body.sinopsys,
                rating : body.rating,
                trailer : body.trailer,
                release_date : body.release_date,
                director : body.director,
                budget : body.budget,
                featured_song : body.featured_song
                }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }
            
            const checkmovie = await Movies.findOne({
                where: {
                    title: body.title
                }
            })

            if(checkmovie) {
                return res.status(400).json({
                    status: "fail",
                    message: "Cant post same movie",
                });
            }

            const dataMovie = await Movies.create({
                title : body.title,
                [req.file ? "poster" : null]: req.file ? req.file.path : null,
                sinopsys : body.sinopsys,
                rating : body.rating,
                trailer : body.trailer,
                release_date : body.release_date,
                director : body.director,
                budget : body.budget + " USD",
                featured_song : body.featured_song
            });

            return res.status(200).json({
                        status: "success",
                        message: "Succesfully input new Movie",
                        data : dataMovie
                    });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
            });
        }
    },

    getOneMovie : async (req, res) => {
        const id = req.params.id
        try {
            const MoviesData = await Movies.findOne({ where : { id } }); 
            
            if(!MoviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Movie",
                data: MoviesData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllMovies : async (req, res) => {
        const limit = 15;
        const page = parseInt(req.params.page);
        const offset = limit * (page - 1);

        try {
            const MoviesData = await Movies.findAll({
                limit : limit,
                offset : offset,
                order : [["createdAt", "DESC"]]
            }); 
            
            if(!MoviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            const count = await Movies.count({ distinct: true });
            let next = page + 1;
            if (page * limit >= count) {
                next = 0;
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All data Movies",
                data: MoviesData,
                meta : {
                    page: page,
                    next: next,
                    total: count
                }
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllMoviesByGenre : async (req, res) => {
        const limit = 15;
        const page = parseInt(req.params.page);
        const offset = limit * (page - 1);
        const names = req.params.name

        try {
            const MoviesData = await Genres.findOne({
                where : { name : names.toLowerCase() } ,
                attributes : {exclude : ["id", "createdAt", "updatedAt"]},
                include : [{
                    model : Movies,
                    as : "moviesgenre",
                    attributes : {exclude : ["id", "createdAt", "updatedAt"]}
                }],
                limit : limit,
                offset : offset
            }); 
            
            if(!MoviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            const count = await Movies.count({ distinct: true });
            let next = page + 1;
            if (page * limit >= count) {
                next = 0;
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All data Movies",
                data: MoviesData,
                meta : {
                    page: page,
                    next: next,
                    total: count
                }
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllGenreByMovieId : async (req, res) => {
        const id = req.params.id

        try {
            const GenreData = await Movies.findOne({
                where : { id : id } ,
                attributes : {exclude : ["id", "createdAt", "updatedAt"]},
                include : [{
                    model : Genres,
                    as : "moviesgenre",
                    attributes : {exclude : ["id", "createdAt", "updatedAt"]}
                }],
            }); 
            
            if(!GenreData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All data Genre By Movie",
                data: GenreData,
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllTagByMovieId : async (req, res) => {
        const id = req.params.id

        try {
            const TagData = await Movies.findOne({
                where : { id : id } ,
                attributes : {exclude : ["id", "createdAt", "updatedAt"]},
                include : [{
                    model : Tags,
                    as : "moviestags",
                    attributes : {exclude : ["id", "createdAt", "updatedAt"]}
                }],
            }); 
            
            if(!TagData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All Movie Tag",
                data: TagData,
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllMovieByTagId : async (req, res) => {
        const id = req.params.id

        try {
            const MoviesData = await Tags.findOne({
                where : { id : id } ,
                attributes : {exclude : ["id", "createdAt", "updatedAt"]},
                include : [{
                    model : Movies,
                    as : "moviestags",
                    attributes : {exclude : ["id", "createdAt", "updatedAt"]}
                }],
            }); 
            
            if(!MoviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All Movie Tag",
                data: MoviesData,
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllMoviesByArtistId : async (req, res) => {
        const id = req.params.id

        try {
            const MoviesData = await Artists.findOne({
                where : { id : id } ,
                attributes : {exclude : ["id", "createdAt", "updatedAt"]},
                include : [{
                    model : Movies,
                    as : "moviecast",
                    attributes : {exclude : ["id", "createdAt", "updatedAt"]}
                }],
            }); 
            
            if(!MoviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All data Movies",
                data: MoviesData,
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllArtistByMovieId : async (req, res) => {
        const id = req.params.id

        try {
            const ArtistData = await Movies.findOne({
                where : { id : id } ,
                attributes : {exclude : ["id", "createdAt", "updatedAt"]},
                include : [{
                    model : Artists,
                    as : "moviecast",
                    attributes : {exclude : ["id", "createdAt", "updatedAt"]}
                }],
            }); 
            
            if(!ArtistData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All data Artist",
                data: ArtistData,
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updateMovies : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                title : Joi.string(),
                poster : Joi.string(),
                sinopsys : Joi.string(),
                trailer : Joi.string(),
                release_date : Joi.date().format("YYYY-M-D"),
                director : Joi.string(),
                budget : Joi.number(),
                featured_song : Joi.string()
            })

            const check = schema.validate({
                title : body.title,
                poster : req.file ? req.file.path : "poster",
                sinopsys : body.sinopsys,
                trailer : body.trailer,
                release_date : body.release_date,
                director : body.director,
                budget : body.budget,
                featured_song : body.featured_song
                }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }

            if(body.title) {
                const checktitle = await Movies.findOne({where : {title : body.title}})
                if(checktitle) {
                        return res.status(400).json({
                            status : "failed",
                            message : "Title of movie cant duplicate"
                        });
                }
            }
            
            const MoviesUpdate = await Movies.update(
                {
                    title : body.title,
                    [req.file ? "poster" : null]: req.file ? req.file.path : null,
                    sinopsys : body.sinopsys,
                    trailer : body.trailer,
                    release_date : body.release_date,
                    director : body.director,
                    budget : body.budget + " USD",
                    featured_song : body.featured_song
                },
                { where : { id } }
            ); 

            if(!MoviesUpdate[0]) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            const data = await Movies.findOne({
                where : { id }
            })
            
            return res.status(200).json({
                status : "success",
                message : "Succesfully update the Movie",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    deleteMovies : async (req, res) => {
        const id = req.params.id
        try {
            const MoviesData = await Movies.destroy({ where : { id } }); 
            if(!MoviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    searchMoviesbyTitle : async (req, res) => {
        const titles = req.params.title
        try {
            const datamovie = await Movies.findAll({
                where : {
                    title : {
                        [sequelize.Op.iLike] : "%" + titles + "%"
                    } 
                },
                limit : 15
            })

            if(datamovie == "search") {
                const allmovie = await Movies.findAll()
                return res.status(200).json({
                    status : "success",
                    messsage : "Successfully retrieve data movie",
                    result : allmovie
                })
            }

            return res.status(200).json({
                status : "success",
                messsage : "Successfully retrieve data movie",
                result : datamovie
            })
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },
}