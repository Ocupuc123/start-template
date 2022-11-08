import gulp from 'gulp';
import browsersync from 'browser-sync';

const vendorsCss = () => gulp.src('src/vendors/css/*.css')
  .pipe(gulp.dest('build/css'))
  .on('end', browsersync.reload);

const vendorsJs = () => gulp.src('src/vendors/js/*.js')
  .pipe(gulp.dest('build/js'))
  .on('end', browsersync.reload);

export { vendorsCss, vendorsJs };
