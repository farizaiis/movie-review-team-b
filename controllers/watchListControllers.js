const { watchlist, users, movies } =  require('../models')

module.exports = {
    addWachlist: async (req, res) => {
        let { userId, movieId } = req.body

        try {
            const watchlistCreate = await watchlist.create({
                userId: userId,
                movieId: movieId
            })

            if (!watchlistCreate) {
                return res.status(400).json({
                    status: "failed",
                    message: "cannot add watchlis"
                })
            }

            res.status(200).json({
                status: "success",
                message: "successfully add to list watchlist",
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
        const { userId, page } = req.params
        try {
            const getById = await users.findOne({
                where: {
                    userId: userId
                },
                include: [
                    {
                        model: movies
                    }
                ]
            })

            if (!getById) {
                
            }
        } catch (error) {
            
        }
    }
}