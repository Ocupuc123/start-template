import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpackStream from 'webpack-stream';
import webpackConfig from '../../webpack.config.js';
import browsersync from 'browser-sync';

export const compileScripts = () => gulp.src('src/js/entry.js')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'JS',
      message: 'Error: <%= error.message %>'
    })
  }))
  .pipe(webpackStream(webpackConfig))
  .pipe(gulp.dest('build/js'))
  .on('end', browsersync.reload);
