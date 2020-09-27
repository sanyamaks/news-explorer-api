const { Joi } = require('celebrate');
const urlValidator = require('../utils/urlValidator');

module.exports.signupSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'email: Это обязательное поле',
      'string.email': 'email: не является валидным',
    }),
    password: Joi.string().required().messages({
      'any.required': 'password: Это обязательное поле',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      'any.required': 'name: Это обязательное поле',
      'string.min': 'name: Должно быть от 2 до 30 символов',
      'string.max': 'name: Должно быть от 2 до 30 символов',
    }),
  }),
};

module.exports.signinSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'email: Это обязательное поле',
      'string.email': 'email: не является валидным',
    }),
    password: Joi.string().required().messages({
      'any.required': 'password: Это обязательное поле',
    }),
  }),
};

module.exports.createArticleSchema = {
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'any.required': 'keyword: Это обязательное поле',
    }),
    title: Joi.string().required().messages({
      'any.required': 'title: Это обязательное поле',
    }),
    text: Joi.string().required().messages({
      'any.required': 'text: Это обязательное поле',
    }),
    date: Joi.string().required().messages({
      'any.required': 'date: Это обязательное поле',
    }),
    source: Joi.string().required().messages({
      'any.required': 'source: Это обязательное поле',
    }),
    link: Joi.string()
      .required()
      .custom(urlValidator, 'urlValidator')
      .messages({
        'any.required': 'link: Это обязательное поле',
      }),
    image: Joi.string()
      .required()
      .custom(urlValidator, 'urlValidator')
      .messages({
        'any.required': 'image: Это обязательное поле',
      }),
  }),
};

module.exports.removeArticleSchema = {
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).messages({
      'string.hex': 'Невалидный id статьи',
      'string.length': 'Невалидный id статьи',
    }),
  }),
};
