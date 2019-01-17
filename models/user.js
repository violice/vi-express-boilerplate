const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = User;