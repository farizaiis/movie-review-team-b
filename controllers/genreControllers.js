const { genre } = require('../models/indexModels');

class genreController{

    static create (req, res, next) {
        let { name } = req.body;

        genre.create({
            name: name
        })
        .then(data => {
            res.status(201).json({ message: 'genre has been created'});
        })
        .catch(next);
    };

    static getAll (req, res, next) {
        genre.findAll()
        .then(data => {
            res.status(200).json({ 
                genre: data
            })
        })
        .catch(next)
    };

    static update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        genre.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: `genre id ${id} is not found `}
            } else {
                res.status(200).json({ message: `genre id ${id} has been updated`})
            };
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        genre.destroy({
            where : {
                id: id
            }
        })
        .then(data=> {
            if (!data) {
                throw { message: `genre id ${id} is not found` }
            } else {
                res.status(200).json({ message: `genre ${id} has been deleted`})
            };
        });
    };
}

module.exports = genreController;