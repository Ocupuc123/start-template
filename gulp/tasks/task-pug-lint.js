import gulp from 'gulp';
import pugLinter from 'gulp-pug-linter';

const pugLint = () => gulp.src('src/**/*.pug', { since: gulp.lastRun(pugLint) })
  .pipe(pugLinter({ reporter: 'default' }));

export { pugLint };
