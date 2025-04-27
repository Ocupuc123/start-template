import gulp from 'gulp';
import zip from 'gulp-zip';
import { deleteAsync } from 'del';
import config from '../../config.js';

const cleanZip = () => deleteAsync(['build/*.zip']);

const buildZip = () => {
  const projectName = config.projectName;
  const zipFileName = `${projectName}-${new Date().toISOString().slice(0,10)}.zip`;

  return gulp.src('build/**/*', { base: 'build' })
    .pipe(zip(zipFileName))
    .pipe(gulp.dest('build'));
};

export const archive = gulp.series(
  cleanZip,
  buildZip
);
