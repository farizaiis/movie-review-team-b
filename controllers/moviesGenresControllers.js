const { MoviesGenres, Genres, Movies } = require('../models');


class MoviesGenresControllers {
    static async create (req, res, next) {
        let { MovieId, GenreId } = req.body;
        const dataGenre = await MoviesGenres.findOne({
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
            MoviesGenres.create({
            MovieId: MovieId,
            GenreId: GenreId
        })}
        res.status(201).json({ message: 'movies genres models has been created'})
        
    };

    // static async getAllMoviesByGenres(req, res, next) {
    //     console.log(req.query)
    //     let { page } = req.query;

    //     if(!page) {
    //         page = 1
    //     }
    //     const allMovies = await Movies.findAll({
    //             include: [
    //                 {
    //                     model: MoviesGenres,
    //                     include: [{
    //                         model: Genres,
    //                         attributes: ["name"]
    //                     }],
    //                 }
    //             ],
    //             offset: 15*(page-1),
    //             limit: 15
    //         });
    //     res.status(200).json(allMovies)
    // };

    // static async getMovieByGenreId(req, res) {
    //     let { page } = req.query;
    //     let { GenreId } = req.query;

    //     if(!page) {
    //         page = 1
    //     }
    //     const moviesByGenre = await Movies.findAll({
    //                     include: [ 
    //                         { 
    //                             model: MoviesGenres,
    //                             attributes : { exclude : ["id", "MovieId", "updatedAt", "createdAt"]},
    //                             where: {
    //                                 GenreId: GenreId
    //                             }, include: Genres,
    //                         }
    //                     ],
    //             offset: 15*(page-1),
    //             limit: 15
    //         });
    //     res.status(200).json(moviesByGenre)
    // };


    // static async getGenresByMovie(req, res, next) {
    //     let { page } = req.query;
    //     let { MovieId } = req.query;

    //     if(!page) {
    //         page = 1
    //     }
    //     const dataGenreMovie = await Movies.findAll({
    //                     include: [ 
    //                         { 
    //                             model: MoviesGenres,
    //                             where: {
    //                                 MovieId: MovieId
    //                             }, 
    //                             include: Genres,
    //                         }
    //                     ],
    //             offset: 15*(page-1),
    //             limit: 15
    //         });
    //     res.status(200).json(dataGenreMovie)
    // }; 

    static getAll (req, res, next) {
        MoviesGenres.findAll()
        .then(data => {
            res.status(200).json({ 
                MoviesGenres: data
            })
        })
        .catch(next)
    };

    static async update (req, res, next){
        let { id } = req.params;
        let { MovieId, GenreId } = req.body;
        const idMoviesGenres = await MoviesGenres.findOne({where: {id: id}});

        if(!idMoviesGenres ) {
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
            MoviesGenres.update({
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

        MoviesGenres.destroy({
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
