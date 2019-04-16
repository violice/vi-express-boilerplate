import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import env from 'env';
import { User } from 'models';

const createToken = user => jwt.sign(user, env.JWT_SECRET, { expiresIn: '14d' });

const login = async (req, res) => {
  try {
    const { body: { username, password } } = req;
    if (!username) {
      return res.status(422).json({ error: 'Username is required' });
    }
    if (!password) {
      return res.status(422).json({ error: 'Password is required' });
    }
    const user = await User.findOne({ where: { username } });
    if (user) {
      const check = await bcrypt.compare(password, user.dataValues.password);
      if (check) {
        delete user.dataValues.password;
        const token = createToken(user.dataValues);
        res.status(200).json({ user, token });
      } else {
        res.status(422).json({ error: 'Incorrect password' });
      }
    } else {
      res.status(422).json({ error: 'User with such username wasn\'t found' });
    }
  } catch (e) {
    res.status(422).json({ error: e.message, raw: e });
  }
};

const registration = async (req, res) => {
  try {
    const { body: { username, password } } = req;
    if (!username) {
      return res.status(422).json({ error: 'Username is required' });
    }
    if (!password) {
      return res.status(422).json({ error: 'Password is required' });
    }
    const oldUser = await User.findOne({ where: { username } });
    if (oldUser) {
      return res.status(422).json({ error: 'User with this username already exist' });
    }
    const hash = await bcrypt.hash(password, Number(env.BCRYPT_SALT_ROUNDS));
    const user = await User.create({ username, password: hash });
    delete user.dataValues.password;
    const token = createToken(user.dataValues);
    res.status(200).json({ user, token });
  } catch (e) {
    res.status(422).json({
      error: e.message,
      raw: e,
    });
  }
};

export { login, registration };
