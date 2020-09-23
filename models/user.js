const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator(link) {
        return validator.isEmail(link);
      },
      message: 'Email не валидн',
    },
  },
  password: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  name: {
    type: String,
    minlength: [2, 'Должно быть от 2 до 30 символов'],
    maxlength: [30, 'Должно быть от 2 до 30 символов'],
    required: [true, 'Это обязательное поле'],
  },
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
