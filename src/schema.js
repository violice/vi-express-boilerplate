import Sequelize from 'sequelize';

import env from './env';

export default new Sequelize(env.POSTGRES_DB, env.POSTGRES_USER, env.POSTGRES_PASSWORD, {
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});