import htmlhint from 'gulp-htmlhint';
import gulp from 'gulp';

export const lintHTML = () =>
  gulp.src(['build/**/*.html', '!build/sitemap.html'])
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());
