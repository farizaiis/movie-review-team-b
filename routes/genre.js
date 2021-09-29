const router = require('express').Router();
const GenreController = require('../controllers/genreControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authorization');

router.post('/create', auth, authAdmin,GenreController.create);
router.get('/', auth, authAdmin, GenreController.getAll);
router.put('/update/:id', auth, authAdmin, GenreController.update);
router.delete('/delete/:id', auth, authAdmin, GenreController.delete);

module.exports = router;