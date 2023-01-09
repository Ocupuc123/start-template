// import gulp from 'gulp';
// import plumber from 'gulp-plumber';
// import imagemin, {mozjpeg, optipng} from 'gulp-imagemin';
// import browsersync from 'browser-sync';
import { blocksFromHtml } from './task-pug-to-html.js';
import config from '../../config.js';
import cpy from 'cpy';
import { fileExist } from '../utils/file-exist.js';

const images = (cb) => {
  const copiedImages = [];
  blocksFromHtml.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.{png,jpg,jpeg,svg,gif}`);
    }
  });
  config.alwaysAddBlocks.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.{png,jpg,jpeg,svg,gif}`);
    }
  });
  if(copiedImages.length) {
    (async () => {
      await cpy(copiedImages, 'build/images');
      cb();
    })();
  }
  else {
    cb();
  }
};

// const images = () => gulp.src(['src/images/**/*.{gif,png,jpg,jpeg,webp}', '!src/images/icons/**/*.*', '!src/images/favicons/**/*.*'])
//   .pipe(plumber())
//   .pipe(imagemin([
//     mozjpeg({ quality: 80, progressive: true }),
//     optipng({optimizationLevel: 2}),
//   ]))
//   .pipe(gulp.dest('build/images'))
//   .pipe(gulp.src('src/images/*.svg'))
//   .pipe(gulp.dest('build/images'))
//   .on('end', browsersync.reload);

export { images };
