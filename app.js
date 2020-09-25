const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const auth = require('./middlewares/auth');
const apiSignUpRouter = require('./routes/apiSignUpRouter');
const apiSignInRouter = require('./routes/apiSignInRouter');
const apiUsersRouter = require('./routes/apiUsersRouter');
const apiArticlesRouter = require('./routes/apiArticlesRouter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const errorController = require('./middlewares/errorController');
const { DocumentNotFoundError } = require('./errors/DocumentNotFoundError');

const { PORT = 3000, MONGODB_URL, ALLOWED_ORIGIN } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с этого IP. Пожалуйста, повторите позже.',
});

const app = express();
app.use(limiter);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(helmet());
app.use(
  cors({
    origin: ALLOWED_ORIGIN.split(','),
    credentials: true,
    method: ['GET', 'PUT', 'POST', 'OPTIONS'],
  })
);

app.use(requestLogger);

app.use('/', apiSignUpRouter);
app.use('/', apiSignInRouter);
app.use('/', auth, apiUsersRouter);
app.use('/', auth, apiArticlesRouter);
app.use(() => {
  throw new DocumentNotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.use(errorController);

app.listen(PORT, () => {
  console.log(PORT);
});
