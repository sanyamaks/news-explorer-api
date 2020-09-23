const apiArticlesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getArticles,
  createArticle,
  removeArticle,
} = require('../controllers/articles');
const {
  createArticleSchema,
  removeArticleSchema,
} = require('../utils/validationSchemas');

apiArticlesRouter.get('/articles', getArticles);
apiArticlesRouter.post(
  '/articles',
  celebrate(createArticleSchema),
  createArticle
);
apiArticlesRouter.delete(
  '/articles/:articleId',
  celebrate(removeArticleSchema),
  removeArticle
);

module.exports = apiArticlesRouter;
