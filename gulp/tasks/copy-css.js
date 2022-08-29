export const copyCss = () => {
  return app.gulp.src(app.path.src.css).pipe(app.gulp.dest(app.path.build.css));
}
