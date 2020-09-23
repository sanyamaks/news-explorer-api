const UserModel = require('../models/user');

module.exports.getInfoAboutMe = (req, res, next) => {
  UserModel.findById(req.users._id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
