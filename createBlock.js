/* eslint-disable no-console */
/* global process */

import { access, constants, writeFile } from 'node:fs/promises';
import { mkdirp } from 'mkdirp';

const blockName = process.argv[2];
const defaultExtensions = ['scss', 'img'];
const extensions = [...new Set([...defaultExtensions, ...process.argv.slice(3)])];

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function createBlock() {
  if (!blockName) {
    console.log('Отмена операции: не указан блок');
    return;
  }

  const dirPath = `src/components/blocks/${blockName}/`;

  try {
    const made = await mkdirp(dirPath);
    console.log(`Создание папки: ${made}`);
  } catch (err) {
    console.error(`Ошибка создания папки: ${err}`);
    return;
  }

  const extensionConfigs = {
    scss: {
      content: `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n  $${blockName}: &; // #{$${blockName}}__element\n}\n`,
      path: `${blockName}.scss`
    },
    js: {
      content: '',
      path: `${blockName}.js`
    },
    data: {
      content: '-\n  const data = {\n    title: "Заголовок",\n    description: "Описание"\n  };\n',
      path: `${blockName}.data.pug`
    },
    md: {
      content: '',
      path: 'article.md'
    },
    pug: {
      content: `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(props, mods)\n\n  //- Принимает:\n  //-   props   {object} - пропсы\n  //-   mods    {string} - список модификаторов\n  //- Вызов:\n        +${blockName}({title: 'Заголовок', description: 'Описание'}, 'some-mod')\n\n  -\n    // список модификаторов\n    var allMods = '';\n    if(mods) {\n      allMods = mods.split(',').map(mod => '${blockName}--' + mod.trim()).join(' ');\n    }\n\n  //- include ${blockName}.data.pug\n\n  .${blockName}(class=allMods)&attributes(attributes)\n    .container\n      block\n`,
      path: `${blockName}.pug`
    },
    img: {
      isDirectory: true,
      path: 'img/'
    }
  };

  for (const extension of extensions) {
    const config = extensionConfigs[extension] || {};

    if (config.isDirectory) {
      try {
        const dir = `${dirPath}${config.path}`;
        await mkdirp(dir);
        console.log(`Создание папки: ${dir}`);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          console.error(`Ошибка: ${err}`);
        }
      }
      continue;
    }

    if (!config.path) {
      console.log(`Пропуск неизвестного расширения: ${extension}`);
      continue;
    }

    const targetPath = `${dirPath}${config.path}`;

    if (await fileExists(targetPath)) {
      console.log(`Файл существует: ${targetPath}`);
      continue;
    }

    try {
      await writeFile(targetPath, config.content);
      console.log(`Файл создан: ${targetPath}`);
    } catch (err) {
      console.error(`Ошибка записи: ${targetPath} - ${err}`);
    }
  }
}

createBlock().catch(console.error);
