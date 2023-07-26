const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/tirondevapi');

app.use('/articles', require('./routes/articles'));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
