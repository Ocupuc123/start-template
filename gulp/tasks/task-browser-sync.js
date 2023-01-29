import gulp from 'gulp';
import fs from 'node:fs';
import server from 'browser-sync';
import { writePugMixinsFile } from './task-write-pug-mixins-file.js';
import { compilePug } from './task-compile-pug.js';
import { compilePugFast } from './task-compile-pug-fast.js';
import { generateSvgSprite } from './task-generate-svg-sprite.js';
import { copyImages } from './task-copy-images.js';
import { compileSass } from './task-compile-sass.js';
import { compileScripts } from './task-compile-scripts.js';
import { writeSassImportsFile } from './task-write-sass-imports-file.js';
import { writeJsImportsFile } from './task-write-js-imports-file.js';

const browserSync = (callback) => {
  server.init({
    server: 'build',
    notify: false,
    cors: true
  });

  // Страницы: изменение, добавление
  gulp.watch('src/pages/**/*.pug', { events: ['change', 'add'], delay: 100 }, gulp.series(
    compilePugFast,
    gulp.parallel(copyImages, writeSassImportsFile, writeJsImportsFile),
    gulp.parallel(compileSass, compileScripts)
  ));

  // Страницы: удаление
  gulp.watch('src/pages/**/*.pug').on('unlink', (path) => {
    const filePathInBuildDir = path.replace(/src/gi, 'build').replace(/.pug/gi, '.html');

    fs.unlink(filePathInBuildDir, (err) => {
      if (err) {throw err;}
      // eslint-disable-next-line no-console
      console.log(`---------- Delete:  ${filePathInBuildDir}`);
    });
  });

  // Разметка Блоков: изменение
  gulp.watch('src/blocks/**/*.pug', { events: ['change'], delay: 100 }, compilePug);

  // Разметка Блоков: добавление
  gulp.watch('src/blocks/**/*.pug', { events: ['add'], delay: 100 }, gulp.series(writePugMixinsFile, compilePug));

  // Разметка Блоков: удаление
  gulp.watch('src/blocks/**/*.pug', { events: ['unlink'] }, writePugMixinsFile);

  // Шаблоны pug: все события
  gulp.watch(['src/layouts/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(
    compilePug,
    gulp.parallel(writeSassImportsFile, writeJsImportsFile),
    gulp.parallel(compileSass, compileScripts)
  ));

  // Стили Блоков: изменение
  gulp.watch('src/blocks/**/*.scss', { events: ['change'], delay: 100 }, gulp.series(
    writeSassImportsFile,
    compileSass
  ));

  // Стилевые глобальные файлы: все события
  gulp.watch(['src/scss/**/*.scss', '!src/scss/main.scss'], { events: ['all'], delay: 100 }, gulp.series(
    compileSass
  ));

  // Скриптовые глобальные файлы: все события
  gulp.watch(['src/js/**/*.js', '!src/js/entry.js', 'src/blocks/**/*.js'], { events: ['all'], delay: 100 }, gulp.series(
    writeJsImportsFile,
    compileScripts
  ));

  // Картинки: все события
  gulp.watch(['src/blocks/**/img/*.{jpg,jpeg,png,svg}'], { events: ['all'], delay: 100 }, gulp.series(
    copyImages
  ));

  // Спрайт SVG
  gulp.watch('src/blocks/sprite-svg/svg/*.svg', { events: ['all'], delay: 100 }, gulp.series(
    generateSvgSprite
  ));

  return callback();
};

export { browserSync };
