import gulp from 'gulp';
import { browserSync } from './gulp/tasks/task-browser-sync.js';
import { cleanBuildDirectory } from './gulp/tasks/task-clean-build-directory.js';
import { compileSass } from './gulp/tasks/task-compile-sass.js';
import { compileScripts } from './gulp/tasks/task-compile-scripts.js';
import { compilePugFast } from './gulp/tasks/task-compile-pug-fast.js';
import { copyAssets } from './gulp/tasks/task-copy-assets.js';
import { copyImages } from './gulp/tasks/task-copy-images.js';
import { writePugMixinsFile } from './gulp/tasks/task-write-pug-mixins-file.js';
import { writeSassImportsFile } from './gulp/tasks/task-write-sass-imports-file.js';
import { writeJsImportsFile } from './gulp/tasks/task-write-js-imports-file.js';
import { generateSvgSprite } from './gulp/tasks/task-generate-svg-sprite.js';

const build = gulp.series(
  gulp.parallel(cleanBuildDirectory, writePugMixinsFile),
  gulp.parallel(compilePugFast, copyAssets, generateSvgSprite),
  gulp.parallel(copyImages, writeSassImportsFile, writeJsImportsFile),
  gulp.parallel(compileSass, compileScripts)
);

const development = gulp.series(build, browserSync);
const production = build;

export { development, production };
