import gulp from 'gulp';
import sharpOptimizeImages from 'gulp-sharp-optimize-images';
import config from '../../config.js';
import { sharpOptimizeImagesConfig } from '../configs.js';
import { fileExist, findBlockPath } from '../utils.js';
import { blocksFromHtml } from './get-blocks-from-html.js';
import { join } from 'node:path';

export const optimizeImages = (cb) => {
  const fileExtensionsList = '{png,jpg,jpeg,svg,gif,webp}';
  const imagesToOptimize = [];

  imagesToOptimize.push(`src/assets/images/*.${fileExtensionsList}`);

  const addBlockImages = (blockName) => {
    const blockPath = findBlockPath(blockName);
    const imgPath = join('src/components', blockPath, 'img');

    if (fileExist(imgPath)) {
      const normalizedPath = `${imgPath.replace(/\\/g, '/')}/*.${fileExtensionsList}`;
      imagesToOptimize.push(normalizedPath);
    }
  };

  blocksFromHtml.forEach((blockName) => {
    addBlockImages(blockName);
  });

  config.alwaysAddBlocks.forEach((blockName) => {
    addBlockImages(blockName);
  });

  if (imagesToOptimize.length) {
    return gulp.src(imagesToOptimize, {
      encoding: false,
      allowEmpty: true
    })
      .pipe(sharpOptimizeImages(sharpOptimizeImagesConfig))
      .pipe(gulp.dest('build/images'));
  } else {
    return cb();
  }
};
