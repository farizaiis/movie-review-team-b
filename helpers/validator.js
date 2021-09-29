const joi = require('joi')

    async function validator(req, res, fullname, file) {

        const schema = await joi.object({
            fullname: joi.string().required(),
            image: joi.string().max(200000).required()
        })
        
        const {error} = await schema.validate({
            fullname: fullname,
            image: file.path
        }, {
            abortEarly:false
        })
        
        if(error){
            console.log("🚀 ~ file: ArtistsController.js ~ line 24 ~ addartist: ~ error", error)
            res.status(400).json({
                status: "failed",
                message: "input uncorrectly",
                errors: error["details"][0]["message"]
            })
        }
    }
module.exports = { validator }