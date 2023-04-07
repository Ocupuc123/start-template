import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import sassGlob from 'gulp-sass-glob';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import browsersync from 'browser-sync';

const sass = gulpSass(dartSass);

export const compileBootstrapSass = ()=> gulp.src('src/blocks/bootstrap/bootstrap.scss')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'SASS',
      message: 'Error: <%= error.message %>'
    })
  }))
  .pipe(sassGlob())
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(autoprefixer({ cascade: true, }))
  .pipe(cleanCSS({ compatibility: '*', level: 2 }))
  .pipe(rename({ dirname: 'css' }))
  .pipe(gulp.dest('build'))
  .pipe(browsersync.stream());
