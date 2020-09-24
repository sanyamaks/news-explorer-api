const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.cookies;
  const securityScheme = 'Bearer ';
  if (!authorization || !authorization.startsWith(securityScheme)) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace(securityScheme, '');
  let payload;
  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    throw new UnauthorizedError(err);
  }
  req.users = payload;
  return next();
};
