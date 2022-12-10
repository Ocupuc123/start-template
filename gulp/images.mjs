import gulp from 'gulp';
import plumber from 'gulp-plumber';
import imagemin, {mozjpeg, optipng} from 'gulp-imagemin';
import browsersync from 'browser-sync';


const images = () => gulp.src(['src/images/**/*.{gif,png,jpg,jpeg,webp}', '!src/images/icons/**/*.*', '!src/images/favicons/**/*.*'])
  .pipe(plumber())
  .pipe(imagemin([
    mozjpeg({ quality: 90, progressive: true }),
    optipng({optimizationLevel: 1}),
  ]))
  .pipe(gulp.dest('build/images'))
  .pipe(gulp.src('src/images/*.svg'))
  .pipe(gulp.dest('build/images'))
  .on('end', browsersync.reload);

export { images };
