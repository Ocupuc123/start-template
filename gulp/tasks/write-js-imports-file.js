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
  return cb();
};
