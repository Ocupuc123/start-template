import gulp from 'gulp';
import gulpFavicons from 'gulp-favicons';
import plumber from 'gulp-plumber';

const favicons = () => gulp.src('src/images/favicons/favicon.png')
  .pipe(plumber())
  .pipe(gulpFavicons({
    appName: 'App',
    appShortName: 'App',
    appDescription: 'App description',
    url: 'http://localhost/',
    path: '/images/favicons/',
    replace: true,
    version: 3,
    lang: 'ru-RU',
    icons: {
      appleIcon: true,
      favicons: true,
      online: false,
      appleStartup: false,
      android: true,
      firefox: true,
      yandex: true,
      windows: true,
      coast: false
    }
  }))
  .pipe(gulp.dest('build/images/favicons'));

export { favicons };
