import fs from 'node:fs';
import { doNotEditMessage } from '../utils.js';
import { getDirectories } from '../utils.js';

const dirBlocks = 'src/blocks/';

export const writePugMixinsFile = (cb) => {
  const allBlocksWithPugFiles = getDirectories('pug');
  let file = `//-${ doNotEditMessage.replace(/\n /gm,'\n  ')}`;
  allBlocksWithPugFiles.forEach((blockName) => {
    file += `include ${dirBlocks.replace(dirBlocks,'./')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync('src/blocks/mixins.pug', file);
  cb();
};
