const articlesRouter = require('express').Router();
const { getArticles, createArticle } = require('../controllers/articles')

articlesRouter.get('/', getArticles);

articlesRouter.post('/new', createArticle);

module.exports = articlesRouter;
