const { tags } = require('../models');

class tagssController{

    static create (req, res, next) {
        let { name } = req.body;

        tags.create({
            name: name
        })
        .then(data => {
            res.status(201).json({ message: 'tags has been created'});
        })
        .catch(next);
    };

    static getAll (req, res, next) {
        tags.findAll()
        .then(data => {
            res.status(200).json({ 
                tags: data
            })
        })
        .catch(next)
    };

    static update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        tags.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: `tags id ${id} is not found `}
            } else {
                res.status(200).json({ message: `tags id ${id} has been updated`})
            };
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        tags.destroy({
            where : {
                id: id
            }
        })
        .then(data=> {
            if (!data) {
                throw { message: `tags id ${id} is not found` }
            } else {
                res.status(200).json({ message: `tags ${id} has been deleted`})
            };
        });
    };
}

module.exports = tagssController;