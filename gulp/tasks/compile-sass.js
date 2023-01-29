import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sassGlob from 'gulp-sass-glob';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import mqpacker from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import browsersync from 'browser-sync';

const sass = gulpSass(dartSass);

export const compileSass = ()=> gulp.src('src/scss/main.scss')
  .pipe(plumber())
  .pipe(sassGlob())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(mqpacker())
  .pipe(autoprefixer({
    cascade: true,
  }))
  .pipe(cleanCSS({ compatibility: '*', level: 2 }))
  .pipe(rename({ dirname: 'css' }))
  .pipe(gulp.dest('build'))
  .pipe(browsersync.stream());
