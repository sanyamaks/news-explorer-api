const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.cookies;
  const securityScheme = 'Bearer ';
  if (!authorization || !authorization.startsWith(securityScheme)) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace(securityScheme, '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret_key'
    );
  } catch {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.users = payload;
  return next();
};
