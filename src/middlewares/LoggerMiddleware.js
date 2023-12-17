import morgan from 'morgan';

morgan.format('dev-without-collors', ':method :url :status :response-time :res[content-length]');

export default (logger) => {
  const stream = {
    stream: {
      write: (message) => {
        logger.info(message.slice(0, -1));
      },
    },
  };

  return morgan('dev-without-collors', stream);
};
