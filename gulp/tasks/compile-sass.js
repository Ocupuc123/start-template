import {isProduction, isDevelopment} from '../utils.js';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import sassGlob from 'gulp-sass-glob';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import mqpacker from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import browsersync from 'browser-sync';
import notify from 'gulp-notify';

const sass = gulpSass(dartSass);

export const compileSass = () => gulp.src('src/styles/main.scss')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'SASS',
      message: 'Error: <%= error.message %>'
    })
  }))
  .pipe(gulpif(isDevelopment, sourcemaps.init()))
  .pipe(sassGlob())
  .pipe(sass({
    quietDeps: true,
    silenceDeprecations: ['legacy-js-api', 'import'],
  }))
  .pipe(gulpif(isProduction, mqpacker()))
  .pipe(autoprefixer())
  .pipe(gulpif(isProduction, cleanCSS({ level: 2 })))
  .pipe(rename({ dirname: 'css' }))
  .pipe(gulpif(isDevelopment, sourcemaps.write()))
  .pipe(gulp.dest('build'))
  .pipe(browsersync.stream());
