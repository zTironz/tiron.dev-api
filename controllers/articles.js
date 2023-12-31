const Article = require('../models/article');

module.exports.getArticles = (req, res) => {
    Article.find({ })
    .populate('owner', 'name')
    .then(articles => res.send({ articles }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// module.exports.getArticle = (req, res) => {
//     Article.find({ owner: req.user._id })
//     .then(article => res.send({ article }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

module.exports.createArticle = (req, res) => {
  const { title, tag, text } = req.body;
  const id = req.user._id
  Article.create({ title, tag, text, owner: id })
    .then(article => res.send({ data: article }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.changeArticle = (req, res) => {
    const { title, tag, text } = req.body;
    Article.findByIdAndUpdate(req.params.articleId,{title, tag, text}, {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: true // если пользователь не найден, он будет создан
    }).select('+owner')
    .then((article) => {
        if (!article) {
          return res.status(404).send({ message: 'Нет карточки' });
        } if (article.owner.toString() === req.user._id) {
        console.log(article)
        return res.send({ title, tag, text})
        } res.status(403).send({ message: 'Недостаточно прав' });
      })
      // eslint-disable-next-line consistent-return
      .catch((err) => {
        if (err.name === 'CastError') {
          return res.status(400).send({ message: 'Некорректный id' });
        }
        res.status(500).send({ message: err.message });
      });
}

module.exports.deleteArticle = (req, res) => {
    Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
        if (!article) {
          return res.status(404).send({ message: 'Нет карточки' });
        } if (article.owner.toString() === req.user._id) {
        console.log(article)
          return article.deleteOne().then(() => res.status(200).send({ message: 'Карточка удалена' }));
        } res.status(403).send({ message: 'Недостаточно прав' });
      })
      // eslint-disable-next-line consistent-return
      .catch((err) => {
        if (err.name === 'CastError') {
          return res.status(400).send({ message: 'Некорректный id' });
        }
        res.status(500).send({ message: err.message });
      });
}