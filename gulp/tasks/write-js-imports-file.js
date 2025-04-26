/* eslint-disable no-console */
import config from '../../config.js';
import { writeFileSync } from 'node:fs';
import { getDirectories, doNotEditMessage } from '../utils.js';
import { blocksFromHtml } from './get-blocks-from-html.js';

export const writeJsImportsFile = (cb) => {
  const jsImportsList = [];
  const allBlocksWithJsFiles = getDirectories('js', 'src/components');
  const message = `/*${doNotEditMessage.replace(/\n /gm, '\n * ').replace(/\n\n$/, '\n */\n\n')}`;
  let jsImports = message;

  if (config.addJsBefore.length > 0) {
    config.addJsBefore.forEach((src) => {
      if (!jsImportsList.includes(src)) {
        jsImportsList.push(src);
      }
    });
  }

  allBlocksWithJsFiles.forEach((blockPath) => {
    const blockName = blockPath.split('/').pop();
    const src = `../components/${blockPath}/${blockName}.js`;

    if (src.includes('src/components')) {
      console.error('Некорректный путь JS:', src);
      return;
    }

    if (config.alwaysAddBlocks.includes(blockName)) {
      if (!jsImportsList.includes(src)) {
        jsImportsList.push(src);
      }
      return;
    }

    if (blocksFromHtml.includes(blockName) && !jsImportsList.includes(src)) {
      jsImportsList.push(src);
    }
  });

  if (config.addJsAfter.length > 0) {
    config.addJsAfter.forEach((src) => {
      if (!jsImportsList.includes(src)) {
        jsImportsList.push(src);
      }
    });
  }

  jsImportsList.forEach((src) => {
    jsImports += `import '${src}';\n`;
  });

  writeFileSync('src/scripts/entry.js', jsImports);
  console.log('\x1b[33m%s\x1b[0m', '---------- Write new entry.js');
  return cb();
};
