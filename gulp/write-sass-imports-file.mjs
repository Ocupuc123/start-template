import fs from 'node:fs';
import config from '../config.mjs';
import { blocksFromHtml } from './blocks-from-html.mjs';

const doNotEditMessage = '// ВНИМАНИЕ! Этот файл генерируется автоматически.\n// Любые изменения будут потеряны при следующей компиляции.\n\n';

const writeScssImportsFile = (cb) => {
  const scssImportsList = [];
  let styleImports = doNotEditMessage.replace(/\n /gm, '\n  ');

  // Добавим сразу все блоки с конфига
  config.addStyle.forEach((blockName) => {
    blockName = blockName.replace(/src\/scss\/|.scss|.css/gi, '');
    scssImportsList.push(blockName);
  });

  // Добавим блоки упомянутые в конфиге
  config.alwaysAddBlocks.forEach((blockName) => {
    blockName = `../blocks/${blockName}/${blockName}`;
    scssImportsList.push(blockName);
  });

  // Добавим блоки упомянутые в разметке
  blocksFromHtml.forEach((blockName) => {
    if (config.alwaysAddBlocks.indexOf(blockName) > -1) {
      return;
    }
    blockName = `../blocks/${blockName}/${blockName}`;
    scssImportsList.push(blockName);
  });

  scssImportsList.forEach((blockName) => {
    styleImports += `@import "${blockName}";\n`;
  });

  // Запишем диспетчер стилей
  fs.writeFileSync('src/scss/main.scss', styleImports);
  // eslint-disable-next-line no-console
  console.log('---------- Write new main.scss');
  return cb();
};

export { writeScssImportsFile };

