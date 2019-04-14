import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import jwt from './middlewares/jwt';
import routes from './routes';

import env from './env';
import cors from './cors';
import schema from './schema';

const app = express();
app.use(cors);
app.use(jwt);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.use('/api', routes);
app.use('/', router);

schema.sync()
  .then(() => {
    const server = http.createServer(app);
    server.listen(env.PORT);
    console.log(`--- SERVER LISTENED AT PORT ${env.PORT} ---`);
  })
  .catch((e) => console.error('--- DB CONNECT/SYNC ERROR ---', e));