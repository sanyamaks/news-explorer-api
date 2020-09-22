const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  keyword: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  source: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const ArticleModel = mongoose.model('article', articleSchema);
module.exports = ArticleModel;
