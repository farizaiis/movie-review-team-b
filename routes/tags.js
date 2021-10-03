const router = require('express').Router();
const tagsController = require('../controllers/tagsControllers');
const { authAdmin } = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');

router.post('/create', auth, authAdmin, tagsController.create);
router.get('/',   tagsController.getAll);
router.put('/update/:id', auth, authAdmin, tagsController.update);
router.delete('/delete/:id', auth, authAdmin, tagsController.delete);

module.exports = router;