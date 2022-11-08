import gulp from 'gulp';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import browsersync from 'browser-sync';


const images = () => gulp.src(['src/images/**/*.{gif,png,jpg,jpeg,webp}', '!src/images/icons/**/*.*', '!src/images/favicons/**/*.*'])
  .pipe(plumber())
  .pipe(webp())
  .pipe(gulp.dest('build/images'))
  .pipe(gulp.src(['src/images/**/*.{gif,png,jpg,jpeg,webp}', '!src/images/icons/**/*.*', '!src/images/favicons/**/*.*']))
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    optimizationLevel: 3
  }))
  .pipe(gulp.dest('build/images'))
  .pipe(gulp.src('src/images/*.svg'))
  .pipe(gulp.dest('build/images'))
  .on('end', browsersync.reload);

export { images };
