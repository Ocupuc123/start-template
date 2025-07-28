import { writeFileSync } from 'node:fs';
import { doNotEditMessage, getDirectories } from '../utils.js';

export const writePugMixinsFile = (cb) => {
  const allBlocksWithPugFiles = getDirectories('pug', 'src/components');
  let file = `//-${doNotEditMessage.replace(/\n /gm, '\n  ')}`;

  allBlocksWithPugFiles.forEach((blockPath) => {
    const blockName = blockPath.split('/').pop();
    const cleanPath = blockPath.replace(/^src\/components[\\/]?/, '');
    const importPath = `../components/${cleanPath}/${blockName}`.replace(/\\/g, '/');

    file += `include ${importPath}.pug\n`;
  });

  writeFileSync('src/components/mixins.pug', file);
  cb();
};
