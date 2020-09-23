const { DocumentNotFoundError } = require('../errors/DocumentNotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');

module.exports = (err, req, res, next) => {
  const { name, message } = err;
  if (name === 'DocumentNotFoundError') {
    return next(new DocumentNotFoundError('Запрашиваемый ресурс не найден'));
  }
  if (name === 'CastError') {
    return next(new BadRequestError('Невалидный id'));
  }
  if (name === 'ValidationError') {
    return next(new BadRequestError(message));
  }
  return next(err);
};
