/* global Buffer */

import getClassesFromHtml from 'get-classes-from-html';
import config from '../config.mjs';
import through from 'through2';
import fs from 'node:fs';

const doNotEditMessage = '// ВНИМАНИЕ! Этот файл генерируется автоматически.\n// Любые изменения будут потеряны при следующей компиляции.\n\n';
let blocksFromHtml = [];

const getClassesToBlocksList = () => through.obj(function (file, enc, cb) {
  const blocksList = [];
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  try {
    const data = file.contents
      .toString()
      .split('\n')
      .map((html) => {
        const fileContent = html;
        const classesInFile = getClassesFromHtml(fileContent);
        for (const item of classesInFile) {
          if ((item.indexOf('__') > -1) || (item.indexOf('--') > -1) || (blocksList.indexOf(item) + 1)) {
            continue;
          }
          blocksList.push(item);
        }
        return html;
      })
      .join('\n');
    blocksFromHtml = blocksList;
    // eslint-disable-next-line no-console
    console.log(`---------- Used HTML blocks: ${blocksFromHtml.join(', ')}`);
    file.contents = new Buffer.from(data);
    this.push(file);
  } catch (err) {
    this.emit('error', new Error(err));
  }
  cb();
});

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

export { getClassesToBlocksList, writeScssImportsFile };
