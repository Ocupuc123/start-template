/* global Buffer */

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import cached from 'gulp-cached';
import dependents from 'gulp-dependents';
import pugLinter from 'gulp-pug-linter';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import browsersync from 'browser-sync';
import getClassesFromHtml from 'get-classes-from-html';
import through from 'through2';
import config from '../config.mjs';

const blocksFromHtml = [];

const getClassesToBlocksList = () => through.obj(function (file, enc, cb) {
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  try {
    const data = file.contents
      .toString()
      .split('\n')
      .map((html) => {
        const fileContent = html;
        const classesInFile = getClassesFromHtml(fileContent);
        for (const item of classesInFile) {
          if ((item.indexOf('__') > -1) || (item.indexOf('--') > -1) || (blocksFromHtml.indexOf(item) + 1)) {
            continue;
          }
          if (config.ignoredBlocks.indexOf(item) + 1) {
            continue;
          }
          blocksFromHtml.push(item);
        }
        return html;
      })
      .join('\n');
    if (config.alwaysAddBlocks.length > 0) {
      for (const item of config.alwaysAddBlocks) {
        if (blocksFromHtml.indexOf(item) > -1) {
          continue;
        }
        blocksFromHtml.push(item);
      }
    }
    // eslint-disable-next-line no-console
    console.log(`---------- Used HTML blocks: ${blocksFromHtml.join(', ')}`);
    file.contents = new Buffer.from(data);
    this.push(file);
  } catch (err) {
    this.emit('error', new Error(err));
  }
  cb();
});

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
  .pipe(prettyHtml({
    // eslint-disable-next-line camelcase
    indent_size: 2,
    // eslint-disable-next-line camelcase
    indent_char: ' ',
    unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
  }))
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

const pugToHtmlFast = ()=> gulp.src('src/**/*.pug', { since: gulp.lastRun(pugToHtmlFast) })
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
  .pipe(prettyHtml({
    // eslint-disable-next-line camelcase
    indent_size: 2,
    // eslint-disable-next-line camelcase
    indent_char: ' ',
    unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
  }))
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { pugToHtml, pugToHtmlFast, blocksFromHtml };
