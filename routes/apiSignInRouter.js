const apiSignInRouter = require('express').Router();
const { signin } = require('../controllers/signin');

apiSignInRouter.post('/signin', signin);

module.exports = apiSignInRouter;
