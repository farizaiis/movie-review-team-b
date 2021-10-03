const { Tags } = require('../models');

class TagsController{

    static async create (req, res, next) {
        let { name } = req.body;
        const TagsName  = await Tags.findOne({ where: {name: name}});

        if(!name) {
            return res.status(400).json({ 
                status: "failed",
                message: "Please put Tags name",
            });
        }
        if(TagsName) {
            return res.status(400).json({ 
                status: "failed",
                message: "Tags already been used, please add another Tags",
            });
        } 

        const createTags = await Tags.create({
                name: name
            })
            
        return res.status(201).json({
                status: "Success",
                message: "Tags has been created",
                data : createTags
        }); 
    };

    static getAll (req, res, next) {
        Tags.findAll()
        .then(data => {
            res.status(200).json({ 
                Tags: data
            })
        })
        .catch(next)
    };

    static async update (req, res) {
        let { id } = req.params;
        let { name } = req.body;

        const dataTags = await Tags.findOne({where: {id: id}})

        if(!dataTags) {
            return res.status(400).json({
                status: "failed",
                message: `Tags id ${id} is not found`
            })
        } else if(!name) {
            return res.status(400).json({
                status: "failed",
                message: "Please fill the required"
            })
        }

        const checkName = await Tags.findOne({ where : { name : name}})

        if(checkName){
            return res.status(400).json({
                status: "failed",
                message: `Tag ${name} is already added to database`
            })
        }

        Tags.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        return res.status(200).json({ message: `Tags id ${id} has been updated`});
            
    };

    static async delete (req, res, next) {
        let { id } = req.params;

        const dataTags = await Tags.findOne({ where: {id: id}});

        if(!dataTags) {
            return res.status(400).json({
                status: "failed",
                message: `Tags id ${id} is not found`
            });
        } else {Tags.destroy({
            where : {
                id: id
            }
        })}
        return res.status(200).json({ message: `Tags ${id} has been deleted`})
    }        
}

module.exports = TagsController;