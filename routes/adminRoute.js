const express = require('express')
const router = express.Router()
const admin = require('../controllers/usersControllers')
const auth = require('../middlewares/authentication')
const author = require('../middlewares/authorization')
const uploadAvatar = require('../middlewares/uploadAvatar')

router.post("/register", uploadAvatar("img"), admin.register) 
router.post("/login", admin.login)  
router.get("/:id", auth, author.authAdmin, admin.getOneUser) 
router.get("/", auth, author.authAdmin, admin.getAllUsers)
router.put("/passUser/:id", auth, author.authAdmin, admin.updatePassUsers) 
router.put("/dataUser/:id", auth, uploadAvatar("img"), author.authAdmin, admin.updateDataUsers) 
router.delete("/deleteUser/:id", auth, author.authAdmin, admin.deleteUsers)

module.exports = router