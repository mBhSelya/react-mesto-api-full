require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');
const auth = require('./middleware/auth');

const { PORT, DB_ADDRESS } = process.env;
const {
  createUser,
  login,
} = require('./controllers/users');

const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&\\'()*+,;=.]+$/;

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(cors({
  origin: 'http://mesto.mbhselya.nomoredomains.xyz',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application is running on port ${PORT}`);
});
