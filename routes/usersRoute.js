const express = require('express')
const router = express.Router()
const users = require('../controllers/usersControllers')
const auth = require('../middlewares/authentication')
const author = require('../middlewares/authorization')
const uploadAvatar = require('../middlewares/uploadAvatar')

router.post("/login", users.login) 
router.post("/register", users.register) 
router.get("/:id", auth, users.getOneUser)
router.put("/password/:id", auth, author.authUser, users.updatePassUsers)
router.put("/data/:id", auth, author.authUser, users.updateDataUsers)

module.exports = router

//makesure FE & RN perihal delete user