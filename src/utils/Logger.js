import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

import { createStream } from 'rotating-file-stream';

const folder = resolve(__dirname, '..', '..', 'logs', 'visitors');

if (!existsSync(folder)) {
  mkdirSync(folder, { recursive: true });
}

const date = new Date();

const file = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;

export default createStream(file, {
  interval: '1d',
  path: folder,
  compress: 'gzip',
});
