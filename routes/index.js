const express = require('express');

const userRouter = require('./user');
const authRouter = require('./auth');

const apiRouter = express.Router();
apiRouter.use('/', authRouter);
apiRouter.use('/user', userRouter);

module.exports = apiRouter;