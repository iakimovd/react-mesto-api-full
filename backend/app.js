require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
// const corsMiddleware = require('./middlewares/cors');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors'); // Функция обработки ошибок
const NotFound = require('./errors/NotFound'); // 400
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000 } = process.env;

const app = express();

// const allowedCors = [
//   'https://iakimovd.project.mesto.nomoredomains.icu',
//   'http://iakimovd.project.mesto.nomoredomains.icu',
//   'http://localhost:4000',
//   'https://localhost:4000',
// ];

// app.use(corsMiddleware);

// app.use(
//   cors({
//     origin: [
//       'https://iakimovd.project.mesto.nomoredomains.icu',
//       'http://iakimovd.project.mesto.nomoredomains.icu',
//     ],
//     methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Authorization', 'Content-type', 'Accept'],
//   }),
// );

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res, next) => {
  next(new NotFound('Page not found'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
