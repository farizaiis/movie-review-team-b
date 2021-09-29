const multer = require("multer")
const path = require("path")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

require('dotenv').config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CLOUD, 
    api_secret: process.env.API_SECRET_CLOUD 
})

module.exports = (fieldName) => {
    try {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: "Artists",
                resource_type: "raw",
                public_id: (req, file) => "image - " + new Date().getTime() + path.extname(file.originalname),
            }
        })

        const upload = multer({
            storage: storage
        }).single(fieldName)

        return (req, res, next) => {
            upload(req, res, (err) => {
                return next();
            })
        }
    } catch (error) {
        console.log("🚀 ~ file: uploadCloud.js ~ line 33 ~ error", error)
    }
}