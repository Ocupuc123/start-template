export const copyResources = () => {
  return app.gulp.src(app.path.src.files).pipe(app.gulp.dest(app.path.build.html));
};
