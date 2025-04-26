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
  // eslint-disable-next-line no-console
  console.log('\x1b[33m%s\x1b[0m', '---------- Write new mixins.pug');
  cb();
};
