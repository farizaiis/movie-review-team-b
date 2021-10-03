const { Users } = require('../models')
require('dotenv').config();
const Joi = require('joi')
const jwt = require("../helpers/jwt")
const bcrypt = require("../helpers/bcrypt")

module.exports = {
    register : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                fullname : Joi.string().required(),
                email : Joi.string().required(),
                password : Joi.string().min(6).max(12).required(),
                img : Joi.string()
            })

            const check = schema.validate({
                fullname : body.fullname,
                email : body.email,
                password : body.password,
                img : req.file ? req.file.path : "img"
            }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }
            const checkemail = await Users.findOne({
                where: {
                    email: body.email
                }
            })

            if(checkemail) {
                return res.status(400).json({
                    status: "fail",
                    message: "email already used, please use another email, or login",
                });
            }

            const hashedPassword = bcrypt.encrypt(body.password)

            const user = await Users.create({
                fullname : body.fullname,
                email : body.email,
                password : hashedPassword,
                [req.file ? "img" : null]: req.file ? req.file.path : null
            })

            const payload = {
                role : user.dataValues.role,
                email : user.dataValues.email,
                id : user.dataValues.id
            }

            const token = jwt.generateToken(payload)

            return res.status(200).json({
                        status: "success",
                        message: "Registered successfully",
                        token: token,
                    });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
            });
        }
    },

    login : async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                email : Joi.string().required(),
                password : Joi.string().min(6).max(12).required()
            })

            const check = schema.validate({ ...body }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }

            const checkemail = await Users.findOne({
                where: {
                    email: body.email
                }
            })

            if(!checkemail) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid email",
                });
            }

            const checkPassword = bcrypt.cekPass(body.password, checkemail.dataValues.password)

            if (!checkPassword) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid Password"
                })
            }

            const payload = {
                role : checkemail.dataValues.role,
                email : checkemail.dataValues.email,
                id : checkemail.dataValues.id
            }

            const token = jwt.generateToken(payload)

            return res.status(200).json({
                        status: "success",
                        message: "Login successfully",
                        token: token,
                    });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
            });
        }
    },

    getOneUser : async (req, res) => {
        const id = req.params.id
        try {
            const UsersData = await Users.findOne({ where : { id } }); 
            
            if(!UsersData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            if(UsersData.dataValues.role == "admin") {
                return res.status(400).json({
                    status : "failed",
                    message : "Cannot access the Data"
                })
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data User",
                data: UsersData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllUsers : async (req, res) => {
        try {
            const UsersData = await Users.findAll(); 
            
            //check jika data user sudah ada nilai/isi nya di table
            if(!UsersData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Users",
                data: UsersData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updateDataUsers : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({            
                fullname : Joi.string(),
                email : Joi.string(),
                password : Joi.string(),
                img: Joi.string()
            })

            const { error } = schema.validate(
                {
                    fullname : body.fullname,
                    email : body.email,
                    password : body.password,
                    img : req.file ? req.file.path : "img"
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

            const checkrole = await Users.findOne({
                where : { id }
            })

            if(checkrole.dataValues.role == "admin"){
                return res.status(400).json({
                    status : "failed",
                    message : "Cannot update Data Admin"
                })
            }
            
            if(body.email) {
                const checkemail = await Users.findOne({where : { email : body.email }})
                if(checkemail) {
                    return res.status(400).json({
                        status: "fail",
                        message: "email already used before, please use another email",
                    });
                }
            }

            if(body.password) {
                const checkId = await Users.findOne({
                    where: {
                        id : req.params.id
                    }
                })

                const checkPassword = bcrypt.cekPass(body.password, checkId.dataValues.password)

                if(checkPassword) {
                    return res.status(400).json({
                        status: "fail",
                        message: "Password already used before, please use new password",
                    });
                }
                
                const hashedPassword = bcrypt.encrypt(body.password)

                await Users.update({ password : hashedPassword }, { where : { id } }); 
            }

            const userUpdate = await Users.update(
                {
                    fullname : body.fullname,
                    email : body.email,
                    [req.file ? "img" : null]: req.file ? req.file.path : null
                },
                { where : { id } }
            ); 
            
            if(!userUpdate) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }
            
            const data = await Users.findOne({
                where : { id }
            })
            
            return res.status(200).json({
                status : "success",
                message : "Succesfully update the data",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    deleteUsers : async (req, res) => {
        const id = req.params.id
        try {
            const UsersData = await Users.destroy({ where : { id } }); 
            if(!UsersData) {
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