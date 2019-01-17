const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const cors = require('./middlewares/cors');
const jwt = require('./middlewares/jwt');
const routes = require('./routes');
const sequelize = require('./sequelize');

const app = express();
app.use(cors);
app.use(jwt);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.use('/api', routes);
app.use('/', router);

sequelize.sync()
  .then(() => {
    console.log('DB - OK');
    const server = http.createServer(app);
    server.listen(3000);
    console.log('SERVER - OK')
  })
  .catch((e) => console.error('DB - SYNC ERROR'));

module.exports = sequelize;


