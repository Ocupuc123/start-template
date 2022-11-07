import gulp from 'gulp';
import server from 'browser-sync';
import { pugMixins } from './pug-mixins.mjs';
import { pugToHtml } from './pug-to-html.mjs';
import { styles } from './styles.mjs';
import { bootstrapStyles } from './bootstrap-styles.mjs';
import { vendorsCss, vendorsJs } from './vendors.mjs';
import { fonts } from './fonts.mjs';
import { resources } from './resources.mjs';
import { svgSprite } from './svg-sprite.mjs';
import { images } from './images.mjs';
import { favicons } from './favicons.mjs';
import { scripts } from './scripts.mjs';

const browserSync = (callback) => {
  server.init({
    server: 'build',
    notify: false,
    cors: true
  });

  gulp.watch('src/vendors/**/*.*', gulp.series(vendorsCss, vendorsJs));
  gulp.watch(['src/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(pugMixins, pugToHtml));
  gulp.watch(['src/**/*.scss', '!src/scss/bootstrap/*.scss'], gulp.series(styles));
  gulp.watch('src/scss/bootstrap/variables.scss', gulp.series(bootstrapStyles));
  gulp.watch('src/fonts/**/*.*', gulp.series(fonts));
  gulp.watch('src/resources/**/*.*', gulp.series(resources));
  gulp.watch('src/images/icons/svg/*.svg', gulp.series(svgSprite));
  gulp.watch('src/images/favicons/*.png', gulp.series(favicons));
  gulp.watch(['src/images/**/*.{gif,jpg,png,webp}', '!src/images/favicons/*.png', '!src/images/icons/svg/*.svg'], gulp.series(images));
  gulp.watch('src/**/*.js', gulp.series(scripts));

  return callback();
};

export { browserSync };
