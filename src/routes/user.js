import express from 'express';

import { getUsers } from 'controllers/user';

const userRouter = express.Router();

userRouter.get('/', getUsers);

export default userRouter;
