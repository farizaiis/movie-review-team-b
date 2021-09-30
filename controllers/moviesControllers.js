//const { check } = require('express-validator');
const { Movies, MoviesGenres, Genres } = require('../models')
require('dotenv').config();
const Joi = require('joi').extend(require('@joi/date'))
const sequelize = require('sequelize')

module.exports = {
    postMovie : async (req, res) => {            //<---- Register data Movies include nge create data nya ke Table
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
            
            //check jika data admin yang dicari sesuai Id ada nilai nya atau tidak
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
            
            //check jika data admin sudah ada nilai/isi nya di table
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

            //ngambil data yang telah di update supaya muncul datanya di postman
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

    searchMovies : async (req, res) => {
        const keywords = req.params.keyword
        try {
            const datamovie = await Movies.findAll({
                where : {
                    title : {
                        [sequelize.Op.iLike] : "%" + keywords + "%"
                    } 
                },
                limit : 10
            })

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