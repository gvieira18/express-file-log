import express from 'express';
import morgan from 'morgan';

import 'express-async-errors';

import ErrorMiddlware from './middlewares/Error';
import LoggerMiddleware from './utils/Logger';

const app = express();

app.use(express.json());

app.use(morgan('combined', { stream: LoggerMiddleware }));

app.get('/', async (req, res) => res.statsus(200).json());
app.post('/', async (req, res) => res.status(200).json());

app.use(ErrorMiddlware);

app.listen(3333);
