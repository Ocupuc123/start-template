/* global process */
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import webp from 'gulp-webp';
import config from '../../config.js';
import { blocksFromHtml, fileExist } from '../utils.js';

export const copyImages = (cb) => {
  const useWebpConverter = config.settings.useWebpConverter;
  const copiedImages = [];

  copiedImages.push('src/images/*.{png,jpg,jpeg,svg}');

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
      .pipe(gulpif(process.env.NODE_ENV === 'production', imagemin([
        imageminMozjpeg({ quality: 80, progressive: true }),
        imageminOptipng({ optimizationLevel: 2 }),
      ])))
      .pipe(gulp.dest('build/images'))
      .pipe(gulpif(useWebpConverter, webp()))
      .pipe(gulpif(useWebpConverter, gulp.dest('build/images')));

  } else {
    cb();
  }
};
