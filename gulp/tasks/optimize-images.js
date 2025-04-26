import gulp from 'gulp';
import sharpOptimizeImages from 'gulp-sharp-optimize-images';
import { sharpOptimizeImagesConfig } from '../configs.js';

export const optimizeImages = () => {
  const fileExtensionsList = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'];

  return gulp.src([`build/images/**/*.{${ fileExtensionsList.join(',') }}`], {
    encoding: false,
    allowEmpty: true,
    since: gulp.lastRun(optimizeImages)
  })
    .pipe(sharpOptimizeImages(sharpOptimizeImagesConfig))
    .pipe(gulp.dest('build/images'));
};
