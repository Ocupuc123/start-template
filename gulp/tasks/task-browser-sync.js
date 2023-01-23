import gulp from 'gulp';
import fs from 'node:fs';
import server from 'browser-sync';
import { pugMixins } from './task-pug-mixins.js';
import { pugToHtml } from './task-pug-to-html.js';
import { styles } from './task-styles.js';
import { generateSvgSprite } from './task-svg-sprite.js';
import { copyImages } from './task-copy-images.js';
import { scripts } from './task-scripts.js';
import { writeSassImportsFile } from './task-sass-imports.js';
import { writeJsImportsFile } from './task-js-imports.js';

const browserSync = (callback) => {
  server.init({
    server: 'build',
    notify: false,
    cors: true
  });

  // Страницы: изменение, добавление
  gulp.watch('src/*.pug', { events: ['change', 'add'], delay: 100 }, gulp.series(
    pugToHtml,
    gulp.parallel(copyImages, writeSassImportsFile, writeJsImportsFile),
    gulp.parallel(styles, scripts)
  ));

  // Страницы: удаление
  gulp.watch('src/*.pug').on('unlink', (path) => {
    const filePathInBuildDir = path.replace(/src/gi, 'build').replace(/.pug/gi, '.html');

    fs.unlink(filePathInBuildDir, (err) => {
      if (err) {throw err;}
      // eslint-disable-next-line no-console
      console.log(`---------- Delete:  ${filePathInBuildDir}`);
    });
  });

  // Разметка Блоков: изменение
  gulp.watch('src/blocks/**/*.pug', { events: ['change'], delay: 100 }, pugToHtml);

  // Разметка Блоков: добавление
  gulp.watch('src/blocks/**/*.pug', { events: ['add'], delay: 100 }, gulp.series(pugMixins, pugToHtml));

  // Разметка Блоков: удаление
  gulp.watch('src/blocks/**/*.pug', { events: ['unlink'] }, pugMixins);

  // Шаблоны pug: все события
  gulp.watch(['src/layouts/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(
    pugToHtml,
    gulp.parallel(writeSassImportsFile, writeJsImportsFile),
    gulp.parallel(styles, scripts)
  ));

  // Стили Блоков: изменение
  gulp.watch('src/blocks/**/*.scss', { events: ['change'], delay: 100 }, gulp.series(
    writeSassImportsFile,
    styles
  ));

  // Стилевые глобальные файлы: все события
  gulp.watch(['src/scss/**/*.scss', '!src/scss/main.scss'], { events: ['all'], delay: 100 }, gulp.series(
    styles
  ));

  // Скриптовые глобальные файлы: все события
  gulp.watch(['src/js/**/*.js', '!src/js/entry.js', 'src/blocks/**/*.js'], { events: ['all'], delay: 100 }, gulp.series(
    writeJsImportsFile,
    scripts
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
