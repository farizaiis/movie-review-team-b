const express = require('express')
const watchlistController = require('../controllers/watchlistControllers')
const router = express.Router()

router.post('/', watchlistController.addWachlist) //login-auth-admin
router.get('/:id', watchlistController.getWatchlistsbyIdUser)
router.delete('/:id', watchlistController.deleteWatchlistsById) //login-auth-admin

module.exports = router
