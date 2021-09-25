const express = require('express')
const router = express.Router()
const characterRouter = require('./character.routes')

router.use('/characters', characterRouter)

module.exports = router