import {
  UUID, UUIDV4, STRING, JSON, DATE,
} from 'sequelize';

import schema from 'schema';

export default schema.define('user', {
  id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
  firstName: STRING,
  lastName: STRING,
  email: STRING,
  password: STRING,
  username: STRING,
  avatar: STRING,
  settigs: { type: JSON, defaultValue: {} },
  createdAt: DATE,
  updatedAt: DATE,
});
