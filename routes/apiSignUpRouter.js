const apiSignUpRouter = require('express').Router();
const { signup } = require('../controllers/signup');

apiSignUpRouter.post('/signup',signup);

module.exports = apiSignUpRouter;