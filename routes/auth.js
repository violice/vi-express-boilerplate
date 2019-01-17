const express = require('express');
const authRouter = express.Router();

const { authController } = require('../controllers');

authRouter.post('/login', authController.login);
authRouter.post('/registration', authController.registration);

module.exports = authRouter;