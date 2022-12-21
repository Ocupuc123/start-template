import gulp from 'gulp';
import server from 'browser-sync';
import { pugMixins } from './pug-mixins.mjs';
import { pugToHtml } from './pug-to-html.mjs';
import { styles } from './styles.mjs';
import { svgSprite } from './svg-sprite.mjs';
import { images } from './images.mjs';
import { scripts } from './scripts.mjs';
import { writeSassImportsFile } from './write-sass-imports-file.mjs';
import { writeJsImportsFile } from './write-js-imports-file.mjs';

const browserSync = (callback) => {
  server.init({
    server: 'build',
    notify: false,
    cors: true
  });

  gulp.watch(['src/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(pugMixins, pugToHtml, writeSassImportsFile, writeJsImportsFile));
  gulp.watch('src/**/*.scss', gulp.series(styles));
  gulp.watch('src/**/*.js', gulp.series(scripts));
  gulp.watch('src/images/icons/svg/*.svg', gulp.series(svgSprite));
  gulp.watch(['src/images/**/*.{gif,jpg,png,jpeg,webp,svg}', '!src/images/favicons/*.*', '!src/images/icons/svg/*.svg'], gulp.series(images));

  return callback();
};

export { browserSync };
