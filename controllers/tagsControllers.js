const { Tags } = require('../models');

class TagsController{

    static create (req, res, next) {
        let { name } = req.body;

        Tags.create({
            name: name
        })
        .then(data => {
            res.status(201).json({ message: 'Tags has been created'});
        })
        .catch(next);
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

    static update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        Tags.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: `Tags id ${id} is not found `}
            } else {
                res.status(200).json({ message: `Tags id ${id} has been updated`})
            };
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        Tags.destroy({
            where : {
                id: id
            }
        })
        .then(data=> {
            if (!data) {
                throw { message: `Tags id ${id} is not found` }
            } else {
                res.status(200).json({ message: `Tags ${id} has been deleted`})
            };
        });
    };
}

module.exports = TagsController;