import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { copyResources } from "./gulp/tasks/copy-resources.js";
import { copyJs } from "./gulp/tasks/copy-js.js";
import { copyFonts } from "./gulp/tasks/copy-fonts.js";
import { copyCss } from "./gulp/tasks/copy-css.js";
import { templateStyles, bootstrapStyles } from "./gulp/tasks/styles.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { images } from "./gulp/tasks/images.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.svg, svgSprite);
  gulp.watch(path.watch.scss, templateStyles);
  gulp.watch(path.watch.bootstrapScss, bootstrapStyles);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.js, copyJs);
}

const mainTasks = gulp.series(gulp.parallel(copyResources, copyJs, copyFonts, copyCss, templateStyles, bootstrapStyles, html, svgSprite, images));
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
export { dev };
export { build };
export { deployZIP };

gulp.task("default", dev);
