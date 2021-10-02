const router = require('express').Router();
const tagsController = require('../controllers/tagsControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create',  tagsController.create);
router.get('/',   tagsController.getAll);
router.put('/update/:id', tagsController.update);
router.delete('/delete/:id', tagsController.delete);

module.exports = router;