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

//limiter turn off when test backend
app.use(limiter);
// app.use(cors({
//   origin: "*",
//   credentials: true,
// }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header('Origin'));
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DB_URL);



// app.use(auth);
app.use('/articles', articlesRoute);
app.use('/users', usersRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
