const express = require('express');
const userRouter = express.Router();

const { userController } = require('../controllers');

userRouter.get('/', userController.getUsers);

module.exports = userRouter;