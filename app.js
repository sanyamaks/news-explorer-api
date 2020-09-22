const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const apiSignUpRouter = require('./routes/apiSignUpRouter');
const apiSignInRouter = require('./routes/apiSignInRouter');
const apiUsersRouter = require('./routes/apiUsersRouter');
const apiArticlesRouter = require('./routes/apiArticlesRouter');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/', apiSignUpRouter);
app.use('/', apiSignInRouter);
app.use('/', apiUsersRouter);
app.use('/', apiArticlesRouter);

app.listen(PORT, () => {
  console.log(PORT);
});
