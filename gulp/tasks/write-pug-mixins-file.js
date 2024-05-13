import fs from 'node:fs';
import { doNotEditMessage, getDirectories } from '../utils.js';

const dirBlocks = 'src/blocks/';

export const writePugMixinsFile = (cb) => {
  const allBlocksWithPugFiles = getDirectories('pug');
  let file = `//-${ doNotEditMessage.replace(/\n /gm,'\n  ')}`;
  allBlocksWithPugFiles.forEach((blockName) => {
    file += `include ${dirBlocks.replace(dirBlocks,'./')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync('src/blocks/mixins.pug', file);
  // eslint-disable-next-line no-console
  console.log('\x1b[33m%s\x1b[0m', '---------- Write new mixins.pug');
  cb();
};
