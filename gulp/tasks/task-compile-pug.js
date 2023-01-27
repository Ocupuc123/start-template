import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import browsersync from 'browser-sync';
import prettyHtmlOption from '../utils/pretty-html-options.js';
import { getClassesToBlocksList } from '../utils/get-classes-to-blocks-list.js';

const compilePug = ()=> gulp.src('src/pages/*.pug', { since: gulp.lastRun(compilePug) })
  .pipe(plumber())
  .pipe(pug())
  .pipe(prettyHtml(prettyHtmlOption))
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { compilePug };
