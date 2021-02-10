import { existsSync, mkdirSync, writeFile } from 'fs';
import { join, resolve } from 'path';

import Youch from 'youch';

/**
 * @param {import('express').Errback} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _
 */
export default async (err, req, res, _) => {
  const errors = await new Youch(err, req).toJSON();

  const folder = resolve(__dirname, '..', '..', 'logs', 'err');

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const file = join(folder, `${new Date().getTime()}.json`);

  writeFile(file, JSON.stringify(errors, null, 2), { encoding: 'utf-8' }, () => {
    res.status(500).json({
      error: 'Internal Server Error!',
    });
  });
};
