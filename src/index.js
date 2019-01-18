import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import cors from './middlewares/cors';
import jwt from './middlewares/jwt';
import routes from './routes';
import db from './db';

const app = express();
app.use(cors);
app.use(jwt);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.use('/api', routes);
app.use('/', router);

db.sync()
  .then(() => {
    console.log('DB - OK');
    const server = http.createServer(app);
    server.listen(3000);
    console.log('SERVER - OK')
  })
  .catch((e) => console.error('DB - CONNECT/SYNC ERROR'));


