/* global process */

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
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

const sass = gulpSass(dartSass);

export const compileSass = ()=> gulp.src('src/scss/main.scss')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'SASS',
      message: 'Error: <%= error.message %>'
    })
  }))
  .pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
  .pipe(sassGlob())
  .pipe(sass(gulpif(process.env.NODE_ENV === 'production', { outputStyle: 'compressed' })))
  .pipe(gulpif(process.env.NODE_ENV === 'production', mqpacker()))
  .pipe(autoprefixer({ cascade: true, }))
  .pipe(gulpif(process.env.NODE_ENV === 'production', cleanCSS({ compatibility: '*', level: 2 })))
  .pipe(rename({ dirname: 'css' }))
  .pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.write()))
  .pipe(gulp.dest('build'))
  .pipe(browsersync.stream());
