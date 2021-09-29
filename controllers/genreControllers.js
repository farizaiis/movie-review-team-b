const { genres } = require('../models/indexModels');

class genresController{

    static create (req, res, next) {
        let { name } = req.body;

        genres.create({
            name: name
        })
        .then(data => {
            res.status(201).json({ message: 'genres has been created'});
        })
        .catch(next);
    };

    static getAll (req, res, next) {
        genres.findAll()
        .then(data => {
            res.status(200).json({ 
                genres: data
            })
        })
        .catch(next)
    };

    static update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        genres.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: `genres id ${id} is not found `}
            } else {
                res.status(200).json({ message: `genres id ${id} has been updated`})
            };
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        genres.destroy({
            where : {
                id: id
            }
        })
        .then(data=> {
            if (!data) {
                throw { message: `genres id ${id} is not found` }
            } else {
                res.status(200).json({ message: `genres ${id} has been deleted`})
            };
        });
    };
}

module.exports = genresController;