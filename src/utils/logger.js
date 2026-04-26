const winston = require('winston');
const env = require('../config/env');

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format,
  transports: [new winston.transports.Console()],
});

module.exports = logger;
