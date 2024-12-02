import gulp from 'gulp';
import notify from 'gulp-notify';
import gulpSvgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import config from '../../config.js';
import { fileExist } from '../utils.js';
import { SvgSpriteConfig } from '../configs.js';

export const generateSvgSprite = (cb) => {
  const spriteSvgPath = 'src/blocks/sprite-svg/svg/';

  if (config.alwaysAddBlocks.indexOf('sprite-svg') > -1 && fileExist(spriteSvgPath)) {
    return gulp.src(`${spriteSvgPath }*.svg`)
      .pipe(
        plumber({
          errorHandler: notify.onError({
            title: 'SVG',
            message: 'Error: <%= error.message %>',
          }),
        }),
      )
      .pipe(gulpSvgSprite(SvgSpriteConfig))
      .pipe(gulp.dest('build/images/'));
  } else {
    cb();
  }
};
