const router = require('express').Router();
const GenreController = require('../controllers/genreControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authorization');

router.post('/create', GenreController.create);
router.get('/', GenreController.getAll);
router.put('/update/:id', GenreController.update);
router.delete('/delete/:id', GenreController.delete);

module.exports = router;