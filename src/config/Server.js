import express, { Router } from 'express';

import helmet from 'helmet';
import nocache from 'nocache';
import cors from 'cors';
import compression from 'compression';

import LoggerMiddleware from '../middlewares/LoggerMiddleware';

class HttpServer {
  constructor(logger) {
    this.logger = logger;
    this.loggerMiddleware = LoggerMiddleware(this.logger);
  }

  async init() {
    this.logger.info('[HTTP] Starting http server');

    const app = express();

    app
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(helmet())
      .use(nocache())
      .use(cors())
      .use(compression())
      .use(this.loggerMiddleware)
      .use('/api', this.register());

    const port = process.env.PORT || 3000;

    this.server = app.listen(port, () => {
      this.logger.info(`[HTTP] [pid ${process.pid}] Listening at port ${port}`);
    });
  }

  register() {
    const routes = [
      {
        method: 'get',
        path: '/trace',
        handler: (_req, res) => {
          this.logger.trace('TRACE');
          return res.status(200).json({ message: 'GET' });
        },
      },
      {
        method: 'get',
        path: '/debug',
        handler: (_req, res) => {
          this.logger.debug('DEBUG');
          return res.status(200).json({ message: 'GET' });
        },
      },
      {
        method: 'get',
        path: '/info',
        handler: (_req, res) => {
          this.logger.info('INFO');
          return res.status(200).json({ message: 'GET' });
        },
      },
      {
        method: 'get',
        path: '/warn',
        handler: (_req, res) => {
          this.logger.warn('WARN');
          return res.status(200).json({ message: 'GET' });
        },
      },
      {
        method: 'get',
        path: '/error',
        handler: (_req, res) => {
          this.logger.error('ERROR');
          return res.status(200).json({ message: 'GET' });
        },
      },
      {
        method: 'get',
        path: '/fatal',
        handler: (_req, res) => {
          this.logger.fatal('FATAL');
          return res.status(200).json({ message: 'GET' });
        },
      },
    ];

    const router = Router({ strict: true });

    routes.forEach(({ method, path, handler }) => {
      router[method](path, handler);
    });

    return router;
  }
}

export default HttpServer;
