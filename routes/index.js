const express = require('express')
const router = express.Router()
const users = require('./usersRoute')
const admin = require('./adminRoute')
const movies = require('./moviesRoute')
const rating = require('./ratingRoutes');


router.use("/users", users)
router.use('/admin', admin)
router.use('/movies', movies)
router.use('/review', rating)

module.exports = router;