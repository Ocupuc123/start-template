import gulp from 'gulp';
import clean from './gulp/clean.mjs';
import { browserSync } from './gulp/browser-sync.mjs';
import { pugMixins } from './gulp/pug-mixins.mjs';
import { pugToHtml, pugToHtmlFast } from './gulp/pug-to-html.mjs';
import { styles } from './gulp/styles.mjs';
import { fonts } from './gulp/fonts.mjs';
import { resources } from './gulp/resources.mjs';
import { svgSprite } from './gulp/svg-sprite.mjs';
import { images } from './gulp/images.mjs';
import { favicons } from './gulp/favicons.mjs';
import { scripts } from './gulp/scripts.mjs';
import { writeScssImportsFile } from './gulp/blocks-from-html.mjs';

const build = gulp.series(
  gulp.parallel(clean, pugMixins, pugToHtmlFast, favicons),
  gulp.parallel(pugToHtml, svgSprite, images, fonts, resources, writeScssImportsFile),
  gulp.parallel(styles,scripts)
);

const development = gulp.series(build, browserSync);
const production = build;

export { development, production };
