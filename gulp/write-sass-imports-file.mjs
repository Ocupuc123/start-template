import fs from 'node:fs';
import config from '../config.mjs';
import { blocksFromHtml } from './pug-to-html.mjs';

const doNotEditMessage = '// ВНИМАНИЕ! Этот файл генерируется автоматически.\n// Любые изменения будут потеряны при следующей компиляции.\n\n';

const writeSassImportsFile = (cb) => {
  const scssImportsList = [];
  let styleImports = doNotEditMessage.replace(/\n /gm, '\n  ');

  if (config.addStyle.length > 0) {
    config.addStyle.forEach((src) => {
      src = src.replace(/src\/scss\/|.scss|.css/gi, '');
      scssImportsList.push(src);
    });
  }

  if (blocksFromHtml.length > 0) {
    blocksFromHtml.forEach((src) => {
      src = `../blocks/${src}/${src}`;
      scssImportsList.push(src);
    });
  }

  scssImportsList.forEach((src) => {
    styleImports += `@import "${src}";\n`;
  });

  fs.writeFileSync('src/scss/main.scss', styleImports);
  // eslint-disable-next-line no-console
  console.log('---------- Write new main.scss');
  return cb();
};

export { writeSassImportsFile };
