import Sequelize from 'sequelize';

const db = new Sequelize('postgres://postgres:postgres@localhost:5432/postsdb', {
    logging: false
});

export default db;