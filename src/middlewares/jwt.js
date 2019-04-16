import jwt from 'jsonwebtoken';

import env from 'env';

const WHITE_LIST = [
  '/api/login',
  '/api/registration',
];

export default (req, res, next) => {
  if (WHITE_LIST.includes(req.path)) {
    next();
  } else {
    const token = (req.body && req.body.token) || (req.cookie && req.cookie.token) || (req.query && req.query.token) || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(403).json({ error: 'Failed to authenticate token' });
        } else if (new Date().getTime() / 1000 > decoded.exp) {
          res.status(403).json({ error: 'Token is expired' });
        } else {
          req.headers.user = decoded;
          next();
        }
      });
    } else {
      res.status(403).json({ error: 'No token provided' });
    }
  }
};
