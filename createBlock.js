/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

import * as fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import mkdirp from 'mkdirp';

const dir = 'src/blocks';
const blockName = process.argv[2];
const defaultExtensions = ['scss', 'html']; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (blockName) {
  const dirPath = `${dir}/${blockName}/`;
  const made = mkdirp.sync(dirPath);
  console.log(`Создание папки: ${made}`);

  // Обходим массив расширений и создаем файлы, если они еще не созданы
  extensions.forEach((extension) => {
    const filePath = `${dirPath + blockName}.${extension}`; // полный путь к создаваемому файлу
    let fileContent = ''; // будущий контент файла
    const fileCreateMsg = ''; // будущее сообщение в консоли при создании файла

    if (extension === 'scss') {
      fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n  $${blockName}: &; // #{$${blockName}}__element\n}\n`;
    } else if (extension === 'html') {
      fileContent = `<section class="${blockName} page-section">\n  <div class="container"></div>\n</section>\n`;
    }

    if (fileExist(filePath) === false) {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          return console.log(`Файл НЕ создан: ${err}`);
        }
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
        return console.log(`Файл создан: ${filePath}`);
      });
    } else if (extension !== 'js') {
      console.log(`Файл НЕ создан: ${filePath} (уже существует)`);
    }
  });
} else {
  console.log('Отмена операции: не указан блок');
}

function uniqueArray(arr) {
  const objectTemp = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true;
  }
  return Object.keys(objectTemp);
}

// eslint-disable-next-line consistent-return
function fileExist(path) {
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}
