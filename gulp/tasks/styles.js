import dartSass from "sass";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

const templateStyles = () => {
  return app.gulp
    .src(app.path.src.templateScss)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(
      cleanCss({
        level: 1,
        format: "beautify",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};

const bootstrapStyles = () => {
  return app.gulp
    .src(app.path.src.bootstrapScss)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(
      cleanCss({
        level: 1,
        // format: "beautify",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}

export {templateStyles, bootstrapStyles}
