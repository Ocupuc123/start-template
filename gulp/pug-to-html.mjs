/* global Buffer process */

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import cached from 'gulp-cached';
import dependents from 'gulp-dependents';
import pugLinter from 'gulp-pug-linter';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
import pug from 'gulp-pug';
import browsersync from 'browser-sync';
import getClassesFromHtml from 'get-classes-from-html';
import through from 'through2';
import path from 'node:path';
import fs from 'node:fs';
import config from '../config.mjs';

let blocksFromHtml = [];

const getClassesToBlocksList = () => through.obj(function (file, enc, cb) {
  const blocksList = [];
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  try {
    const data = file.contents
      .toString()
      .split('\n')
      .map((html) => {
        const blocksFolder = fs.readdirSync(`${process.cwd()}${path.sep}src${path.sep}blocks${path.sep}`, {
          withFileTypes: true
        }).filter((d) => d.isDirectory()).map((d) => d.name);
        const fileContent = html;
        const classesInFile = getClassesFromHtml(fileContent);

        for (const item of classesInFile) {
          if ((item.indexOf('__') > -1) || (item.indexOf('--') > -1) || (blocksList.indexOf(item) + 1) || blocksFolder.indexOf(item) === -1 || config.alwaysAddBlocks.indexOf(item) > -1) {
            continue;
          }
          blocksList.push(item);
        }
        return html;
      })
      .join('\n');
    if (config.alwaysAddBlocks.length > 0) {
      config.alwaysAddBlocks.forEach((blockName) => {
        blocksList.push(blockName);
      });
    }
    blocksFromHtml = blocksList;
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
  .pipe(pug({ pretty: true }))
  .pipe(webpHtmlNoSvg())
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
  .pipe(pug({ pretty: true }))
  .pipe(webpHtmlNoSvg())
  .pipe(getClassesToBlocksList())
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { pugToHtml, pugToHtmlFast, blocksFromHtml };
