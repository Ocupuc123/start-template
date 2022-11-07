import gulp from 'gulp';
import clean from './gulp/clean.mjs';
import { browserSync } from './gulp/browser-sync.mjs';
import { pugMixins } from './gulp/pug-mixins.mjs';
import { pugToHtml } from './gulp/pug-to-html.mjs';
import { styles } from './gulp/styles.mjs';
import { bootstrapStyles } from './gulp/bootstrap-styles.mjs';
import { vendorsCss, vendorsJs } from './gulp/vendors.mjs';
import { fonts } from './gulp/fonts.mjs';
import { resources } from './gulp/resources.mjs';
import { svgSprite } from './gulp/svg-sprite.mjs';
import { images } from './gulp/images.mjs';
import { favicons } from './gulp/favicons.mjs';
import { scripts } from './gulp/scripts.mjs';

const build = gulp.series(clean, pugMixins, favicons, gulp.parallel(pugToHtml, styles, bootstrapStyles, svgSprite, images, fonts, vendorsCss, vendorsJs, resources, scripts));

const development = gulp.series(build, browserSync);
const production = build;

export { development, production };
