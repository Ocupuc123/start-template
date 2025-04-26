import process from 'node:process';
import { readdirSync, lstatSync, existsSync } from 'node:fs';
import { join, sep } from 'node:path';

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const doNotEditMessage =
  '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';

export const fileExist = (path) => existsSync(path);

export const getDirectories = (ext, baseDir = 'src/components') => {
  const result = [];
  const baseDirNormalized = join(process.cwd(), baseDir);

  const scanDirectory = (directory) => {
    const items = readdirSync(directory);

    items.forEach((item) => {
      const fullPath = join(directory, item);
      const isDirectory = lstatSync(fullPath).isDirectory();

      if (isDirectory) {
        const targetFile = join(fullPath, `${item}.${ext}`);
        if (fileExist(targetFile)) {
          // Получаем относительный путь от baseDir
          const relativePath = fullPath
            .replace(baseDirNormalized + sep, '')
            .replace(/\\/g, '/');
          result.push(relativePath);
        }

        scanDirectory(fullPath);
      }
    });
  };

  scanDirectory(baseDirNormalized);
  return result;
};

export const findBlockPath = (blockName, baseDir = 'src/components') => {
  const baseDirNormalized = join(process.cwd(), baseDir);

  const scan = (dir) => {
    const items = readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        const fullPath = join(dir, item.name);

        if (item.name === blockName) {
          return fullPath
            .replace(baseDirNormalized + sep, '')
            .replace(/\\/g, '/');
        }

        const found = scan(fullPath);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const foundPath = scan(baseDirNormalized);
  return foundPath || blockName;
};
