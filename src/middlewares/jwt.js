import jwt from 'jsonwebtoken';

const secret = '666B2076FB63ABC711101483F16B6E321765FDDC6706D50DC88ED3C387A65AD6';

export default (req, res, next) => {
  if(['/api/login','/api/registration'].includes(req.path)){
    next();
    return null;
  }
  const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}
