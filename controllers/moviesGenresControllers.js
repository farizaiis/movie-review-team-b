const { MovieGenre, Genre, Movies } = require('../models');


class MoviesGenresControllers {
    static async create (req, res, next) {
        let { MovieId, GenreId } = req.body;
        const dataGenre = await MovieGenre.findOne({
            where: {
                MovieId: MovieId,
                GenreId: GenreId
            }
        })

        if(dataGenre) {
            res.status(400).json({
                status: "failed",
                message: "Movie already have the Genre, please put another"
            })
        } else {
            MovieGenre.create({
            MovieId: MovieId,
            GenreId: GenreId
        })}
        res.status(201).json({ message: 'movies genres models has been created'})
        
    };

    static async getAllMoviesByGenres(req, res, next) {
        console.log(req.query)
        let { page } = req.query;

        if(!page) {
            page = 1
        }
        const allMovies = await Movies.findAll({
                include: [
                    {
                        model: MovieGenre,
                        include: [{
                            model: Genre,
                            attributes: ["name"]
                        }],
                    }
                ],
                offset: 15*(page-1),
                limit: 15
            });
        res.status(200).json(allMovies)
    };

    static async getMovieByGenreId(req, res) {
        let { page } = req.query;
        let { GenreId } = req.query;

        if(!page) {
            page = 1
        }
        const moviesByGenre = await Movies.findAll({
                        include: [ 
                            { 
                                model: MovieGenre,
                                attributes : { exclude : ["id", "MovieId", "updatedAt", "createdAt"]},
                                where: {
                                    GenreId: GenreId
                                }, include: Genre,
                            }
                        ],
                offset: 15*(page-1),
                limit: 15
            });
        res.status(200).json(moviesByGenre)
    };


    static async getGenresByMovie(req, res, next) {
        let { page } = req.query;
        let { MovieId } = req.query;

        if(!page) {
            page = 1
        }
        const dataGenreMovie = await Movies.findAll({
                        include: [ 
                            { 
                                model: MovieGenre,
                                where: {
                                    MovieId: MovieId
                                }, 
                                include: Genre,
                            }
                        ],
                offset: 15*(page-1),
                limit: 15
            });
        res.status(200).json(dataGenreMovie)
    }; 

    static async update (req, res, next){
        let { id } = req.params;
        let { MovieId, GenreId } = req.body;
        const idMovieGenre = await MovieGenre.findOne({where: {id: id}});

        if(!idMovieGenre ) {
            res.status(400).json({
                status: "failed",
                message: `Movies genres id ${id} has not found`
            })
        } else if (!MovieId || !GenreId) {
            res.status(400).json({
                status: "failed",
                message: "Please fill the required"
            })
        } else {
            MovieGenre.update({
            MovieId: MovieId,
            GenreId: GenreId
        }, {
            where: {
                id: id
            }
        })};
        res.status(200).json({ message: `Movie id ${MovieId} with genres id ${GenreId} has been updated`})
            
    };

    static delete (req, res, next) {
        let { id } = req.params;

        MovieGenre.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Movies genress id ${id} has not found`}
            } else {
                res.status(200).json({ message: `Movies genress id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesGenresControllers;
