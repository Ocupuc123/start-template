/* global process */

import fs from 'node:fs';
// import path from 'node:path';
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

const writeJsImportsFile = (cb) => {
  const jsImportsList = [];
  const allBlocksWithJsFiles = getDirectories('js');
  let jsImports = doNotEditMessage.replace(/\n /gm, '\n  ');

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
  console.log('---------- Write new entry.js');
  return cb();
};

export { writeJsImportsFile };
