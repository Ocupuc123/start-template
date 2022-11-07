import gulp from 'gulp';
import cached from 'gulp-cached';
import browsersync from 'browser-sync';

const resources = () => gulp.src('src/resources/**/*.*')
  .pipe(cached('resourcesCache'))
  .pipe(gulp.dest('build'))
  .on('end', browsersync.reload);

export { resources };
