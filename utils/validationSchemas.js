const { Joi } = require('celebrate');
const urlValidator = require('./urlValidator');

module.exports.signupSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

module.exports.signinSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.authSchema = {
  cookies: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
};

module.exports.createArticleSchema = {
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(urlValidator, 'urlValidator'),
    image: Joi.string().required().custom(urlValidator, 'urlValidator'),
  }),
};

module.exports.removeArticleSchema = {
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
};
