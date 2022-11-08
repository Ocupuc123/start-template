import gulp from 'gulp';
import plumber from 'gulp-plumber';
import filter from 'gulp-filter';
import sassGlob from 'gulp-sass-glob';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import browsersync from 'browser-sync';

const sass = gulpSass(dartSass);

const bootstrapStyles = ()=> gulp.src('src/scss/bootstrap/bootstrap.scss')
  .pipe(plumber())
  .pipe(filter('src/scss/bootstrap/bootstrap.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({ cascade: true }))
  .pipe(cleanCSS({ compatibility: '*', level: 2 }))
  .pipe(rename({ dirname: 'css' }))
  .pipe(gulp.dest('build'))
  .pipe(browsersync.stream());

export { bootstrapStyles };
