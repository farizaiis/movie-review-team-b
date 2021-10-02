const express = require('express')
const router = express.Router()
const watchlistController = require('../controllers/watchListControllers')
const authLogin = require('../middlewares/authentication')

router.post('/', authLogin, watchlistController.addWachlist)
router.get('/:id', authLogin, watchlistController.getById)
router.delete('/:id', authLogin, watchlistController.deleteWatchlistsById)
