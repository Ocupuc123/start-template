import gulp from 'gulp';
import { stacksvg } from 'gulp-stacksvg';

export const createSvgStack = () => gulp.src('src/assets/icons/**/*.svg')
  .pipe(stacksvg())
  .pipe(gulp.dest('build/icons'));
