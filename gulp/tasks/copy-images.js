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
  const isProduction = process.env.NODE_ENV === 'production';
  const useWebpConverter = config.settings.useWebpConverter;
  const imageminQuality = config.settings.imageminQuality || 80;
  const fileExtensionsList = '{png,jpg,jpeg,svg,gif}';
  const copiedImages = [];

  copiedImages.push(`src/images/*.${fileExtensionsList}`);

  blocksFromHtml.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.${fileExtensionsList}`);
    }
  });

  config.alwaysAddBlocks.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.${fileExtensionsList}`);
    }
  });

  if (copiedImages.length) {

    return gulp.src(copiedImages)
      .pipe(gulpif(isProduction, imagemin([
        imageminMozjpeg({ quality: imageminQuality, progressive: true }),
        imageminOptipng({ optimizationLevel: 2 }),
      ])))
      .pipe(gulp.dest('build/images'))
      .pipe(gulpif(useWebpConverter, webp()))
      .pipe(gulpif(useWebpConverter, gulp.dest('build/images')));

  } else {
    cb();
  }
};
