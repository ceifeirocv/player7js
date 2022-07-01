/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token no provided' });

  const [, token] = authHeader.split(' ');

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) return res.status(401).json({ error: 'Invalid Token' });
      req.userId = decode.id;
      return next();
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
