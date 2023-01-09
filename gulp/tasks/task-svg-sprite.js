import gulp from 'gulp';
import browsersync from 'browser-sync';
import gulpSvgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';


const svgSprite = () => gulp.src('src/images/icons/*.svg')
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
    shape: {
      dest: 'svgs'
    },
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(gulp.dest('build/images'))
  .on('end', browsersync.reload);

export {svgSprite};
