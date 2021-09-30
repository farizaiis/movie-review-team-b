const { Watchlist, Users, Movies } =  require('../models')

module.exports = {
    addWachlist: async (req, res) => {
        const {id} = req.params
        const usersId = req.Users.id

        try {
            const checkMovie = await Watchlist.findOne({ 
                where: {
                    moviesId: id,
                    usersId
                }
            });

            if (checkMovie) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to watchlist'
                });
            }

            const watchlistCreate = await Watchlist.create({
                usersId,
                moviesId: id
            })

            if (!watchlistCreate) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add movie to watchlis"
                })
            }

            res.status(200).json({
                status: "success",
                message: "successfully add to list Watchlist",
                data: watchlistCreate
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getWatchlistbyIdUser: async (req, res) => {
        const { usersId } = req.params.usersId
        try {
            const getById = await Users.findOne({
                where: {
                    usersId
                },
                include: [
                    {
                        model: Movies
                    }
                ]
            })

            if (!getById) {
                return res.status(400).json({
                    status: "failed",
                    message: `id ${id} cannot found`
                })
            }

            return res.status(200).json({
                status: "success",
                message: `Success retrieved your watchlist id user ${id}`,
                data: getById
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    deleteWatchlistById: async (req, res) => {
        const id = req.params.id

        try {
            const removeWatchlist = await Watchlist.destroy({
                where: {
                    id: id
                }
            })

            if (!removeWatchlist) {
                res.status(400).json({
                    status: "failed",
                    message: `failed delete watchlist id ${id}`
                })
            }

            res.status(200).json({
                status: "Success",
                message: `Success delete watchlist id ${id}`,
            })
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "internal server error"
            })
        }
    }
}