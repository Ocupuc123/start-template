/* global global */
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import data from 'gulp-data';
import { readFileSync } from 'node:fs';
import emitty from 'emitty';
import { getClassesToBlocksList } from './get-blocks-from-html.js';
import { PrettyHtmlConfig } from '../configs.js';

const emittyPug = emitty.setup('src', 'pug', { makeVinylFile: true });

export const compilePug = () => new Promise((resolve, reject) => {
  emittyPug.scan(global.emittyPugChangedFile).then(() => gulp
    .src('src/pages/**/*.pug')
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'PUG',
          message: 'Error: <%= error.message %>',
        }),
      }),
    )
    .pipe(emittyPug.filter(global.emittyPugChangedFile))
    .pipe(data(() => JSON.parse(readFileSync('./src/data/data.json', 'utf8'))))
    .pipe(pug())
    .pipe(getClassesToBlocksList())
    .pipe(prettyHtml(PrettyHtmlConfig))
    .pipe(gulp.dest('build'))
    .on('end', () => resolve())
    .on('error', reject));
});
