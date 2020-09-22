module.exports.signin = (req, res) => {
  res.send({ message: `${req.body} + Вход в систему`});
};