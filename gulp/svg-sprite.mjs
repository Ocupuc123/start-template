import gulp from 'gulp';
import browsersync from 'browser-sync';
import gulpSvgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';


const svgSprite = () => gulp.src('src/images/icons/svg/*.svg')
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
      symbol: {
        sprite: '../sprite.svg',
        svg: {
          xmlDeclaration: false,
          doctypeDeclaration: false
        },
        render: {
          scss: {
            dest: '../../../src/scss/mixins/_sprite-svg.scss',
            template: 'src/scss/templates/_sprite_svg_template.scss'
          }
        }
      }
    }
  }))
  .pipe(gulp.dest('build/images'))
  .on('end', browsersync.reload);

export {svgSprite};
