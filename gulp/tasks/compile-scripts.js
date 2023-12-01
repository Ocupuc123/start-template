/* eslint-disable no-undef */
import { createGulpEsbuild } from 'gulp-esbuild';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';

export const compileScripts = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const gulpEsbuild = createGulpEsbuild({ incremental: isDevelopment });

  return gulp.src('src/js/entry.js')
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>'
      })
    }))
    .pipe(gulpEsbuild({
      bundle: true,
      outfile: 'scripts.min.js',
      format: 'esm',
      // splitting: true,
      platform: 'browser',
      minify: isProduction,
      sourcemap: isDevelopment,
      target: browserslistToEsbuild(),
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(browsersync.stream());
};
