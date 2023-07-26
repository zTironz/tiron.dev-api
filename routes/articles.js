const router = require('express').Router();
const { getArticles, createArticle } = require('../controllers/articles')

router.get('/', getArticles);

router.post('/new', createArticle);

module.exports = router;
