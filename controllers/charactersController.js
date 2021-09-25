const { Characters } = require('../models')
const router = require('../routes/character.routes')
const joi = require('joi')

module.exports = {
    addCharacter: async (req, res) => {
        const {
            nama
        } = req.body

        const file = req.file
        
        try {
            const schema = await joi.object({
                nama: joi.string().required(),
                image: joi.string().max(200000).required()
            })

            const {error} = await schema.validate({
                nama: nama,
                image: file.path
            }, {
                abortEarly:false
            })

            if(error){
                console.log("🚀 ~ file: charactersController.js ~ line 27 ~ addCharacter: ~ error", error)
                res.status(400).json({
                    status: "failed",
                    message: "input uncorrectly",
                    errors: error["details"][0]["message"]
                })
            }

            const characterCreate = await Characters.create({
                nama,
                image: file.path
            })
            
            if(!characterCreate){
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add character"
                })
            }

            res.status(200).json({
                status: "success",
                message: "Successfully add character",
                data: characterCreate
            })
            
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getCharacters: async(req, res) => {
        try {
            const getAll = await Characters.findAll({
                attributes: [
                    'id',
                    'nama',
                    'image'
                ]
            })

            if (!getAll) {
                return res.status(400).json({
                    status: "failed",
                    message: "you havent add characters to your list"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Success retrieved your character lists",
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

    updateCharacter: async (req, res) => {
        const id = req.params.id
        const file = req.file
        const {
            nama
        } = req.body

        try {
            const schema = joi.object({
                nama: joi.string().required(),
                image: joi.required()
            })

            const {error} = schema.validate({
                nama: nama,
                image: file.path
            }, {
                abortEarly:false
            })

            if(error){
                console.log("🚀 ~ file: charactersController.js ~ line 27 ~ addCharacter: ~ error", error)
                res.status(400).json({
                    status: "failed",
                    message: "input uncorrectly",
                    errors: error["details"][0]["message"]
                })
            }

            await Characters.update(
                {
                    nama,
                    image: file.path
                }, {
                    where: {
                        id: id
                    }
                }
            )
            
            const editCharacters = await Characters.findByPk(id)

            res.status(200).json({
                status: "success",
                message: `success update ${id}`,
                data: editCharacters
            })

        } catch (error) {
            console.log("🚀 ~ file: charactersController.js ~ line 97 ~ updateCharacter: ~ error", error)
            
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    deleteCharacter: async (req, res) => {
        const id = req.params.id
        try {
            const removeCharacter = await Characters.destroy({
                where: {
                    id
                }
            })

            if (!removeCharacter) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to delete data character"
                })
            }

            return res.status(200).json({
                status: "success",
                message: `Deleted successfully ${id}`
                // data: removeCharacter
            })
        } catch (error) {
            console.log("🚀 ~ file: charactersController.js ~ line 127 ~ deleteCharacter: ~ error", error)
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    }
}

