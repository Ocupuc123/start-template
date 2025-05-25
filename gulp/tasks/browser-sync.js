/* global global */
import gulp from 'gulp';
import server from 'browser-sync';
import { unlink } from 'node:fs';
import { writePugMixinsFile } from './write-pug-mixins-file.js';
import { compilePug } from './compile-pug.js';
import { copyImages, copySingleImage } from './copy-images.js';
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
    compilePug,
    gulp.parallel(copyImages, writeSassImportsFile, writeJsImportsFile, compileSass, compileScripts),
    reload
  )).on('all', (event, file) => {
    global.emittyPugChangedFile = event === 'unlink' ? undefined : file;
  });

  // Страницы: удаление
  gulp.watch('src/pages/**/*.pug').on('unlink', (path) => {
    const filePathInBuildDir = path.replace(/src/gi, 'build').replace(/pages/gi, '').replace(/.pug/gi, '.html');

    unlink(filePathInBuildDir, (err) => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(`---------- Delete:  ${filePathInBuildDir}`);
    });
  });

  // Разметка Блоков: изменение
  gulp.watch(['src/components/**/*.pug', '!src/components/mixins.pug'], { events: ['change'], delay: 100 }, gulp.series(
    compilePug,
    reload
  ));

  // Разметка Блоков: добавление
  gulp.watch(['src/components/**/*.pug', '!src/components/mixins.pug'], { events: ['add'], delay: 100 }, gulp.series(
    writePugMixinsFile,
    compilePug,
    reload
  ));

  // Разметка Блоков: удаление
  gulp.watch(['src/components/**/*.pug', '!src/components/mixins.pug'], { events: ['unlink'] }, gulp.series(
    gulp.parallel(
      writePugMixinsFile,
      writeSassImportsFile,
      writeJsImportsFile
    )
  ));

  // Шаблоны pug: все события
  gulp.watch('src/layouts/**/*.pug', gulp.series(
    compilePug,
    gulp.parallel(writeSassImportsFile, writeJsImportsFile, compileSass, compileScripts),
    reload
  ));

  // Стили Блоков: изменение
  gulp.watch(['src/components/**/*.scss'], { events: ['change'], delay: 100 }, gulp.series(
    compileSass
  ));

  // Стили Блоков: добавление
  gulp.watch(['src/components/**/*.scss'], { events: ['add'], delay: 100 }, gulp.series(
    writeSassImportsFile,
    compileSass,
  ));

  // Стилевые глобальные файлы: все события
  gulp.watch(['src/styles/**/*.scss', '!src/styles/main.scss'], { events: ['all'], delay: 100 }, gulp.series(
    compileSass
  ));

  // Скриптовые файлы: изменение
  gulp.watch('src/components/**/*.js', { events: ['change'], delay: 100 }, gulp.series(
    compileScripts,
  ));

  // Скриптовые файлы: добавление
  gulp.watch('src/components/**/*.js', { events: ['add'], delay: 100 }, gulp.series(
    writeJsImportsFile,
    compileScripts,
  ));

  // Скриптовые глобальные файлы: все события
  gulp.watch(['src/scripts/**/*.js', '!src/scripts/entry.js'], { events: ['all'], delay: 100 }, gulp.series(
    writeJsImportsFile,
    compileScripts,
  ));

  // Картинки: все события
  gulp.watch(['src/components/**/img/*.{jpg,jpeg,png,svg,webp,gif}', 'src/assets/images/*.{jpg,jpeg,png,svg,webp,gif}'], { events: ['all'], delay: 100 }
  ).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      gulp.series(
        () => copySingleImage(path),
        reload
      )();
    }
  });

  return cb();
};
