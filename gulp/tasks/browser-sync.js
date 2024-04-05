import gulp from 'gulp';
import fs from 'node:fs';
import server from 'browser-sync';
import { writePugMixinsFile } from './write-pug-mixins-file.js';
import { compilePug } from './compile-pug.js';
import { compilePugFast } from './compile-pug-fast.js';
import { generateSvgSprite } from './generate-svg-sprite.js';
import { copyImages } from './copy-images.js';
import { compileSass } from './compile-sass.js';
import { compileScripts } from './compile-scripts.js';
import { writeSassImportsFile } from './write-sass-imports-file.js';
import { writeJsImportsFile } from './write-js-imports-file.js';
import { ServerConfig } from '../configs.js';

const reload = (done) => {
  server.reload();
  done();
};

export const browserSync = (cb) => {
  server.init(ServerConfig);

  // Страницы: изменение, добавление
  gulp.watch('src/pages/**/*.pug', { events: ['change', 'add'], delay: 100 }, gulp.series(
    compilePugFast,
    gulp.parallel(copyImages, writeSassImportsFile, writeJsImportsFile, compileSass, compileScripts),
    reload
  ));

  // Страницы: удаление
  gulp.watch('src/pages/**/*.pug').on('unlink', (path) => {
    const filePathInBuildDir = path.replace(/src/gi, 'build').replace(/.pug/gi, '.html');

    fs.unlink(filePathInBuildDir, (err) => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(`---------- Delete:  ${filePathInBuildDir}`);
    });
  });

  // Разметка Блоков: изменение
  gulp.watch('src/blocks/**/*.pug', { events: ['change'], delay: 100 }, gulp.series(
    compilePug,
    reload
  ));

  // Разметка Блоков: добавление
  gulp.watch('src/blocks/**/*.pug', { events: ['add'], delay: 100 }, gulp.series(
    writePugMixinsFile,
    compilePug,
    reload
  ));

  // Разметка Блоков: удаление
  gulp.watch('src/blocks/**/*.pug', { events: ['unlink'] }, gulp.series(
    gulp.parallel(
      writePugMixinsFile,
      writeSassImportsFile
    )
  ));

  // Шаблоны pug: все события
  gulp.watch(['src/layouts/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(
    compilePug,
    gulp.parallel(writeSassImportsFile, writeJsImportsFile, compileSass, compileScripts),
    reload
  ));

  // Стили Блоков: изменение
  gulp.watch(['src/blocks/**/*.scss'], { events: ['change'], delay: 100 }, gulp.series(
    writeSassImportsFile,
    compileSass
  ));

  // Стили Блоков: добавление
  gulp.watch(['src/blocks/**/*.scss'], { events: ['add'], delay: 100 }, gulp.series(
    writeSassImportsFile,
    compileSass,
  ));

  // Стилевые глобальные файлы: все события
  gulp.watch(['src/scss/**/*.scss', '!src/scss/main.scss'], { events: ['all'], delay: 100 }, gulp.series(
    compileSass
  ));

  // Скриптовые глобальные файлы: все события
  gulp.watch(['src/js/**/*.js', '!src/js/entry.js', 'src/blocks/**/*.js'], { events: ['all'], delay: 100 }, gulp.series(
    writeJsImportsFile,
    compileScripts,
    reload
  ));

  // Картинки: все события
  gulp.watch(['src/blocks/**/img/*.{jpg,jpeg,png,svg}'], { events: ['all'], delay: 100 }, gulp.series(
    copyImages,
    reload
  ));

  // Спрайт SVG
  gulp.watch('src/blocks/sprite-svg/svg/*.svg', { events: ['all'], delay: 100 }, gulp.series(
    generateSvgSprite,
    reload
  ));

  return cb();
};
