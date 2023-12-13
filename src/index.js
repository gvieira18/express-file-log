import Logger from './config/Logger';
import HttpServer from './config/Server';

const logger = Logger();

(async () => {
  const httpServer = new HttpServer(logger);

  try {
    await httpServer.init();
  } catch (error) {
    console.error(error.stack);
    process.exit(1);
  }
})();
