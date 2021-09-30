const { Genres } = require('../models');

class GenresController{

    static create (req, res, next) {
        let { name } = req.body;

        Genres.create({
            name: name
        })
        .then(data => {
            res.status(201).json({ message: 'Genres has been created'});
        })
        .catch(next);
    };

    static getAll (req, res, next) {
        Genres.findAll()
        .then(data => {
            res.status(200).json({ 
                Genres: data
            })
        })
        .catch(next)
    };

    static update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        Genres.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: `Genres id ${id} is not found `}
            } else {
                res.status(200).json({ message: `Genres id ${id} has been updated`})
            };
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        Genres.destroy({
            where : {
                id: id
            }
        })
        .then(data=> {
            if (!data) {
                throw { message: `Genres id ${id} is not found` }
            } else {
                res.status(200).json({ message: `Genres ${id} has been deleted`})
            };
        });
    };
}

module.exports = GenresController;