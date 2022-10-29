const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUsers, getUserInfoMe, updateProfile, updateAvatar, getUserById,
} = require('../controllers/users');

router.get('/me', getUserInfoMe); // возвращает информацию о текущем пользователе

router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile); // обновляет профиль

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/(ftp|http|https):\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  }),
}), updateAvatar); // обновляет аватар

module.exports = router;
