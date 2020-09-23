const ArticleModel = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  ArticleModel.find({})
    .populate('owner')
    .then((articles) => {
      res.send({ data: articles });
    }).catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  ArticleModel.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.users._id,
  }).then((newArticle) => {
    res.send({ data: newArticle });
  }).catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  const { articleId } = req.params;
  ArticleModel.findByIdAndRemove(articleId)
    .orFail()
    .then((deletedCard) => {
      res.send({ data: deletedCard });
    }).catch(next);
};
