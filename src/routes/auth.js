import express from 'express';

import { login, registration } from 'controllers/auth';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/registration', registration);

export default authRouter;
