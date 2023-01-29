/* global Buffer */
/* eslint-disable camelcase */

import fs from 'node:fs';
import through from 'through2';
import getClassesFromHtml from 'get-classes-from-html';
import config from '../config.js';

export const blocksFromHtml = [];

export const doNotEditMessage = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';

export const prettyHtmlOption = {
  indent_size: 2,
  indent_char: ' ',
  unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
};

export const fileExist = (filepath) => {
  let flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }catch(e){
    flag = false;
  }
  return flag;
};

export const getClassesToBlocksList = () => through.obj(function (file, enc, cb) {
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
          if ((item.indexOf('__') > -1) || (item.indexOf('--') > -1) || (blocksFromHtml.indexOf(item) + 1)) {
            continue;
          }
          if (config.ignoredBlocks.indexOf(item) + 1) {
            continue;
          }
          blocksFromHtml.push(item);
        }
        return html;
      })
      .join('\n');
    if (config.alwaysAddBlocks.length > 0) {
      for (const item of config.alwaysAddBlocks) {
        if (blocksFromHtml.indexOf(item) > -1) {
          continue;
        }
        blocksFromHtml.push(item);
      }
    }
    // eslint-disable-next-line no-console
    console.log(`---------- Used HTML blocks: ${blocksFromHtml.join(', ')}`);
    file.contents = new Buffer.from(data);
    this.push(file);
  } catch (err) {
    this.emit('error', new Error(err));
  }
  cb();
});

export const getDirectories = (ext) => {
  const source = 'src/blocks/';
  const res = fs.readdirSync(source)
    .filter((item) => fs.lstatSync(source + item).isDirectory())
    .filter((item) => fileExist(`${source + item }/${ item }.${ ext}`));
  return res;
};
