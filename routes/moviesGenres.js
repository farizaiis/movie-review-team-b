const router = require('express').Router();
const MoviesGenresControllers = require ('../controllers/moviesGenresControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authorization');

router.post('/create', auth, authAdmin, MoviesGenresControllers.create);
router.get('/moviesbygenre', MoviesGenresControllers.getAllMoviesByGenre);
router.put('/update/:id', auth, authAdmin, MoviesGenresControllers.update);
router.delete('/delete/:id', auth, authAdmin, MoviesGenresControllers.delete);


module.exports = router;