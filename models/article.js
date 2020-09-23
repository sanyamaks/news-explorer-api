const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  title: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  text: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  date: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  source: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const ArticleModel = mongoose.model('article', articleSchema);
module.exports = ArticleModel;
