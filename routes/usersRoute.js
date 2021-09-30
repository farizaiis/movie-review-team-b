const express = require('express')
const router = express.Router()
const users = require('../controllers/usersControllers')
const auth = require('../middlewares/authentication')
const author = require('../middlewares/authorization')
const uploadAvatar = require('../middlewares/uploadAvatar')

router.post("/login", users.login) 
router.post("/register", uploadAvatar("img"), users.register) 
router.get("/:id", auth, users.getOneUser)
router.put("/data/:id", auth, author.authUser, uploadAvatar("img"), users.updateDataUsers)
router.delete("/delete/:id", auth, author.authUser, users.deleteUsers)

module.exports = router