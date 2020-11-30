import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { queryParser } from 'express-query-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import jwt from './middlewares/jwt';
import routes from './routes';

import env from './env';
import cors from './cors';
import schema from './schema';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(queryParser({
  parseNull: true,
  parseBoolean: true,
}));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(morgan(env.MORGAN_TEMPLATE));
app.use(cors);
app.use(jwt);

const router = express.Router();
router.use('/api', routes);
app.use('/', router);

schema.sync({ logging: false })
  .then(() => {
    const server = http.createServer(app);
    server.listen(env.PORT);
    console.log(`--- SERVER IS LISTENING ON PORT ${env.PORT} ---`);
  })
  .catch(e => console.error('--- DB CONNECT/SYNC ERROR ---', e));
