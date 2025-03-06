
const express = require('express');
const routerController = require('./../controllers/reviewsController')
const authController = require('./../controllers/authController')
const router = express.Router();

router.route('/')
    .get(routerController.getAllReviews)
    .post(authController.protect, authController.restrictTo('user'), routerController.createReview)

router.route('/:id').get(authController.protect, routerController.getReview).patch(routerController.createReview).delete(routerController.deleteReview)

module.exports = router ; 