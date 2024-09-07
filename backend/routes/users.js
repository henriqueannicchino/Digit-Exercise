const express = require('express');
const userRoutes = express.Router();

const UserController = require('../controllers/user');
userRoutes.post('/signin', UserController.signin);
userRoutes.post('/signup', UserController.signup);

module.exports = userRoutes;