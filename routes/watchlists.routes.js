const express = require('express')
const watchlistController = require('../controllers/watchlistControllers')
const router = express.Router()

router.post('/', watchlistController.addWachlist) //login-auth-admin
router.get('/:id', watchlistController.getWatchlistbyIdUser)
router.delete('/:id', watchlistController.deleteWatchlistById) //login-auth-admin

module.exports = router