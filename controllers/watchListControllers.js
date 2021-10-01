const { Watchlists, Users, Movies } =  require('../models')

module.exports = {
    addWachlist: async (req, res) => {  //nanti lanjut biar adem
        const UserId = req.users.id
        const body = req.body

        try {
            const checkMovie = await Watchlists.findOne({
                where: {
                    MovieId: body.MovieId,
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
                MovieId: body.MovieId
            })

            if (!watchlistsCreate) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add movie to watchlis"
                })
            }

            res.status(200).json({
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

    getById: async (req, res) => {
        const id = req.params.id

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
                message: `"success get data watchlist by id ${id}"`,
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
                res.status(400).json({
                    status: "failed",
                    message: `failed delete Watchlists id ${id}`
                })
            }

            res.status(200).json({
                status: "Success",
                message: `Success delete Watchlists id ${id}`,
            })
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}