const { MoviesGenres, Genres, Movies } = require('../models');


class MoviesGenresControllers {
    static async create (req, res, next) {
        let { MovieId, GenreId } = req.body;

        const checkMovieId = await Movies.findOne({
            where: {
                id: MovieId
            }
        })

        const checkGenreId = await Genres.findOne({
            where: {
                id: GenreId
            }
        })

        if(!checkMovieId || !checkGenreId) {
            return res.status(400).json({
                status: "failed",
                message: "Movie or Genre Not Found"
            })
        }

        const dataGenre = await MoviesGenres.findOne({
            where: {
                MovieId: MovieId,
                GenreId: GenreId
            }
        })

        if(dataGenre) {
            return res.status(400).json({
                status: "failed",
                message: "Movie already have the Genre, please put another"
            })
        } else {
            MoviesGenres.create({
            MovieId: MovieId,
            GenreId: GenreId
        })}
        res.status(201).json({ message: 'movies genres models has been created'})
        
    };

    static async update (req, res, next){
        let { id } = req.params;
        let { MovieId, GenreId } = req.body;
        const idMovieGenre = await MoviesGenres.findOne({where: {id: id}});
        
        if(!idMovieGenre ) {
            return res.status(400).json({
                status: "failed",
                message: `Movies genres id ${id} has not found`
            })
            } else if (!MovieId || !GenreId) {
                return res.status(400).json({
                    status: "failed",
                    message: "Please fill the required"
                })
            }
            
        const checkUpdateMovieGenre = await MoviesGenres.findOne({
            where: {
                MovieId: MovieId,
                GenreId: GenreId
            }
        })
        
        if(checkUpdateMovieGenre) {
            return res.status(400).json({
                status: "failed",
                message: "Movie already have the Genre"
            })
        } 
                
        const updateMov = await MoviesGenres.update({
                MovieId: MovieId,
                GenreId: GenreId
            }, {
                where: {
                    id: id
                }
            });

        if(updateMov) {
            return res.status(200).json({
                message: `Movie id ${MovieId} with genres id ${GenreId} has been updated`
            })}
    };


    static async delete (req, res, next) {
        let { id } = req.params;

        const deleteData = await MoviesGenres.destroy({
            where : {
                id: id
            }
        })

        if(!deleteData) {
            return res.status(400).json({
                status: "failed",
                message: `Movies genres id ${id} has not found`
            })
        } else {
            return res.status(200).json({ message: `Movies genress id ${id} has been deleted`})
        };
    };

}

module.exports = MoviesGenresControllers;
