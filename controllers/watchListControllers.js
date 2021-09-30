const { Watchlists, Users, Movies } =  require('../models')

module.exports = {
    addWachlist: async (req, res) => {
        const {id} = req.params
        const UserId = req.Users.id

        try {
            const checkMovie = await Watchlists.findOne({ 
                where: {
                    MovieId: id,
                    UserId
                }
            });

            if (checkMovie) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Already added to Watchlists'
                });
            }

            const WatchlistsCreate = await Watchlists.create({
                UserId,
                MovieId: id
            })

            if (!WatchlistsCreate) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add movie to watchlis"
                })
            }

            res.status(200).json({
                status: "success",
                message: "successfully add to list Watchlists",
                data: WatchlistsCreate
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    getWatchlistsbyIdUser: async (req, res) => {
        const { UserId } = req.params.UserId
        try {
            const getById = await Users.findOne({
                where: {
                    UserId
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
                message: `Success retrieved your Watchlists id user ${id}`,
                data: getById
            })
        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            })
        }
    },

    deleteWatchlistsById: async (req, res) => {
        const id = req.params.id

        try {
            const removeWatchlists = await Watchlists.destroy({
                where: {
                    id: id
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