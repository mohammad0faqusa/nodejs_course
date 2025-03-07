const viewController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

const express = require('express');

const router = express.Router();

router.get('/',authController.isLoggedIn, viewController.getOverview )
router.get('/tours/:slug', authController.protect,authController.isLoggedIn, viewController.getTour)
router.get('/login', viewController.login)

module.exports = router 