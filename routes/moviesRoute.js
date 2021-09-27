const express = require('express')
const router = express.Router()
const movies = require('../controllers/moviesControllers')
const auth = require('../middlewares/authentication')
const author = require('../middlewares/authorization')

router.post("/post", auth, author.authAdmin, movies.postMovie)  
router.get("/:id", movies.getOneMovie)
router.get("/", movies.getAllmovies)
router.put("/update/:id", auth, author.authAdmin, movies.updateMovies)
router.delete("/delete/:id", auth, author.authAdmin, movies.deletemovies)

module.exports = router