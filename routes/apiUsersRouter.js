const apiUsersRouter = require('express').Router();
const { getInfoAboutMe } = require('../controllers/users');

apiUsersRouter.get('/users/me', getInfoAboutMe);

module.exports = apiUsersRouter;