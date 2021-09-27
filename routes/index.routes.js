const express = require('express')
const router = express.Router()
const artistRouter = require('./artist.routes')

router.use('/v1/artists', artistRouter)

module.exports = router