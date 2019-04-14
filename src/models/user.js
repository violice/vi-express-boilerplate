import { STRING } from 'sequelize';
import schema from '../schema';

export default schema.define('user', {
    username: STRING,
    password: STRING,
});