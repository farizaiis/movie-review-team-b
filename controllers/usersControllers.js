const { users } = require('../models')
require('dotenv').config();
const Joi = require('joi')
const jwt = require("../helpers/jwt")
const bcrypt = require("../helpers/bcrypt")

module.exports = {
    register : async (req, res) => {            //<---- Register data users include nge create data nya ke Table
        const body = req.body
        try {
            const schema = Joi.object({
                role : Joi.string(),
                fullname : Joi.string().required(),
                email : Joi.string().required(),
                password : Joi.string().min(6).max(12).required(),
                img : Joi.string()
            })

            const check = schema.validate({ ...body }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }
            //check agar email tidak double
            const checkemail = await users.findOne({
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

            const user = await users.create({
                role : body.role,
                fullname : body.fullname,
                email : body.email,
                password : hashedPassword,
                //img: req.file.path
            });

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

    login : async (req, res) => {       //<---- Login data users agar bisa dapet token
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

            const checkemail = await users.findOne({
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
            const usersData = await users.findOne({ where : { id } }); 
            
            //check jika data admin yang dicari sesuai Id ada nilai nya atau tidak
            if(!usersData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data User",
                data: usersData
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
            const usersData = await users.findAll(); 
            
            //check jika data admin sudah ada nilai/isi nya di table
            if(!usersData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Users",
                data: usersData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updatePassUsers : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({         //<-----Validasi inputan di body
                password : Joi.string()
            })

            const { error } = schema.validate(
                {
                    password : body.password
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

            //enkripsi password yang akan di update
            const hashedPassword = bcrypt.encrypt(body.password)

            const checkPassword = bcrypt.cekPass(body.password, hashedPassword)

            if(checkPassword) {
                return res.status(400).json({
                    status: "fail",
                    message: "Password already used before, please use new password",
                });
            }

            const usersUpdatePass = await users.update(
                {
                    password : hashedPassword
                },
                { where : { id } }
            ); 

            if(!usersUpdatePass[0]) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            //ngambil data yang telah di update supaya muncul datanya di postman
            const data = await users.findOne({
                where : { id }
            })
            
            return res.status(200).json({
                status : "success",
                message : "Succesfully update the password",
                data : data
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
                img: Joi.string()
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
            
            if(body.email) {
                const checkemail = await users.findOne({where : { email : body.email }})
                if(checkemail) {
                    return res.status(400).json({
                        status: "fail",
                        message: "email already used before, please use another email",
                    });
                }
            }
            
            const userUpdate = await users.update(
                {
                    ...body
                },
                { where : { id } }
            ); 
            
            if(!userUpdate) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }
            
            const data = await users.findOne({
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
            const usersData = await users.destroy({ where : { id } }); 
            if(!usersData) {
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