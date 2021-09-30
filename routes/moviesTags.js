const router = require('express').Router();
const MoviesTagsControllers = require ('../controllers/moviesTagsControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create', auth, authAdmin, MoviesTagsControllers.create);
router.get('/moviesbytag', MoviesTagsControllers.getAllMoviesByTag);
router.put('/update/:id', auth, authAdmin, MoviesTagsControllers.update);
router.delete('/delete/:id', auth, authAdmin, MoviesTagsControllers.delete);


module.exports = router;