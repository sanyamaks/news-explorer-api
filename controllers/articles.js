const ArticleModel = require('../models/article');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { DocumentNotFoundError } = require('../errors/DocumentNotFoundError');

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
    .orFail(() => {
      throw new DocumentNotFoundError('Удаляемая карточка не найдена');
    })
    .then((article) => {
      if (article.owner._id.toString() !== req.users._id) {
        throw new ForbiddenError(
          'Статью может удалить только пользователь, который её сохранил'
        );
      }
      return ArticleModel.findByIdAndRemove(articleId)
        .orFail()
        .then((deletedArticle) => {
          res.send({ data: deletedArticle });
        });
    })
    .catch(next);
};
