import gulp from 'gulp';
import { browserSync } from './gulp/tasks/browser-sync.js';
import { cleanBuildDirectory } from './gulp/tasks/clean-build-directory.js';
import { compileSass } from './gulp/tasks/compile-sass.js';
import { compileScripts } from './gulp/tasks/compile-scripts.js';
import { compilePug } from './gulp/tasks/compile-pug.js';
import { copyAssets } from './gulp/tasks/copy-assets.js';
import { copyImages } from './gulp/tasks/copy-images.js';
import { getBlocksFromHtml } from './gulp/tasks/get-blocks-from-html.js';
import { optimizeImages } from './gulp/tasks/optimize-images.js';
import { writePugMixinsFile } from './gulp/tasks/write-pug-mixins-file.js';
import { writeSassImportsFile } from './gulp/tasks/write-sass-imports-file.js';
import { writeJsImportsFile } from './gulp/tasks/write-js-imports-file.js';
import { archive } from './gulp/tasks/build-zip.js';

const build = gulp.series(
  gulp.parallel(cleanBuildDirectory, writePugMixinsFile),
  gulp.parallel(compilePug, getBlocksFromHtml, copyAssets),
  gulp.parallel(optimizeImages, copyImages, writeSassImportsFile, writeJsImportsFile),
  gulp.parallel(compileSass, compileScripts),
);

export const development = gulp.series(build, browserSync);
export const production = build;
export const optimize = gulp.series(getBlocksFromHtml, optimizeImages);
export const buildArchive = archive;
