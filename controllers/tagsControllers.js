const { Tag } = require('../models');

class tagsController{

    static async create (req, res, next) {
        let { name } = req.body;
        const tagName  = await Tag.findOne({ where: {name: name}});

        if(!name) {
            res.status(400).json({ 
                status: "failed",
                message: "Please put Tag name",
            });
        }
        if(tagName) {
            res.status(400).json({ 
                status: "failed",
                message: "Tag already been used, please add another Tag",
            });
        } else {const createTag = await Tag.create({
                name: name
            })}
            res.status(201).json({
                status: "Success",
                message: "Tag has been created"
            }); 
    };

    static getAll (req, res, next) {
        Tag.findAll()
        .then(data => {
            res.status(200).json({ 
                Tag: data
            })
        })
        .catch(next)
    };

    static async update (req, res) {
        let { id } = req.params;
        let { name } = req.body;

        const dataTag = await Tag.findOne({where: {id: id}})

        if(!dataTag) {
            res.status(400).json({
                status: "failed",
                message: `Tag id ${id} is not found`
            })
        } else if(!name) {
            res.status(400).json({
                status: "failed",
                message: "Please fill the required"
            })
        } else {
            Tag.update({
            name: name
        },{
            where: {
                id: id
            }
        })}
        res.status(200).json({ message: `Tag id ${id} has been updated`});
            
    };

    static async delete (req, res, next) {
        let { id } = req.params;

        const dataTag = await Tag.findOne({ where: {id: id}});

        if(!dataTag) {
            res.status(400).json({
                status: "failed",
                message: `Tag id ${id} is not found`
            });
        } else {Tag.destroy({
            where : {
                id: id
            }
        })}
        res.status(200).json({ message: `Tag ${id} has been deleted`})
    }        
}

module.exports = tagsController;
