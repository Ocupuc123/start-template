import fs from 'node:fs';
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

const doNotEditMessage = '//- ВНИМАНИЕ! Этот файл генерируется автоматически.\n//- Любые изменения будут потеряны при следующей компиляции.\n\n';

const dirBlocks = 'src/blocks/';

const pugMixins = (callback) => {
  const allBlocksWithPugFiles = getDirectories('pug');
  let pugMixinsFile = `//-${ doNotEditMessage.replace(/\n /gm,'\n  ')}`;
  allBlocksWithPugFiles.forEach((blockName) => {
    pugMixinsFile += `include ${dirBlocks.replace(dirBlocks,'./')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync('src/blocks/mixins.pug', pugMixinsFile);
  callback();
};

export { pugMixins };
