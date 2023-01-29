/* global process */

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import config from '../../config.js';
import { blocksFromHtml } from '../utils.js';
import { fileExist } from '../utils.js';

export const copyImages = (cb) => {
  const copiedImages = [];

  blocksFromHtml.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.{png,jpg,jpeg,svg}`);
    }
  });

  config.alwaysAddBlocks.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.{png,jpg,jpeg,svg}`);
    }
  });

  if (copiedImages.length) {

    return gulp.src(copiedImages)
      .pipe(gulpif(process.env.NODE_ENV === 'production', imagemin()))
      .pipe(gulp.dest('build/images'));

  } else {
    cb();
  }
};
