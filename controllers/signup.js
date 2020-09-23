const UserModel = require('../models/user');

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;
  UserModel.create({ email, password, name })
    .then((newUser) => {
      res.send({ data: newUser });
    })
    .catch(next);
};
