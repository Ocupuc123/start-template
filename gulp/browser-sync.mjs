import gulp from 'gulp';
import server from 'browser-sync';
import { pugMixins } from './pug-mixins.mjs';
import { pugToHtml } from './pug-to-html.mjs';
import { styles } from './styles.mjs';
import { fonts } from './fonts.mjs';
import { resources } from './resources.mjs';
import { svgSprite } from './svg-sprite.mjs';
import { images } from './images.mjs';
import { favicons } from './favicons.mjs';
import { scripts } from './scripts.mjs';
import { writeScssImportsFile } from './write-sass-imports-file.mjs';

const browserSync = (callback) => {
  server.init({
    server: 'build',
    notify: false,
    cors: true
  });

  gulp.watch(['src/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(pugMixins, pugToHtml, writeScssImportsFile));
  gulp.watch('src/**/*.scss', gulp.series(styles));
  gulp.watch('src/**/*.js', gulp.series(scripts));
  gulp.watch('src/fonts/**/*.*', gulp.series(fonts));
  gulp.watch('src/resources/**/*.*', gulp.series(resources));
  gulp.watch('src/images/icons/svg/*.svg', gulp.series(svgSprite));
  gulp.watch('src/images/favicons/*.png', gulp.series(favicons));
  gulp.watch(['src/images/**/*.{gif,jpg,png,webp,svg}', '!src/images/favicons/*.png', '!src/images/icons/svg/*.svg'], gulp.series(images));

  return callback();
};

export { browserSync };
