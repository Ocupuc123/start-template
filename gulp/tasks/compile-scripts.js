import {createGulpEsbuild} from 'gulp-esbuild';
import {isProduction, isDevelopment} from '../utils.js';
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
      outfile: 'scripts.min.js',
      platform: 'browser',
      minify: isProduction,
      sourcemap: isDevelopment,
      target: browserslistToEsbuild(),
    }))
    .pipe(gulp.dest('build/js'));
};
