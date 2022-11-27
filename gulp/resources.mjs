import gulp from 'gulp';
import browsersync from 'browser-sync';

const resources = () => gulp.src(['src/resources/**/*.*', '!src/resources/readme.md'])
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { resources };
