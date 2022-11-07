/* global process */

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import browsersync from 'browser-sync';

const scripts = () => gulp.src('src/js/main.js')
  .pipe(plumber())
  .pipe(webpack({
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    output: {
      filename: 'main.js'
    }
  }))
  .pipe(gulp.dest('build/js'))
  .on('end', browsersync.reload);

export { scripts };
