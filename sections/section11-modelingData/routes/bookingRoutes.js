const express = require('express');
const reviewController = require('./../controllers/reviewController');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.get('/checkout-session:tourID', authController.protect, bookingController.getCheckoutSession)

module.exports = router;
