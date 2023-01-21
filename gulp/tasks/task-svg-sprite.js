import gulp from 'gulp';
import gulpSvgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import config from '../../config.js';
import { fileExist } from '../utils/file-exist.js';

const generateSvgSprite = (cb) => {
  const spriteSvgPath = 'src/blocks/sprite-svg/svg/';

  if (config.alwaysAddBlocks.indexOf('sprite-svg') > -1 && fileExist(spriteSvgPath)) {
    return gulp.src(`${spriteSvgPath }*.svg`)
      .pipe(plumber())
      .pipe(
        cheerio({
          run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
          },
          parserOptions: { xmlMode: true }
        })
      )
      .pipe(replace('&gt;', '>'))
      .pipe(gulpSvgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg'
          }
        }
      }))
      .pipe(gulp.dest('src/blocks/sprite-svg/img/'));
  } else {
    cb();
  }
};

export { generateSvgSprite };
