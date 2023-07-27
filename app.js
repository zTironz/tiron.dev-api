const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/tirondevapi');


// app.use((req, res, next) => {
//   req.user = {
//     _id: '5ef76509f60508374b5c98b8',
//   };

//   next();
// });
app.use('/articles', articlesRoute);
app.use('/users', usersRoute);


app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
