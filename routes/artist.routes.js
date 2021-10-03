const express = require('express')
const artistController = require('../controllers/artistControllers')
const uploadImage = require('../middlewares/characters/uploadCloud')
const {authAdmin} = require('../middlewares/authorization')
const authLogin = require('../middlewares/authentication')
const router = express.Router()

router.post('/', authLogin, authAdmin, uploadImage("image"), artistController.addArtist)
router.put('/update/:id', authLogin, authAdmin, uploadImage("image"), artistController.updateArtist)
router.delete('/delete/:id', authLogin, authAdmin, artistController.deleteArtist)
router.get('/:id', artistController.getArtistById)
router.get('/', artistController.getArtist)

module.exports = router