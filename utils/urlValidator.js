const validator = require('validator');

const { isURL } = validator;

module.exports = (link, helpers) => {
  if (!isURL(link)) {
    return helpers.message(`${helpers.state.path}: не является валидным`);
  }

  return link;
};
