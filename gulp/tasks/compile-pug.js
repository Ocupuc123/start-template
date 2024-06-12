import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import { PrettyHtmlConfig } from '../configs.js';

export const compilePug = ()=> gulp.src('src/pages/**/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'PUG',
      message: 'Error: <%= error.message %>'
    })
  }))
  .pipe(pug())
  .pipe(prettyHtml(PrettyHtmlConfig))
  .pipe(gulp.dest('build'));
