const router = require('express').Router();
const MoviesGenresControllers = require ('../controllers/moviesGenresControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create', auth, authAdmin, MoviesGenresControllers.create);
router.put('/update/:id', auth, authAdmin, MoviesGenresControllers.update);
router.delete('/delete/:id', auth, authAdmin, MoviesGenresControllers.delete);

module.exports = router