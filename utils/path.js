import {dirname} from 'path';
import { URL,fileURLToPath } from 'url';

export const dirnameUrl = (str, meta) => {
  return new URL(str, meta).pathname;
};

export const pavfDirname = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return __dirname;
}


