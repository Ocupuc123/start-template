import gulp from 'gulp';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import cached from 'gulp-cached';
import dependents from 'gulp-dependents';
import pugLinter from 'gulp-pug-linter';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
import pug from 'gulp-pug';
import browsersync from 'browser-sync';

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
  .pipe(pug({pretty: true}))
  .pipe(webpHtmlNoSvg())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { pugToHtml };
