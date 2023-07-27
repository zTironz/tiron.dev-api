const Article = require('../models/article');

module.exports.getArticles = (req, res) => {
    Article.find({})
    .populate()
    .then(article => res.send({ data: article }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createArticle = (req, res) => {
  const { title, tag, text, owner } = req.body;

  Article.create({ title, tag, text, owner: owner })
    .then(article => res.send({ data: article }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};