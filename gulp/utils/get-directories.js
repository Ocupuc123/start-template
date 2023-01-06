import fs from 'node:fs';
import { fileExist } from './file-exist.js';

const getDirectories = (ext) => {
  const source = 'src/blocks/';
  const res = fs.readdirSync(source)
    .filter((item) => fs.lstatSync(source + item).isDirectory())
    .filter((item) => fileExist(`${source + item }/${ item }.${ ext}`));
  return res;
};

export { getDirectories };
