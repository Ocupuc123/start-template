import fs from 'node:fs';
import config from '../../config.js';
import { getDirectories } from '../utils/get-directories.js';
import blocksFromHtml from '../utils/blocks-from-html.js';
import doNotEditMessage from '../utils/do-not-edit-message.js';

const writeSassImportsFile = (cb) => {
  const scssImportsList = [];
  const allBlocksWithScssFiles = getDirectories('scss');
  let styleImports = doNotEditMessage.replace(/\n /gm, '\n  ');

  if (config.addStyle.length > 0) {
    config.addStyle.forEach((src) => {
      src = src.replace(/src\/scss\/|.scss/gi, '');
      scssImportsList.push(src);
    });
  }

  allBlocksWithScssFiles.forEach((blockWithScssFile)=> {
    if (config.alwaysAddBlocks.indexOf(blockWithScssFile) === -1) {
      return;
    }
    scssImportsList.push(`../blocks/${blockWithScssFile}/${blockWithScssFile}`);
  });

  allBlocksWithScssFiles.forEach((blockWithScssFile)=> {
    const src = `../blocks/${blockWithScssFile}/${blockWithScssFile}`;
    if (blocksFromHtml.indexOf(blockWithScssFile) === -1) {
      return;
    }
    if (scssImportsList.indexOf(src) > -1) {
      return;
    }
    scssImportsList.push(src);
  });

  scssImportsList.forEach((src) => {
    styleImports += `@import "${src}";\n`;
  });

  fs.writeFileSync('src/scss/main.scss', styleImports);
  // eslint-disable-next-line no-console
  console.log('---------- Write new main.scss');
  return cb();
};

export { writeSassImportsFile };
