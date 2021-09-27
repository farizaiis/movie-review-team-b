const express = require('express')
const artistController = require('../controllers/artistControllers')
const uploadImage = require('../middlewares/characters/uploadCloud')
const router = express.Router()

router.post('/', uploadImage("image"), artistController.addArtist) //login-auth-admin
router.put('/:id', uploadImage("image"), artistController.updateArtist) //login-auth-admin
router.delete('/:id', artistController.deleteArtist) //login-auth-admin
router.get('/:id', artistController.getArtistById)
router.get('/', artistController.getArtist)

module.exports = router