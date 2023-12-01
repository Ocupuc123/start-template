/* eslint-disable camelcase */
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import browsersync from 'browser-sync';
import { getClassesToBlocksList } from '../utils.js';

const prettyHtmlOption = {
  indent_size: 2,
  indent_char: ' ',
  unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
};

export const compilePug = ()=> gulp.src('src/pages/**/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'PUG',
      message: 'Error: <%= error.message %>'
    })
  }))
  .pipe(pug())
  .pipe(prettyHtml(prettyHtmlOption))
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);
