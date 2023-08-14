require('dotenv').config()
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');
const helmet = require('helmet');
const { limiter } = require('./utils/rateLimiter')
// const auth = require('./middlewares/auth');

const { PORT = 3000, DB_URL } = process.env;
const app = express();

app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DB_URL);



// app.use(auth);
app.use('/articles', articlesRoute);
app.use('/users', usersRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
