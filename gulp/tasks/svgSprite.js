import svgSprites from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";

export const svgSprite = () => {
  return app.gulp
    .src(`${app.path.src.svgicons}`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprites({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            // Создавать страницу с перечнем иконок
            example: false,
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`));
};
