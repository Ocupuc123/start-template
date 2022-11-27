import fs from 'node:fs';
import config from '../config.mjs';
import { blocksFromHtml } from './pug-to-html.mjs';

const doNotEditMessage = '// ВНИМАНИЕ! Этот файл генерируется автоматически.\n// Любые изменения будут потеряны при следующей компиляции.\n\n';

const writeJsImportsFile = (cb) => {
  const jsImportsList = [];
  let jsImports = doNotEditMessage.replace(/\n /gm, '\n  ');

  if (config.addJs.length > 0) {
    config.addJs.forEach((src) => {
      src = src.replace(/.js/gi, '');
      jsImportsList.push(src);
    });
  }

  if (config.alwaysAddBlocks.length > 0) {
    config.alwaysAddBlocks.forEach((blockName) => {
      jsImportsList.push(`../blocks/${blockName}/${blockName}`);
    });
  }

  if (blocksFromHtml.length > 0) {
    blocksFromHtml.forEach((src) => {
      src = `../blocks/${src}/${src}`;
      jsImportsList.push(src);
    });
  }

  jsImportsList.forEach((src) => {
    jsImports += `import '${src}';\n`;
  });

  fs.writeFileSync('src/js/entry.js', jsImports);
  // eslint-disable-next-line no-console
  console.log('---------- Write new entry.js');
  return cb();
};

export { writeJsImportsFile };
