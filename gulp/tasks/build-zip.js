import gulp from 'gulp';
import zip from 'gulp-zip';
import { deleteAsync } from 'del';
import process from 'node:process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const cleanZip = () => deleteAsync(['build/*.zip']);

const buildZip = () => {
  const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json')));
  const projectName = packageJson.name;
  const zipFileName = `${projectName}-${new Date().toISOString().slice(0,10)}.zip`;

  return gulp.src('build/**/*', { base: 'build' })
    .pipe(zip(zipFileName))
    .pipe(gulp.dest('build'));
};

export const archive = gulp.series(
  cleanZip,
  buildZip
);
