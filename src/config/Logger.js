import { resolve } from 'path';

import log4js from 'log4js';

export default () => {
  log4js.configure({
    appenders: {
      out: { type: 'stdout', layout: { type: 'colored' } },
      file: {
        type: 'file',
        filename: resolve(__dirname, '..', '..', 'logs', 'server.log'),
        layout: { type: 'basic' },
        maxLogSize: 31457280,
        backups: 5,
        compress: true,
      },
    },
    categories: { default: { appenders: ['out', 'file'], level: 'all' } },
  });

  return log4js.getLogger('[server]');
};
