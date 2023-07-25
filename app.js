const express = require('express');
const { getRandomQuote } = require('./utils');
const cors = require('cors');
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors())
app.get('/', (req,res) => {
  res.send({quote: getRandomQuote()})
})
app.listen(PORT, () => {
});