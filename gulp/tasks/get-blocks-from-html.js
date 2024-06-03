import gulp from 'gulp';
import pug from 'gulp-pug';
import { getClassesToBlocksList } from '../utils.js';

export const getBlocksFromHtml = () => gulp.src('src/pages/**/*.pug')
  .pipe(pug())
  .pipe(getClassesToBlocksList());
