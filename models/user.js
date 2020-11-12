const mongoose = require('mongoose');
const validator = require('validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email: Это обязательное поле'],
    validate: {
      validator(link) {
        return validator.isEmail(link);
      },
      message: 'email: не является валидным',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password: Это обязательное поле'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'name: Должно быть от 2 до 30 символов'],
    maxlength: [30, 'name: Должно быть от 2 до 30 символов'],
    required: [true, 'name: Это обязательное поле'],
  },
});

userSchema.plugin(mongooseUniqueValidator, {
  message: 'Пользователь с таким Email уже существует',
});
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
