/* global process */

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import browsersync from 'browser-sync';

export const compileScripts = () => gulp.src('src/js/entry.js')
  .pipe(plumber())
  .pipe(webpackStream({
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    plugins: [
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),
    ],
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    output: {
      filename: 'main.js'
    }
  }))
  .pipe(gulp.dest('build/js'))
  .on('end', browsersync.reload);
