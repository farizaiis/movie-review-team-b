const express = require('express')
const router = express.Router()
const review = require('../controllers/reviewsControllers');
// const author = require('../middlewares/authorization');
const auth = require('../middlewares/authentication');


router.get('/all/:page', review.getAllReview);
router.get('/moviereview/:id', review.getAllReviewByMovie);
router.get('/users', auth, review.getAllReviewByUser);
router.get('/:id', review.getOneReview);
router.post('/:id', auth, review.postReview);
router.delete('/delete/:id', auth, review.deleteReview);
router.put('/update/:id', auth, review.updateReview);

module.exports = router