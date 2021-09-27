const router = require('express').Router();
const TagsController = require('../controllers/tagsControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authorization');

router.post('/create', TagsController.create);
router.get('/', TagsController.getAll);
router.put('/update/:id', TagsController.update);
router.delete('/delete/:id', TagsController.delete);

module.exports = router;