/* eslint-disable no-console */
/* global process */
// Генератор файлов блока
// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

import fs from 'node:fs';
import mkdirp from 'mkdirp';
const blockName = process.argv[2];
const defaultExtensions = ['scss', 'img']; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (blockName) {
  const dirPath = `src/blocks/${blockName}/`; // полный путь к создаваемой папке блока

  const made = mkdirp.sync(dirPath);
  console.log(`[NTH] Создание папки: ${made}`);

  // Обходим массив расширений и создаем файлы, если они еще не созданы
  extensions.forEach((extension) => {
    const filePath = `${dirPath + blockName}.${extension}`; // полный путь к создаваемому файлу
    let fileContent = ''; // будущий контент файла
    const fileCreateMsg = ''; // будущее сообщение в консоли при создании файла

    if (extension === 'scss') {
      fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n  $${blockName}: &; // #{$${blockName}}__element\n}\n`;
    }

    else if (extension === 'js') {
      fileContent = '';
    }

    else if (extension === 'md') {
      fileContent = '';
    }

    else if (extension === 'pug') {
      fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(text, mods)\n\n  //- Принимает:\n  //-   text    {string} - текст\n  //-   mods    {string} - список модификаторов\n  //- Вызов:\n        +${blockName}('Текст', 'some-mod')\n\n  -\n    // список модификаторов\n    var allMods = '';\n    if(typeof(mods) !== 'undefined' && mods) {\n      var modsList = mods.split(',');\n      for (var i = 0; i < modsList.length; i++) {\n        allMods = allMods + ' ${blockName}--' + modsList[i].trim();\n      }\n    }\n\n  .${blockName}(class=allMods)&attributes(attributes)\n    .${blockName}__inner\n      block\n`;
    }

    else if (extension === 'img') {
      const imgFolder = `${dirPath}img/`;
      if (fileExist(imgFolder) === false) {
        const madeImgFolder = mkdirp.sync(imgFolder);
        console.log(`[NTH] Создание папки: ${madeImgFolder}`);
      } else {
        console.log(`[NTH] Папка ${imgFolder} НЕ создана (уже существует) `);
      }
    }

    if (fileExist(filePath) === false && extension !== 'img' && extension !== 'md') {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          return console.log(`[NTH] Файл НЕ создан: ${err}`);
        }
        console.log(`[NTH] Файл создан: ${filePath}`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    }
    else if (extension !== 'img' && extension !== 'md') {
      console.log(`[NTH] Файл НЕ создан: ${filePath} (уже существует)`);
    }
    else if (extension === 'md') {
      fs.writeFile(`${dirPath}readme.md`, fileContent, (err) => {
        if (err) {
          return console.log(`[NTH] Файл НЕ создан: ${err}`);
        }
        console.log(`[NTH] Файл создан: ${dirPath}readme.md`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    }
  });
} else {
  console.log('[NTH] Отмена операции: не указан блок');
}

function uniqueArray(arr) {
  const objectTemp = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true;
  }
  return Object.keys(objectTemp);
}

function fileExist(path) {
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}
