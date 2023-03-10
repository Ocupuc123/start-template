import gulp from 'gulp';
import gulpSvgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import config from '../../config.js';
import { fileExist } from '../utils.js';

export const generateSvgSprite = (cb) => {
  const spriteSvgPath = 'src/blocks/sprite-svg/svg/';

  if (config.alwaysAddBlocks.indexOf('sprite-svg') > -1 && fileExist(spriteSvgPath)) {
    return gulp.src(`${spriteSvgPath }*.svg`)
      .pipe(plumber())
      .pipe(gulpSvgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg'
          }
        }
      }))
      .pipe(gulp.dest('build/images/'));
  } else {
    cb();
  }
};
