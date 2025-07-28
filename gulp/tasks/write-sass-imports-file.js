import config from '../../config.js';
import { writeFileSync } from 'node:fs';
import { getDirectories, doNotEditMessage } from '../utils.js';
import { blocksFromHtml } from './get-blocks-from-html.js';

export const writeSassImportsFile = (cb) => {
  const scssImportsList = [];
  const allBlocksWithScssFiles = getDirectories('scss');
  const message = `/*${doNotEditMessage.replace(/\n /gm, '\n * ').replace(/\n\n$/, '\n */\n\n')}`;
  let styleImports = message;

  if (config.addStyle.length > 0) {
    config.addStyle.forEach((src) => {
      src = src.replace(/src\/styles\//gi, '');
      if (!scssImportsList.includes(src)) {
        scssImportsList.push(src);
      }
    });
  }

  allBlocksWithScssFiles.forEach((blockPath) => {
    const blockName = blockPath.split('/').pop();
    const src = `../components/${blockPath}/${blockName}.scss`;

    if (src.includes('src/components')) {
      return;
    }

    if (config.alwaysAddBlocks.includes(blockName)) {
      if (!scssImportsList.includes(src)) {
        scssImportsList.push(src);
      }
      return;
    }

    if (blocksFromHtml.includes(blockName) && !scssImportsList.includes(src)) {
      scssImportsList.push(src);
    }
  });

  scssImportsList.forEach((src) => {
    styleImports += `@import "${src}";\n`;
  });

  writeFileSync('src/styles/styles.scss', styleImports);
  return cb();
};
