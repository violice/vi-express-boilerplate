import jwt from 'jsonwebtoken';
import { userModel } from '../models';

const secret = '666B2076FB63ABC711101483F16B6E321765FDDC6706D50DC88ED3C387A65AD6';

const login = async (req, res) => {
  try {
    const { body: { username, password } } = req;
    if (!username) {
      return res.status(422).json({ error: 'Username is required' });
    }
    if (!password) {
      return res.status(422).json({ error: 'Password is required' });
    }
    const user = (await userModel.findOne({ where: { username, password } })).dataValues;
    if (user) {
      const token = jwt.sign(user, secret, { expiresIn: 60 * 60 * 24 * 7 });
      res.status(200).json({ user, token });
    } else {
      res.status(422).json({ error: 'User with such username wasn\'t found' });
    }
  } catch (e) {
    res.status(422).json({
      error: e.message,
      raw: e,
    });
  }
}

const registration = async (req, res) => {
  try {
    const { body: { username, password } } = req;
    if (!username) {
      return res.status(422).json({ error: 'Username is required' });
    }
    if (!password) {
      return res.status(422).json({ error: 'Password is required' });
    }
    if (await userModel.findOne({ where: { username } })) {
      return res.status(422).json({ error: 'User with this username already exist' });
    }
    const user = (await userModel.create({ username, password })).dataValues;
    const token = jwt.sign(user, secret, { expiresIn: 60 * 60 * 24 * 7 });
    res.status(200).json({ user, token });
  } catch (e) {
    res.status(422).json({
      error: e.message,
      raw: e,
    });
  }
}

export default { login, registration };