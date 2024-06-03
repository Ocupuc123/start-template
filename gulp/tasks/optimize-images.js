import gulp from 'gulp';
import sharpOptimizeImages from 'gulp-sharp-optimize-images';
import config from '../../config.js';
import { sharpOptimizeImagesConfig } from '../configs.js';
import { blocksFromHtml, fileExist} from '../utils.js';

export const optimizeImages = (cb) => {
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
    return gulp.src(copiedImages, { encoding: false })
      .pipe(sharpOptimizeImages(sharpOptimizeImagesConfig))
      .pipe(gulp.dest('build/images'));
  } else {
    cb();
  }
};
