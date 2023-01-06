import gulp from 'gulp';
import clean from './gulp/tasks/task-clean.js';
import { browserSync } from './gulp/tasks/task-browser-sync.js';
import { pugMixins } from './gulp/tasks/task-pug-mixins.js';
import { pugToHtmlFast } from './gulp/tasks/task-pug-to-html.js';
import { styles } from './gulp/tasks/task-styles.js';
import { copyAssets } from './gulp/tasks/task-copy-assets.js';
import { svgSprite } from './gulp/tasks/task-svg-sprite.js';
import { images } from './gulp/tasks/task-images.js';
import { scripts } from './gulp/tasks/task-scripts.js';
import { writeSassImportsFile } from './gulp/tasks/task-sass-imports.js';
import { writeJsImportsFile } from './gulp/tasks/task-js-imports.js';

const build = gulp.series(
  gulp.parallel(clean, pugMixins),
  gulp.parallel(pugToHtmlFast, copyAssets, svgSprite),
  gulp.parallel(images, writeSassImportsFile, writeJsImportsFile),
  gulp.parallel(styles,scripts)
);

const development = gulp.series(build, browserSync);
const production = build;

export { development, production };
