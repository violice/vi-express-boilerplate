import Sequelize from 'sequelize';

import env from './env';

export default new Sequelize(env.POSTGRES_DB, env.POSTGRES_USER, env.POSTGRES_PASSWORD, {
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  dialect: 'postgres',
});