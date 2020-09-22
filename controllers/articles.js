module.exports.getArticles = (req, res) => {
  res.send({ message: 'Получить карточки' });
};

module.exports.createArticle = (req, res) => {
  res.send({ message: req.body });
};

module.exports.removeArticle = (req, res) => {
  res.send({ message: req.params });
};
