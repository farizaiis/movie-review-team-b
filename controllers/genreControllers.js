const { Genres } = require('../models');

class GenresController{

    static async create (req, res, next) {
        let { name } = req.body;
        
        if(!name) {
            res.status(400).json({ 
                status: "failed",
                message: "Please put Genres name",
            });
        };

        const GenresName  = await Genres.findOne({ where: {name: name.toLowerCase()}});

        if(GenresName) {
            res.status(400).json({ 
                status: "failed",
                message: "Genres already been used, please add another Genres",
            });
        } else {const createGenres = await Genres.create({
            name: name.toLowerCase()
        })}
        res.status(201).json({
            status: "Success",
            message: "Genres has been create"
        });
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

    static async update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        const dataGenres = await Genres.findOne({ where: {id: id}})

        if(!dataGenres) {
            res.status(400).json({
                status: "failed",
                message: `Genres id ${id} is not found`
            })
        } else {
        Genres.update({
            name: name.toLowerCase()
        },{
            where: {
                id: id
            }
        });
    };
        res.status(200).json({ 
            message: `Genres id ${id} has been updated`
        })    
    };

    static async delete (req, res, next) {
        let { id } = req.params;
        let dataGenres = await Genres.findOne({ where: {id:id}})

        if(!dataGenres) {
            res.status(400).json({ 
                status: "fail",
                message: `Genres id ${id} is not found`
            })
        };

        const deleteGenres = await Genres.destroy({
            where : {
                id: id
            }
        });

        res.status(200).json({
            status: "success", 
            message: `Genres ${id} has been deleted`
        });
    };    
};

module.exports = GenresController;
