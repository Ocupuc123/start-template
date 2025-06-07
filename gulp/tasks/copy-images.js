import gulp from 'gulp';
import config from '../../config.js';
import { fileExist, findBlockPath } from '../utils.js';
import { blocksFromHtml } from './get-blocks-from-html.js';
import { join } from 'node:path';
import { sharpOptimizeImagesConfig } from '../configs.js';
import sharpOptimizeImages from 'gulp-sharp-optimize-images';

export const copyImages = (cb) => {
  const fileExtensionsList = '{png,jpg,jpeg,svg,gif,webp}';
  const copiedImages = [];

  copiedImages.push(`src/assets/images/*.${fileExtensionsList}`);

  const addBlockImages = (blockName) => {
    const blockPath = findBlockPath(blockName);
    const imgPath = join('src/components', blockPath, 'img');

    if (fileExist(imgPath)) {
      const normalizedPath = `${imgPath.replace(/\\/g, '/')}/*.${fileExtensionsList}`;
      copiedImages.push(normalizedPath);
    }
  };

  blocksFromHtml.forEach((blockName) => {
    addBlockImages(blockName);
  });

  config.alwaysAddBlocks.forEach((blockName) => {
    addBlockImages(blockName);
  });

  if (copiedImages.length) {
    return gulp.src(copiedImages, {
      encoding: false,
      allowEmpty: true
    })
      .pipe(sharpOptimizeImages(sharpOptimizeImagesConfig))
      .pipe(gulp.dest('build/images'));
  } else {
    return cb();
  }
};

export const copySingleImage = (filePath) => gulp.src(filePath, {
  encoding: false,
  allowEmpty: true
})
  .pipe(sharpOptimizeImages(sharpOptimizeImagesConfig))
  .pipe(gulp.dest('build/images'));
