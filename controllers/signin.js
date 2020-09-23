const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }).select('+password')
    .then((potencialUser) => {
      if (!potencialUser) {
        return Promise.reject(
          new UnauthorizedError('Неверная почта или пароль')
        );
      }
      return bcrypt.compare(password, potencialUser.password).then((match) => {
        if (!match) {
          throw new UnauthorizedError('Неверная почта или пароль');
        }
        return potencialUser;
      });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
