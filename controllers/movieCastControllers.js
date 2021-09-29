const { MoviesCharacters, Movies, Artist, Genre } = require('../models/indexModels');


class MoviesCharactersControllers {
    static create (req, res, next) {
        let { moviesId, artistId } = req.body;

        MoviesCharacters.create({
            moviesId: moviesId,
            charactersId: artistId
        })
        .then(data => {
            res.status(201).json({ message: 'movies characters models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByCharacters(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        MoviesCharacters.findAll({
            include: [
                {
                    model: Movies
                },
                {
                    model: Artist
                },
                {
                    model: Genre
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesCharacters)
    };
    

    static getMoviesByCharacters(req, res, next) {
        let { moviesId, page } = req.params;

        MoviesCharacters.findAndCountAll({
            where: { 
                moviesId: moviesId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Artist
                },
                {
                    model: Genre
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesCharacters)
    };

    static getCharactersByMovies(req, res, next) {
        let { artistId } = req.params;

        MoviesTags.findAll({
            where: { 
                artistId: artistId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Artist
                },
                {
                    model: Genre
                }
            ],
        });
        res.status(200).json(MoviesTags)
    };

    static update (req, res, next){
        let { id } = req.params;
        let { moviesId, artistId } = req.body;

        MoviesCharacters.update({
            moviesId: moviesId,
            artistId: artistId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Characters id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Characters id ${id} has been updated`})
            }
        });
    };

    static delete (res, res, next) {
        let { id } = req.params;

        MoviesCharacters.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Character id ${id} not found`}
            } else {
                res.status(200).json({ message: `Character id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesCharactersControllers;
