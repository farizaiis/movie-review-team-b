const express = require('express')
const router = express.Router()
const watchlistController = require('../controllers/watchlistControllers')
const auth = require('../middlewares/authentication')
const authUser = require('../middlewares/authorization')

router.post('/', auth, watchlistController.addWachlist) //login-auth-admin
router.get('/:id', auth, watchlistController.getById)
router.delete('/:id', auth, watchlistController.deleteWatchlistsById) //login-auth-admin

module.exports = router