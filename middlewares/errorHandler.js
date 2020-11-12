const { DocumentNotFoundError } = require('../errors/DocumentNotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');

module.exports = (err, req, res, next) => {
  const { name, errors } = err;
  if (name === 'DocumentNotFoundError') {
    return next(new DocumentNotFoundError('Запрашиваемый ресурс не найден'));
  }
  if (name === 'CastError') {
    return next(new BadRequestError('Невалидный id'));
  }
  if (
    name === 'ValidationError' &&
    errors.email &&
    errors.email.kind === 'unique'
  ) {
    return next(new ConflictError('Пользователь с таким Email уже существует'));
  }
  if (name === 'ValidationError') {
    return next(new BadRequestError(Object.values(errors).map((error) => error.message).join(', ')));
  }
  return next(err);
};
