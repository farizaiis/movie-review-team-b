const { Reviews, Users, Movies } = require('../models');
const Joi = require('joi');

const sequelize = require('sequelize');
const { request } = require('express');

module.exports = {
    postReview: async (req, res) => {
        const body = req.body
        const UserId = req.users.id 
        try {
            const schema = Joi.object({
                MovieId: Joi.number(),
                UserId: Joi.number(),
                rating: Joi.number().min(1).max(5).required(),
                comment: Joi.string(),
            })

            const check = schema.validate({
                MovieId: req.params.id,
                UserId: UserId,
                rating: body.rating,
                comment: body.comment,
            }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: check.error["details"][0]["message"]
                })
            }

            const checkUser = await Reviews.findOne({
                where: {
                    MovieId: req.params.id,
                    UserId: UserId
                }
            })

            if (checkUser) {
                return res.status(400).json({
                    status: "Failed",
                    message: "You Have Added Review",
                });
            }

            const newReview = await Reviews.create({
                MovieId: req.params.id,
                UserId: UserId,
                rating: body.rating,
                comment: body.comment
            });

            const allRating = await Reviews.findAll({
                where : {
                    MovieId : req.params.id
                }
            })

            let ratingAverage = allRating.map(e => {
                return e.dataValues.rating
            })

            ratingAverage.push(body.rating)

            const sum = ratingAverage.reduce((a,b) => a+b)
            const ratingFix = Math.round(sum / ratingAverage.length)

            const newMovie = await Movies.update({
                rating: ratingFix,
            }, {
                where: {
                    id : req.params.id
                }
            })

            if (!newMovie[0]) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to update database",
                });
            }

            return res.status(200).json({
                status: "Successfully",
                message: "Succesfully add new review",
                data: newReview
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            });
        }
    },

    getOneReview: async (req, res) => {
        const id = req.params.id
        try {
            const oneReview = await Reviews.findOne({ where: { id } });
            
            if (!oneReview) {
                return res.status(400).json({
                    status: "failed",
                    message: "Data not found"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Succesfully Retrieved Review",
                data: oneReview
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getAllReview: async (req, res) => {
        const limit = 10;
        const page = parseInt(req.params.page);
        const offset = limit * (page - 1);

        try {
            const dataReview = await Reviews.findAll({
                limit: limit,
                offset: offset
            });

            if (!dataReview) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Data not found"
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Succesfully Retrieved All Review",
                data: dataReview,
            });

        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },

    getAllReviewByMovie: async (req, res) => {
        const id = req.params.id
        try {
            const dataReview = await Reviews.findAll({
            where: {MovieId: id}}
            );
            
            if (!dataReview) {
                return res.status(400).json({
                    status: "failed",
                    message: "Data not found"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Succesfully Retrieved Review",
                data: dataReview
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getAllReviewByUser: async (req, res) => {
        try {
            const dataReview = await Reviews.findAll({
            where: {UserId: req.users.id}}
            );
            
            if (!dataReview) {
                return res.status(400).json({
                    status: "failed",
                    message: "Data not found"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Succesfully Retrieved Review",
                data: dataReview
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    updateReview: async (req, res) => {
        const body = req.body
        const id = req.params.id
        const UserId = req.users.id
        try {
            const schema = Joi.object({
                MovieId: Joi.number(),
                UserId: Joi.number(),
                rating: Joi.number().min(1).max(5),
                comment: Joi.string(),
            })

            const check = schema.validate({
                MovieId: req.params.id,
                UserId: UserId,
                rating: body.rating,
                comment: body.comment,
            }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: check.error["details"][0]["message"]
                })
            }

            const reviewUpdate = await Reviews.update(
                {
                    MovieId: req.params.id,
                    UserId: UserId,
                    rating: body.rating,
                    comment: body.comment
                },
                { where: { 
                    UserId: UserId,
                    MovieId : id
                } }
            );

            if (!reviewUpdate[0]) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to input data"
                });
            }

            const allRating = await Reviews.findAll({
                where : {
                    MovieId : req.params.id
                }
            })

            let ratingAverage = allRating.map(e => {
                return e.dataValues.rating
            })

            ratingAverage.push(body.rating)

            const sum = ratingAverage.reduce((a,b) => a+b)
            const ratingFix = Math.round(sum / ratingAverage.length)

            const newMovie = await Movies.update({
                rating: ratingFix,
            }, {
                where: {
                    id : req.params.id
                }
            })

            if (!newMovie[0]) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to update database",
                });
            }

            const data = await Reviews.findAll({
                where: { 
                    UserId: UserId,
                    MovieId : id }
            })

            return res.status(200).json({
                status: "success",
                message: "Succesfully update the Review",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    deleteReview: async (req, res) => {
        const id = req.params.id
        try {
            const getUserId = await Reviews.findOne({

                where : {id}
            })

            if(getUserId.dataValues.UserId != req.users.id) {
                return res.status(400).json({
                    status : "Failed",
                    message : "Cannot delete other user Review"
                })
            }
            
            const dataReview = await Reviews.destroy({ where: { id } });
            if (!dataReview) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Data not found"
                });
            }
            return res.status(200).json({
                status: "Success",
                message: "Deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    }
}