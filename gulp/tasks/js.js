import webpackStream from 'webpack-stream';
import webpack from 'webpack';

export const js = () => app.gulp
  .src(app.path.src.js, { sourcemaps: app.isDev })
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>',
      }),
    ),
  )
  .pipe(
    webpackStream(
      {
        mode: app.isBuild ? 'production' : 'development',
        output: {
          filename: 'app.min.js',
        },
      },
      webpack,
    ),
  )
  .on('error', (err) => {
    this.emit('end');
  })
  .pipe(app.gulp.dest(app.path.build.js))
  .pipe(app.plugins.browsersync.stream());
