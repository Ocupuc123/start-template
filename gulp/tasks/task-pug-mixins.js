import fs from 'node:fs';
import { getDirectories } from '../utils/get-directories.js';
import doNotEditMessage from '../utils/do-not-edit-message.js';

const dirBlocks = 'src/blocks/';

const pugMixins = (callback) => {
  const allBlocksWithPugFiles = getDirectories('pug');
  let pugMixinsFile = `//-${ doNotEditMessage.replace(/\n /gm,'\n  ')}`;
  allBlocksWithPugFiles.forEach((blockName) => {
    pugMixinsFile += `include ${dirBlocks.replace(dirBlocks,'./')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync('src/blocks/mixins.pug', pugMixinsFile);
  callback();
};

export { pugMixins };
