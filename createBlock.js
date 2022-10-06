// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

import * as fs from 'fs';
import mkdirp from 'mkdirp';

const dir = 'src/blocks';
// eslint-disable-next-line no-undef
const blockName = process.argv[2];
const defaultExtensions = ['scss', 'html'];
// eslint-disable-next-line no-undef
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

if (blockName) {
  const dirPath = `${dir}/${blockName}/`;
  const made = mkdirp.sync(dirPath);
  // eslint-disable-next-line no-console
  console.log(`Создание папки: ${made}`);

  extensions.forEach((extension) => {
    const filePath = `${dirPath + blockName}.${extension}`;
    let fileContent = '';
    const fileCreateMsg = '';

    if (extension === 'scss') {
      fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n  $${blockName}: &; // #{$${blockName}}__element\n}\n`;
    } else if (extension === 'html') {
      fileContent = `<section class="${blockName} page-section">\n  <div class="container"></div>\n</section>\n`;
    }

    if (fileExist(filePath) === false) {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          return console.log(`Файл НЕ создан: ${err}`);
        }
        if (fileCreateMsg) {
          // eslint-disable-next-line no-console
          console.warn(fileCreateMsg);
        }
        // eslint-disable-next-line no-console
        return console.log(`Файл создан: ${filePath}`);
      });
    } else if (extension !== 'js') {
      // eslint-disable-next-line no-console
      console.log(`Файл НЕ создан: ${filePath} (уже существует)`);
    }
  });
} else {
  // eslint-disable-next-line no-console
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
