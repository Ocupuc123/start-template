import { Buffer } from 'node:buffer';
import gulp from 'gulp';
import pug from 'gulp-pug';
import through from 'through2';
import getClassesFromHtml from 'get-classes-from-html';
import config from '../../config.js';

export const blocksFromHtml = [];

export const getClassesToBlocksList = () => through.obj(function(file, enc, cb) {
  if (file.isNull()) {
    return cb(null, file);
  }

  try {
    const content = file.contents.toString();
    const classesInFile = getClassesFromHtml(content);

    // Обрабатываем классы из HTML
    classesInFile.forEach((className) => {
      if (
        !className.includes('__') &&
        !className.includes('--') &&
        !config.ignoredBlocks.includes(className) &&
        !blocksFromHtml.includes(className)
      ) {
        blocksFromHtml.push(className);
      }
    });

    // Добавляем обязательные блоки
    config.alwaysAddBlocks.forEach((block) => {
      if (!blocksFromHtml.includes(block)) {
        blocksFromHtml.push(block);
      }
    });

    file.contents = Buffer.from(content);
    this.push(file);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error processing file ${file.path}:`, err);
    return cb(new Error(`Failed to process file: ${file.path}`));
  }

  cb();
});

export const getBlocksFromHtml = () =>
  gulp.src('src/pages/**/*.pug')
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(getClassesToBlocksList());
