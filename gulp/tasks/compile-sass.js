import { isDevelopment } from '../utils.js';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postcssNormalize from 'postcss-normalize';
import lightningcss from 'postcss-lightningcss';
import combineMediaQuery from 'postcss-combine-media-query';
import browsersync from 'browser-sync';
import notify from 'gulp-notify';

const sass = gulpSass(dartSass);

export const compileSass = () =>
  gulp
    .src('src/styles/styles.scss')
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'SASS',
        message: 'Error: <%= error.message %>'
      })
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([
        postcssNormalize({
          forceImport: 'sanitize.css'
        }),
        combineMediaQuery(),
        lightningcss({
          lightningcssOptions: {
            minify: !isDevelopment,
          },
        }),
      ]),
    )
    .pipe(gulp.dest('build/css'))
    .pipe(browsersync.stream());
