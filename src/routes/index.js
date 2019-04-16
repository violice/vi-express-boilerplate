import express from 'express';

import userRouter from './user';
import authRouter from './auth';

const apiRouter = express.Router();

apiRouter.use('/', authRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
