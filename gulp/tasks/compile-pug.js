/* global global */
import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import pug from "gulp-pug";
import prettyHtml from "gulp-pretty-html";
import emitty from "emitty";
import { getClassesToBlocksList } from "./get-blocks-from-html.js";
import { PrettyHtmlConfig } from "../configs.js";

const emittyPug = emitty.setup("src", "pug", { makeVinylFile: true });

export const compilePug = () => {
  return new Promise((resolve, reject) => {
    emittyPug.scan(global.emittyPugChangedFile).then(() => {
      return gulp
        .src("src/pages/**/*.pug")
        .pipe(
          plumber({
            errorHandler: notify.onError({
              title: "PUG",
              message: "Error: <%= error.message %>",
            }),
          }),
        )
        .pipe(emittyPug.filter(global.emittyPugChangedFile))
        .pipe(pug())
        .pipe(getClassesToBlocksList())
        .pipe(prettyHtml(PrettyHtmlConfig))
        .pipe(gulp.dest("build"))
        .on("end", () => resolve())
        .on("error", reject);
    });
  });
};
