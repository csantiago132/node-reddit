const express = require('express');
const router = express.Router();
const validation = require('./validation');

const userController = require('../controllers/userController');

router
  .get('/users/sign_up', userController.signUp)
  .get('/users/sign_in', userController.signInForm)
  .get('/users/sign_out', userController.signOut)
  .get('/users/:id', userController.show)
  .post('/users', validation.validateUsers, userController.create)
  .post('/users/sign_in', validation.validateUsers, userController.signIn);

module.exports = router;
