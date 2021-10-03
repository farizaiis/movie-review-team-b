const { Genres } = require('../models');

class GenresController{

    static async create (req, res, next) {
        let { name } = req.body;
        
        if(!name) {
            return res.status(400).json({ 
                status: "failed",
                message: "Please put Genre name",
            });
        };

        const genreName  = await Genres.findOne({ where: {name: name}});

        if(genreName) {
            return res.status(400).json({ 
                status: "failed",
                message: "Genre already been used, please add another Genre",
            });
        } else {const createGenre = await Genres.create({
            name: name
        })}
        return res.status(201).json({
            status: "Success",
            message: "Genre has been create"
        });
    };

    static getAll (req, res, next) {
        Genres.findAll()
        .then(data => {
            res.status(200).json({ 
                Genre: data
            })
        })
        .catch(next)
    };

    static async update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        const dataGenres = await Genres.findOne({ where: {id: id}})

        if(!dataGenres) {
            return res.status(400).json({
                status: "failed",
                message: `Genres id ${id} is not found`
            })
        }
        
        const checkName = await Genres.findOne({ where : { name : name}})

        if(checkName){
            return res.status(400).json({
                status: "failed",
                message: `Genre ${name} is added to database`
            })
        }

        Genres.update({
            name: name.toLowerCase()
        },{
            where: {
                id: id
            }
        });

        return res.status(200).json({ 
            message: `Genres id ${id} has been updated`
        })    
    };

    static async delete (req, res, next) {
        let { id } = req.params;
        let dataGenres = await Genres.findOne({ where: {id:id}})

        if(!dataGenres) {
            return res.status(400).json({ 
                status: "fail",
                message: `Genres id ${id} is not found`
            })
        };

        await Genres.destroy({
            where : {
                id: id
            }
        });

        return res.status(200).json({
            status: "success", 
            message: `Genres ${id} has been deleted`
        });
    };    
};

module.exports = GenresController;
