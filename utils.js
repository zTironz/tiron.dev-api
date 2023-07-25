const { quotes } = require('./data');

module.exports.getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]
