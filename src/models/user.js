import Sequelize from 'sequelize';
import db from '../db';

const User = db.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = User;