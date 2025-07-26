import {createGulpEsbuild} from 'gulp-esbuild';
import {isDevelopment} from '../utils.js';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

export const compileScripts = () => {
  const gulpEsbuild = createGulpEsbuild({ incremental: isDevelopment });

  return gulp.src('src/scripts/entry.js')
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>'
      })
    }))
    .pipe(gulpEsbuild({
      bundle: true,
      outfile: 'scripts.js',
      platform: 'browser',
      minify: !isDevelopment,
      sourcemap: isDevelopment,
      target: browserslistToEsbuild(),
    }))
    .pipe(gulp.dest('build/js'));
};
