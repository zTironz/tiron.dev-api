const articlesRouter = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const auth = require('../middlewares/auth');

articlesRouter.get('/', auth, getArticles);

articlesRouter.post('/', auth, createArticle);

articlesRouter.delete('/:articleId', auth, deleteArticle);

module.exports = articlesRouter;
