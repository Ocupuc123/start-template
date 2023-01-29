import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import browsersync from 'browser-sync';
import { prettyHtmlOption, getClassesToBlocksList } from '../utils.js';

export const compilePug = ()=> gulp.src('src/pages/**/*.pug')
  .pipe(plumber())
  .pipe(pug())
  .pipe(prettyHtml(prettyHtmlOption))
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);
