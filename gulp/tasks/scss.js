import dartSass from "sass";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(sassGlob())
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          overrideBrowserslist: ["defaults"],
          cascade: true,
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss({
          level: 2,
          // format: "beautify",
        })
      )
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: "." }))
    .pipe(app.plugins.browsersync.stream());
};
