const multer = require("multer")
const path = require("path")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({ 
    cloud_name: 'awhds', 
    api_key: '811711878669313', 
    api_secret: 'OqwmxpG-N0R4iFA1RcdY9EgcA5c' 
})

module.exports = (fieldName) => {
    try {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: "characters",
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