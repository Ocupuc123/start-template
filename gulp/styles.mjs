import gulp from 'gulp';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import sassGlob from 'gulp-sass-glob';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import webpcss from 'gulp-webpcss';
import rename from 'gulp-rename';
import mqpacker from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import browsersync from 'browser-sync';

const sass = gulpSass(dartSass);

const styles = ()=> gulp.src('src/scss/main.scss')
  .pipe(plumber())
  .pipe(filter('src/scss/main.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(mqpacker())
  .pipe(webpcss({
    webpClass: '.webp',
    noWebpClass: '.no-webp'
  }))
  .pipe(autoprefixer({
    cascade: true,
  }))
  .pipe(cleanCSS({ compatibility: '*', level: 2 }))
  .pipe(rename({ dirname: 'css' }))
  .pipe(gulp.dest('build'))
  .pipe(browsersync.stream());

export { styles };
