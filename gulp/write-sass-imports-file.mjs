import fs from 'node:fs';
import config from '../config.mjs';
import { blocksFromHtml } from './pug-to-html.mjs';

const doNotEditMessage = '// ВНИМАНИЕ! Этот файл генерируется автоматически.\n// Любые изменения будут потеряны при следующей компиляции.\n\n';

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки
 * @return {boolean}
 */

const fileExist = (filepath)=> {
  let flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }catch(e){
    flag = false;
  }
  return flag;
};

/**
 * Получение всех названий поддиректорий, содержащих файл указанного расширения, совпадающий по имени с поддиректорией
 * @param  {string} ext    Расширение файлов, которое проверяется
 * @return {array}         Массив из имён блоков
 */

const getDirectories = (ext)=> {
  const source = 'src/blocks/';
  const res = fs.readdirSync(source)
    .filter((item) => fs.lstatSync(source + item).isDirectory())
    .filter((item) => fileExist(`${source + item }/${ item }.${ ext}`));
  return res;
};

const writeSassImportsFile = (cb) => {
  const scssImportsList = [];
  const allBlocksWithScssFiles = getDirectories('scss');
  let styleImports = doNotEditMessage.replace(/\n /gm, '\n  ');

  if (config.addStyle.length > 0) {
    config.addStyle.forEach((src) => {
      src = src.replace(/src\/scss\/|.scss|.css/gi, '');
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

export { writeSassImportsFile };
