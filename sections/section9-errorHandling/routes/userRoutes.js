const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')
const router = express.Router();


router.post('/signup', authController.singup);
router.post('/login', authController.login);
router.patch('/updatePassword', authController.protect, authController.updatePassword)
router.post('/forgotpassword', authController.forgutPassword);
router.patch('/resetPassword/:token', authController.resetPassword); 
router.patch('/updateMe', authController.protect, userController.updateMe)
router.delete('/deleteMe', authController.protect, userController.deleteMe)
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
