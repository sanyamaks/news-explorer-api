const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const UserModel = require('../models/user');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

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
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret_key',
        { expiresIn: '7d' }
      );
      res.clearCookie('authorization');
      res.cookie('authorization', `Bearer ${token}`, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};
