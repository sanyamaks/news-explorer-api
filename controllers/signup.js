const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    UserModel.create({ email, password: hash, name })
      .then((newUser) => {
        res.send({ data: newUser });
      })
      .catch(next);
  });
};
