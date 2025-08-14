import gulp from 'gulp';
import config from '../../config.js';
import { fileExist, findBlockPath } from '../utils.js';
import { blocksFromHtml } from './get-blocks-from-html.js';
import { join } from 'node:path';
import path from 'node:path';
import gulpif from 'gulp-if';
import flatten from 'gulp-flatten';
import sharpResponsive from 'gulp-sharp-responsive';

const TARGET_FORMATS = [undefined, 'webp'];
const FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'];
const EXCLUDE_EXTENSIONS = ['.svg', '.gif', '.webp'];

function createOptionsFormat() {
  const formats = [];

  for (const format of TARGET_FORMATS) {
    formats.push(
      {
        format,
        jpegOptions: {
          progressive: true,
        },
        pngOptions: {
          adaptiveFiltering: true,
          palette: true,
        },
      },
    );
  }

  return { formats };
}

export const copyImages = (cb) => {
  const copiedImages = [];

  copiedImages.push(`src/assets/images/*.{${FILE_EXTENSIONS.join(',')}}`);

  const addBlockImages = (blockName) => {
    const blockPath = findBlockPath(blockName);
    const imgPath = join('src/components', blockPath, 'img');

    if (fileExist(imgPath)) {
      FILE_EXTENSIONS.forEach((ext) => {
        copiedImages.push(`${imgPath.replace(/\\/g, '/')}/*.${ext}`);
      });
    }
  };

  blocksFromHtml.forEach((blockName) => {
    addBlockImages(blockName);
  });

  config.alwaysAddBlocks.forEach((blockName) => {
    addBlockImages(blockName);
  });

  if (copiedImages.length) {
    return gulp.src(copiedImages, {
      encoding: false,
      allowEmpty: true
    })
      .pipe(gulp.dest('build/images'));
  } else {
    return cb();
  }
};

export const copySingleImage = (filePath) => gulp.src(filePath, {
  encoding: false,
  allowEmpty: true,
  base: 'src'
})
  .pipe(gulpif(
    (file) => !EXCLUDE_EXTENSIONS.includes(path.extname(file.path).toLowerCase()),
    sharpResponsive(createOptionsFormat()),
  ))
  .pipe(flatten())
  .pipe(gulp.dest('build/images'));
