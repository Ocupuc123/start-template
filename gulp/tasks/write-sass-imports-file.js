/* eslint-disable no-console */
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
    const src = `../components/${blockPath}/${blockName}.scss`; // ← Добавляем .scss здесь

    if (src.includes('src/components')) {
      console.error('Некорректный путь:', src);
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
  console.log('\x1b[33m%s\x1b[0m', '---------- Write new styles.scss');
  return cb();
};
