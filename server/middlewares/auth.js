import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

const authentication = (req, res, next) => {
  try {
    const header = req.headers.token || req.body.token || req.headers.authorization;
    if (!header || header === '') return res.status(401).json({ status: 'error', error: 'Authentication failed' });
    const token = jwt.verify(header, SECRET);
    req.decode = token;
    next();
  } catch (e) {
    return res.status(401).json({ status: 'error', error: 'Invalid token!' });
  }
};

export default authentication;
