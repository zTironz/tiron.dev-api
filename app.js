const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');
const auth = require('./middlewares/auth');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/tirondevapi');



app.use(auth);
app.use('/articles', articlesRoute);
app.use('/users', usersRoute);


app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
