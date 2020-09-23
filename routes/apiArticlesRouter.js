const apiArticlesRouter = require('express').Router();
const {
  getArticles,
  createArticle,
  removeArticle,
} = require('../controllers/articles');

apiArticlesRouter.get('/articles', getArticles);
apiArticlesRouter.post('/articles', createArticle);
apiArticlesRouter.delete('/articles/:articleId', removeArticle);

module.exports = apiArticlesRouter;
