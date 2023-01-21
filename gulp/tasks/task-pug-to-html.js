import gulp from 'gulp';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import cached from 'gulp-cached';
import dependents from 'gulp-dependents';
import pugLinter from 'gulp-pug-linter';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import browsersync from 'browser-sync';
import prettyHtmlOption from '../utils/pretty-html-options.js';
import { getClassesToBlocksList } from '../utils/get-classes-to-blocks-list.js';

const pugToHtml = ()=> gulp.src('src/**/*.pug')
  .pipe(plumber())
  .pipe(cached('pug'))
  .pipe(dependents({
    '.pug': {
      parserSteps: [/^\s*(?:extends|include)\s+(.+?)\s*$/gm],
      postfixes: ['.pug', '.jade']
    }
  }))
  .pipe(pugLinter({ reporter: 'default' }))
  .pipe(filter('src/*.pug'))
  .pipe(pug())
  .pipe(prettyHtml(prettyHtmlOption))
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { pugToHtml };
