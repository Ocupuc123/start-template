import gulp from 'gulp';
import browsersync from 'browser-sync';

const fonts = () => gulp.src('src/fonts/**/*.*')
  .pipe(gulp.dest('build/fonts'))
  .on('end', browsersync.reload);

export { fonts };
