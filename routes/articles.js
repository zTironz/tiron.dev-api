const articlesRouter = require('express').Router();
const { getArticles, getArticle, changeArticle, createArticle, deleteArticle } = require('../controllers/articles');
const auth = require('../middlewares/auth');

articlesRouter.get('/', /*auth,*/ getArticles);

// articlesRouter.get('/', auth, getArticle);

articlesRouter.post('/', auth, createArticle);

articlesRouter.delete('/:articleId', auth, deleteArticle);

articlesRouter.patch('/:articleId', auth, changeArticle)

module.exports = articlesRouter;
