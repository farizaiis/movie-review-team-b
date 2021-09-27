//const { check } = require('express-validator');
const { movies } = require('../models')
require('dotenv').config();
const Joi = require('joi').extend(require('@joi/date'))

module.exports = {
    postMovie : async (req, res) => {            //<---- Register data movies include nge create data nya ke Table
        const body = req.body
        try {
            const schema = Joi.object({
                title : Joi.string().required(),
                sinopsys : Joi.string().required(),
                rating : Joi.number().max(0).required(),
                trailer : Joi.string().required(),
                release_date : Joi.date().format("YYYY-M-D").required(),
                director : Joi.string().required(),
                budget : Joi.number().required()
            })

            const check = schema.validate({ ...body }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }
            
            const checkmovie = await movies.findOne({
                where: {
                    title: body.title                }
            })

            if(checkmovie) {
                return res.status(400).json({
                    status: "fail",
                    message: "Cant post same movie",
                });
            }

            const dataMovie = await movies.create({
                title : body.title,
                sinopsys : body.sinopsys,
                rating : body.rating,
                trailer : body.trailer,
                release_date : body.release_date,
                director : body.director,
                budget : body.budget + " USD"
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
            const moviesData = await movies.findOne({ where : { id } }); 
            
            //check jika data admin yang dicari sesuai Id ada nilai nya atau tidak
            if(!moviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Movie",
                data: moviesData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllmovies : async (req, res) => {
        try {
            const moviesData = await movies.findAll(); 
            
            //check jika data admin sudah ada nilai/isi nya di table
            if(!moviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All data movies",
                data: moviesData
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
                sinopsys : Joi.string(),
                trailer : Joi.string(),
                release_date : Joi.date().format("YYYY-M-D"),
                director : Joi.string(),
                budget : Joi.number()
            })

            const { error } = schema.validate(
                {
                    ...body
                },
                { abortEarly : false }
            )

            if (error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : error["details"].map(({ message }) => message )
                })
            }

            if(body.title) {
                const checktitle = await movies.findOne({where : {title : body.title}})
                if(checktitle) {
                        return res.status(400).json({
                            status : "failed",
                            message : "Unable to input data"
                        });
                }
            }
            
            const moviesUpdate = await movies.update(
                {
                    ...body,
                    budget : body.budget + " USD"
                },
                { where : { id } }
            ); 

            if(!moviesUpdate[0]) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            //ngambil data yang telah di update supaya muncul datanya di postman
            const data = await movies.findOne({
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

    deletemovies : async (req, res) => {
        const id = req.params.id
        try {
            const moviesData = await movies.destroy({ where : { id } }); 
            if(!moviesData) {
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
    }
}