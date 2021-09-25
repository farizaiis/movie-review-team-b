const express = require('express')
const charactersController = require('../controllers/charactersController')
const uploadImage = require('../middlewares/characters/uploadCloud')
const router = express.Router()

router.post('/', uploadImage("image"), charactersController.addCharacter)
router.get('/', charactersController.getCharacters)
router.put('/:id', uploadImage("image"), charactersController.updateCharacter)
router.delete('/:id', charactersController.deleteCharacter)

module.exports = router