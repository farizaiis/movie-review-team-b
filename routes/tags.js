const router = require('express').Router();
const TagsController = require('../controllers/tagsControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create', auth, authAdmin, TagsController.create);
router.get('/', auth, authAdmin, TagsController.getAll);
router.put('/update/:id', auth, authAdmin, TagsController.update);
router.delete('/delete/:id', auth, authAdmin, TagsController.delete);

module.exports = router;