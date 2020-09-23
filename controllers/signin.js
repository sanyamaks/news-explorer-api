const UserModel = require('../models/user');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user.password !== password) {
        return res.send({ data: '' });
      }
      return res.send({ data: user });
    })
    .catch(next);
};
