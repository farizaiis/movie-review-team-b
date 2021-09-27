const express = require('express')
const router = express.Router()
const artistRouter = require('./artist.routes')
const usersRouter = require('./usersRoute')
const adminRouter = require('./adminRoute')
const moviesRouter = require('./moviesRoute')

router.use('/v1/artists', artistRouter)
router.use("/v1/users", usersRouter)
router.use('/v1/admin', adminRouter)
router.use('/v1/movies', moviesRouter)

module.exports = router