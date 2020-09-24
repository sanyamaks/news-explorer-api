const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .select('+password')
    .then((potencialUser) => {
      if (!potencialUser) {
        throw new UnauthorizedError('Неверная почта или пароль');
      }
      return bcrypt.compare(password, potencialUser.password).then((match) => {
        if (!match) {
          throw new UnauthorizedError('Неверная почта или пароль');
        }
        return potencialUser;
      });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'key', { expiresIn: '7d' });
      res.clearCookie('token');
      res.cookie('authorization', `Bearer ${token}`, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.send({ message: 'Вы успешно авторизованы' });
    })
    .catch(next);
};
