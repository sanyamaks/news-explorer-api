const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const apiSignUpRouter = require('./routes/apiSignUpRouter');
const apiSignInRouter = require('./routes/apiSignInRouter');
const apiUsersRouter = require('./routes/apiUsersRouter');
const apiArticlesRouter = require('./routes/apiArticlesRouter');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use((req, res, next) => {
  req.users = {
    _id: '5f6a4abe22fdc5595a9f111f',
  };
  next();
});

app.use(bodyParser.json());

app.use('/', apiSignUpRouter);
app.use('/', apiSignInRouter);
app.use('/', apiUsersRouter);
app.use('/', apiArticlesRouter);

app.listen(PORT, () => {
  console.log(PORT);
});
