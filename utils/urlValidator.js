const validator = require('validator');
const { BadRequestError } = require('../errors/BadRequestError');

const { isURL } = validator;

module.exports = (link) => {
  if (!isURL(link)) {
    throw new BadRequestError('Не верный формат ссылки');
  }

  return link;
};
