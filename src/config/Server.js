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
        path: '/get',
        handler: (req, res) => res.status(200).json({ message: 'GET' }),
      },
      {
        method: 'post',
        path: '/post',
        handler: (req, res) => res.status(201).json({ message: 'POST' }),
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
