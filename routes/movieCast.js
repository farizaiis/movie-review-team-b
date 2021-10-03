const router = require('express').Router();
const movieCast = require ('../controllers/movieCastControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create', auth, authAdmin, movieCast.postMovieCast);
router.put('/update/:id', auth, authAdmin, movieCast.movieCastUpdate);
router.delete('/delete/:id', auth, authAdmin, movieCast.movieCastDelete);


module.exports = router;