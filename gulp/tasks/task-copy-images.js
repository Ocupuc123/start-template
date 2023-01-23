/* global process */

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import blocksFromHtml from '../utils/blocks-from-html.js';
import config from '../../config.js';
import { fileExist } from '../utils/file-exist.js';

const copyImages = (cb) => {
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
      .pipe(imagemin())
      .pipe(gulp.dest('build/images'));

  } else {
    cb();
  }
};

export { copyImages };
