import fs from 'node:fs';
import config from '../../config.js';
import { getDirectories, doNotEditMessage } from '../utils.js';
import { blocksFromHtml } from './get-blocks-from-html.js';

export const writeJsImportsFile = (cb) => {
  const jsImportsList = [];
  const allBlocksWithJsFiles = getDirectories('js');
  const message = `/*${doNotEditMessage.replace(/\n /gm, '\n * ').replace(/\n\n$/, '\n */\n\n')}`;
  let jsImports = message;

  if (config.addJsBefore.length > 0) {
    config.addJsBefore.forEach((src) => {
      jsImportsList.push(src);
    });
  }

  allBlocksWithJsFiles.forEach((blockName) => {
    if (config.alwaysAddBlocks.indexOf(blockName) === -1) {
      return;
    }
    jsImportsList.push(`../blocks/${blockName}/${blockName}.js`);
  });

  allBlocksWithJsFiles.forEach((blockName)=> {
    const src = `../blocks/${blockName}/${blockName}.js`;
    if (blocksFromHtml.indexOf(blockName) === -1) {
      return;
    }
    if (jsImportsList.indexOf(src) > -1) {
      return;
    }
    jsImportsList.push(src);
  });

  if (config.addJsAfter.length > 0) {
    config.addJsAfter.forEach((src) => {
      jsImportsList.push(src);
    });
  }

  jsImportsList.forEach((src) => {
    jsImports += `import '${src}';\n`;
  });

  fs.writeFileSync('src/js/entry.js', jsImports);
  // eslint-disable-next-line no-console
  console.log('\x1b[33m%s\x1b[0m', '---------- Write new entry.js');
  return cb();
};
