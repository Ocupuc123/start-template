/* global process */
/* eslint-disable camelcase */
import fs from 'node:fs';

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const doNotEditMessage = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';

export const fileExist = (filepath) => {
  let flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }catch(e){
    flag = false;
  }
  return flag;
};

export const getDirectories = (ext) => {
  const source = 'src/blocks/';
  const res = fs.readdirSync(source)
    .filter((item) => fs.lstatSync(source + item).isDirectory())
    .filter((item) => fileExist(`${source + item }/${ item }.${ ext}`));
  return res;
};
