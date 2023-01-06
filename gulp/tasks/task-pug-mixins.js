import fs from 'node:fs';
import { getDirectories } from '../utils/get-directories.js';

const doNotEditMessage = '//- ВНИМАНИЕ! Этот файл генерируется автоматически.\n//- Любые изменения будут потеряны при следующей компиляции.\n\n';

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
