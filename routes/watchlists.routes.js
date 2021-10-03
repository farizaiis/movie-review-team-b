const express = require('express')
const router = express.Router()
const watchlistController = require('../controllers/watchListControllers')
const authLogin = require('../middlewares/authentication')

router.post('/:movieid', authLogin, watchlistController.addWachlist)
router.get('/list', authLogin, watchlistController.getByUserId)
router.delete('/delete/:id', authLogin, watchlistController.deleteWatchlistsById)

module.exports = router