import gulp from 'gulp';
import cached from 'gulp-cached';
import browsersync from 'browser-sync';

const vendorsCss = () => gulp.src('src/vendors/css/*.css')
  .pipe(cached('vendorsCssCache'))
  .pipe(gulp.dest('build/css'))
  .on('end', browsersync.reload);

const vendorsJs = () => gulp.src('src/vendors/js/*.js')
  .pipe(cached('vendorsJsCache'))
  .pipe(gulp.dest('build/js'))
  .on('end', browsersync.reload);

export { vendorsCss, vendorsJs };
