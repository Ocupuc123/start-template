import fs from 'node:fs';
import doNotEditMessage from '../utils/do-not-edit-message.js';
import { getDirectories } from '../utils/get-directories.js';

const dirBlocks = 'src/blocks/';

const writePugMixinsFile = (callback) => {
  const allBlocksWithPugFiles = getDirectories('pug');
  let file = `//-${ doNotEditMessage.replace(/\n /gm,'\n  ')}`;
  allBlocksWithPugFiles.forEach((blockName) => {
    file += `include ${dirBlocks.replace(dirBlocks,'./')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync('src/blocks/mixins.pug', file);
  callback();
};

export { writePugMixinsFile };
