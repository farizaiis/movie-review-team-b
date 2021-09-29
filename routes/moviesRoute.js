const express = require('express')
const router = express.Router()
const movies = require('../controllers/moviesControllers')
const auth = require('../middlewares/authentication')
const author = require('../middlewares/authorization')
const uploadPoster = require('../middlewares/uploadPoster')

router.post("/post", auth, uploadPoster("Poster"), author.authAdmin, movies.postMovie)  
router.get("/:id", movies.getOneMovie)
router.get("/", movies.getAllmovies)
router.put("/update/:id", auth, author.authAdmin, uploadPoster("Poster"), movies.updateMovies)
router.delete("/delete/:id", auth, author.authAdmin, movies.deletemovies)
router.get("/search/:keyword", movies.searchMovies)



module.exports = router