import gulp from 'gulp';
import cached from 'gulp-cached';
import browsersync from 'browser-sync';

const fonts = () => gulp.src('src/fonts/**/*.*')
  .pipe(cached('fontsCache'))
  .pipe(gulp.dest('build/fonts'))
  .on('end', browsersync.reload);

export { fonts };
