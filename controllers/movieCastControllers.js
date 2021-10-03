const { MoviesCasts, Movies, Artists } = require('../models');


class MoviesCastControllers {
    static async postMovieCast (req, res, next) {
        let { MovieId, ArtistId } = req.body;

        const checkMovieId = await Movies.findOne({
            where: {
                id: MovieId
            }
        })

        const checkArtistId = await Artists.findOne({
            where: {
                id: ArtistId
            }
        })

        if(!checkMovieId || !checkArtistId) {
            return res.status(400).json({
                status: "failed",
                message: "Movie or Artist Not Found"
            })
        }

        const data = await MoviesCasts.findOne({
            where : {
                MovieId : MovieId,
                ArtistId : ArtistId
            }
        })

        if(data) {
            return res.status(400).json({
                status: "Failed",
                message: 'Movies characters already added'
        })
    } else {
        MoviesCasts.create({
        MovieId: MovieId,
        ArtistId: ArtistId
    })}
    return res.status(201).json({ message: 'Movies characters models has been created'})
        .catch(next);
    };

    static async movieCastUpdate (req, res, next){
        let { id } = req.params;
        let { MovieId, ArtistId } = req.body;

        const checkData = await MoviesCasts.findOne({
            where : {
                id
            }
        })

        if(!checkData) {
            return res.status(400).json({
                status: "failed",
                message: "Data not Found"
            })
        } 

        const movieCast = await MoviesCasts.findOne({
            where: {
                MovieId, ArtistId
            }
        });
        
        if(movieCast) {
            return res.status(400).json({
                status: "failed",
                message: `Cannot Duplicate Data`
            })
        } 

        const checkMovieId = await Movies.findOne({
            where: {
                id: MovieId
            }
        })

        const checkArtistId = await Artists.findOne({
            where: {
                id: ArtistId
            }
        })

        if(!checkMovieId || !checkArtistId) {
            return res.status(400).json({
                status: "failed",
                message: "Movie or Artist Not Found"
            })
        }
        
        if (!MovieId || !ArtistId) {
            return res.status(400).json({
                status: "Failed",
                message: "Bad Request, Input MovieId and ArtistId"
            })
        } else {
            MoviesCasts.update({
            MovieId: MovieId,
            ArtistId: ArtistId
        }, {
            where: {
                id: id
            }
        })};
        res.status(200).json({ message: `Movie Cast id ${id} has been updated`})
            
    };

    static async movieCastDelete (req, res, next) {
        let { id } = req.params;

        const check = await MoviesCasts.findOne({where : {id}})

        if(!check) {
            return res.status(400).json({
                status: "failed",
                message: "Data not Found"
            })
        }

        MoviesCasts.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Character id ${id} not found`}
            } else {
                res.status(200).json({ message: `Movie Character has been deleted`})
            };
        });
    };
}

module.exports = MoviesCastControllers;