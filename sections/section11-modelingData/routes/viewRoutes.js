const viewController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

const express = require('express');

const router = express.Router();


router.get('/',authController.isLoggedIn, viewController.getOverview )
router.get('/tours/:slug', authController.isLoggedIn, viewController.getTour)
router.get('/login', authController.isLoggedIn, viewController.login)
router.post('/logout', authController.logout)
router.get('/me',authController.protect, authController.isLoggedIn, viewController.getAccount)
router.post('/submit-user-data',authController.protect, viewController.updateUserData)
module.exports = router 