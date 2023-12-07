/* eslint-disable camelcase */
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import browsersync from 'browser-sync';
import { getClassesToBlocksList } from '../utils.js';
import { PrettyHtmlConfig } from '../configs.js';

export const compilePugFast = ()=> gulp.src('src/pages/**/*.pug', { since: gulp.lastRun(compilePugFast) })
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'PUG',
      message: 'Error: <%= error.message %>'
    })
  }))
  .pipe(pug())
  .pipe(prettyHtml(PrettyHtmlConfig))
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);
