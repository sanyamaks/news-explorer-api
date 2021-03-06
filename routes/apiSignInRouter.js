const apiSignInRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { signin } = require('../controllers/signin');
const { signinSchema } = require('../middlewares/validationSchemas');

apiSignInRouter.post('/signin', celebrate(signinSchema), signin);

module.exports = apiSignInRouter;
