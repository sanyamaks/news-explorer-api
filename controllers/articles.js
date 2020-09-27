const ArticleModel = require('../models/article');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getArticles = (req, res, next) => {
  ArticleModel.find({})
    .populate('owner')
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
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
  })
    .then((newArticle) => {
      res.send({ data: newArticle });
    })
    .catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  const { articleId } = req.params;
  ArticleModel.findById(articleId)
    .populate(['owner'])
    .orFail()
    .then((article) => {
      if (article.owner._id.toString() !== req.users._id) {
        throw new ForbiddenError('Карточку может удалить только её создатель');
      }
      return ArticleModel.findByIdAndRemove(articleId)
        .orFail()
        .then((deletedArticle) => {
          res.send({ data: deletedArticle });
        });
    })
    .catch(next);
};
