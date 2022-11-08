import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dependents from 'gulp-dependents';
import pugLinter from 'gulp-pug-linter';
import filter from 'gulp-filter';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
import pug from 'gulp-pug';
import browsersync from 'browser-sync';

const pugToHtml = ()=> gulp.src('src/pages/**/*.pug')
  .pipe(plumber())
  .pipe(dependents({
    '.pug': {
      parserSteps: [/^\s*(?:extends|include)\s+(.+?)\s*$/gm],
      postfixes: ['.pug', '.jade']
    }
  }))
  .pipe(pugLinter({ reporter: 'default' }))
  .pipe(filter('src/pages/*.pug'))
  .pipe(pug({ pretty: true }))
  .pipe(webpHtmlNoSvg())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { pugToHtml };
