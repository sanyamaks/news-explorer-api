const apiSignUpRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { signup } = require('../controllers/signup');
const { signupSchema } = require('../utils/validationSchemas');

apiSignUpRouter.post('/signup', celebrate(signupSchema), signup);

module.exports = apiSignUpRouter;
