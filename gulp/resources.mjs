import gulp from 'gulp';
import browsersync from 'browser-sync';

const resources = () => gulp.src('src/resources/**/*.*')
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { resources };
