const { Watchlists, Users, Movies } =  require('../models')

module.exports = {
    addWachlist: async (req, res) => { 
        const UserId = req.users.id
        const movieid = req.params.movieid

        try {
            const checkMovie = await Watchlists.findOne({
                where: {
                    MovieId: movieid,
                    UserId
                }
            })

            if (checkMovie) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to Watchlists'
                });
            }

            const watchlistsCreate = await Watchlists.create({
                UserId: UserId,
                MovieId: movieid
            })

            if (!watchlistsCreate) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add movie to watchlis"
                })
            }

            return res.status(200).json({
                status: "success",
                message: "successfully add to list Watchlists",
                data: watchlistsCreate
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getByUserId: async (req, res) => {
        const id = req.users.id

        try {
            const getById = await Users.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: [
                        "id",
                        "createAt",
                        "updateAt"
                    ]
                },
                include: {
                    model: Movies,
                    as: "watchlists",
                    exclude: [
                        "id",
                        "createAt",
                        "updateAt"
                    ]
                }
            })
            return res.status(200).json({
                status: "success",
                message: `"success get data watchlist by User Id ${id}"`,
                data: getById
            })
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    },

    deleteWatchlistsById: async (req, res) => {
        const UserId = req.users.id
        const {id} = req.params
        
        try {
            const checkMovie = await Watchlists.findOne({
                where: {
                    id
                }
            })

            if (checkMovie.dataValues.UserId != UserId) {
                return res.status(400).json({
                    status: 'failed',
                    message: "cannot delete anthor user watchlist"
                });
            }

            const removeWatchlists = await Watchlists.destroy({
                where: {
                    id
                }
            })

            if (!removeWatchlists) {
                return res.status(400).json({
                    status: "failed",
                    message: `failed delete Watchlists id ${id}`
                })
            }

            return res.status(200).json({
                status: "Success",
                message: `Success delete Watchlists id ${id}`,
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}