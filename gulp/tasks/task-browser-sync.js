import gulp from 'gulp';
import fs from 'node:fs';
import server from 'browser-sync';
import { pugMixins } from './task-pug-mixins.js';
import { pugToHtml, pugToHtmlFast } from './task-pug-to-html.js';
import { styles } from './task-styles.js';
import { svgSprite } from './task-svg-sprite.js';
import { images } from './task-images.js';
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
  gulp.watch(['src/*.pug', '!src/blocks/mixins.pug'], { events: ['change', 'add'], delay: 100 }, gulp.series(
    pugToHtmlFast,
    gulp.parallel(writeSassImportsFile, writeJsImportsFile),
    gulp.parallel(styles, scripts),
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
  gulp.watch(['src/pug/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(
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
  gulp.watch(['src/images/**/*.{gif,jpg,png,jpeg,webp,svg}', '!src/images/favicons/*.*', '!src/images/icons/svg/*.svg'], { events: ['all'], delay: 100 }, gulp.series(
    images
  ));

  // Спрайт SVG
  gulp.watch('src/images/icons/svg/*.svg', { events: ['all'], delay: 100 }, gulp.series(
    svgSprite
  ));

  return callback();
};

export { browserSync };
