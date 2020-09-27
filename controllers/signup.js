const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const { BadRequestError } = require('../errors/BadRequestError');

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!password || !password.trim()) {
    throw new BadRequestError('password: Это поле должно быть обязательно заполнено');
  }
  bcrypt.hash(password, 10).then((hash) => {
    UserModel.create({ email, password: hash, name })
      .then((newUser) => {
        res.send({
          data: {
            email: newUser.email,
            name: newUser.name,
          },
        });
      })
      .catch(next);
  });
};
