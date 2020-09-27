const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: [true, 'keyword: Это обязательное поле'],
  },
  title: {
    type: String,
    required: [true, 'title: Это обязательное поле'],
  },
  text: {
    type: String,
    required: [true, 'text: Это обязательное поле'],
  },
  date: {
    type: String,
    required: [true, 'date: Это обязательное поле'],
  },
  source: {
    type: String,
    required: [true, 'source: Это обязательное поле'],
  },
  link: {
    type: String,
    required: [true, 'link: Это обязательное поле'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'link: не является валидной',
    },
  },
  image: {
    type: String,
    required: [true, 'image: Это обязательное поле'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'image: не является валидной',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const ArticleModel = mongoose.model('article', articleSchema);
module.exports = ArticleModel;
