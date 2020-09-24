const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs', 'request.log'),
    }),
  ],
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs', 'error.log'),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
