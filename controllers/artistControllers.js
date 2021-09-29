const { Artists } = require('../models')
const joi = require('joi')
// const {validator} = require('./../helpers/validator')

module.exports = {
    addArtist: async (req, res) => {
        const { fullname } = req.body
        const file = (req.file) ? req.file : ""

        try {
            const schema = await joi.object({
                fullname: joi.string().required(),
                image: joi.string().max(2000000).required()
            })
            
            const {error} = await schema.validate({
                fullname: fullname,
                image: file.path
            }, {
                abortEarly:false
            })
            
            if(error){
                console.log("🚀 ~ file: ArtistsController.js ~ line 24 ~ addartist: ~ error", error)
                return res.status(400).json({
                    status: "failed",
                    message: "input uncorrectly",
                    errors: error["details"][0]["message"]
                })
            }
            
            const checkArtis = await Artists.findOne({
                where: {
                    fullname: fullname
                }
            })
        
            if (checkArtis) {
                return res.status(400).json({
                    status: "failed",
                    message: `Artist ${fullname} already exists`
                });
            }

            const artistCreate = await Artists.create({
                fullname,
                image: file.path
            })
            
            if(!artistCreate){
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add artist"
                })
            }

            res.status(200).json({
                status: "success",
                message: `Successfully add ${fullname} to list artist`,
                data: artistCreate
            })
            
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getArtist: async(req, res) => {
        try {
            const getAll = await Artists.findAll({
                attributes: [
                    'id',
                    'fullname',
                    'image'
                ]
            })

            return res.status(200).json({
                status: "success",
                message: "Success retrieved your artist lists",
                data: getAll
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getArtistById: async(req, res) => {
        const id = req.params.id
        try {
            const getById = await Artists.findOne({
                where: {
                    id
                }
            })

            if(!getById){
                return res.status(400).json({
                    status: "failed",
                    message: `id ${id} cannot found`
                })
            }

            return res.status(200).json({
                status: "success",
                message: `Success retrieved your artist id ${id}`,
                data: getById
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    updateArtist: async (req, res) => {
        const id = req.params.id
        const file = (req.file) ? req.file : ""
        const {
            fullname
        } = req.body

        try {
            const schema = joi.object({
                fullname: joi.string(),
                image: joi.string()
            })

            const {error} = schema.validate({
                fullname: fullname,
                image: file.path
            }, {
                abortEarly:false
            })

            if(error){
                console.log("🚀 ~ file: ArtistsController.js ~ line 27 ~ addartist: ~ error", error)
                res.status(400).json({
                    status: "failed",
                    message: "input uncorrectly",
                    errors: error["details"][0]["message"]
                })
            }

            await Artists.update(
                {
                    fullname,
                    image: file.path
                }, {
                    where: {
                        id: id
                    }
                }
            )
            
            const editArtists = await Artists.findByPk(id)

            res.status(200).json({
                status: "success",
                message: `success update artist ${fullname}`,
                data: editArtists
            })

        } catch (error) {
            console.log("🚀 ~ file: ArtistsController.js ~ line 97 ~ updateartist: ~ error", error)
            
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    deleteArtist: async (req, res) => {
        const id = req.params.id
        const fullname = req.params.fullname

        try {
            const removeArtist = await Artists.destroy({
                where: {
                    id: id
                }
            })

            if (!removeArtist) {
                res.status(400).json({
                    status: "failed",
                    message: `failed delete artist id ${id}`
                })
            }

            res.status(200).json({
                status: "Success",
                message: `Success delete artist id ${fullname}`,
            })
        } catch (error) {
            console.log("🚀 ~ file: artistControllers.js ~ line 209 ~ deleteArtist: ~ error", error)
            res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}