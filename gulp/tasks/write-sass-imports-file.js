import fs from 'node:fs';
import config from '../../config.js';
import { getDirectories, blocksFromHtml, doNotEditMessage } from '../utils.js';

export const writeSassImportsFile = (cb) => {
  const scssImportsList = [];
  const allBlocksWithScssFiles = getDirectories('scss');
  const message = `/*${doNotEditMessage.replace(/\n /gm, '\n * ').replace(/\n\n$/, '\n */\n\n')}`;
  let styleImports = message;

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
