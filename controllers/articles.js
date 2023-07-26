const Article = require('../models/article');

module.exports.getArticles = (req, res) => {
    Article.find({})
    .then(article => res.send({ data: article }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createArticle = (req, res) => {
  const { title, tag, text } = req.body;

  Article.create({ title, tag, text })
    .then(article => res.send({ data: article }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};