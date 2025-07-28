import gulp from 'gulp';
import sharpResponsive from 'gulp-sharp-responsive';

const TARGET_FORMATS = [undefined, 'webp'];
const FILE_EXTENSIONS = ['png', 'jpg', 'jpeg'];

function createOptionsFormat() {
  const formats = [];

  for (const format of TARGET_FORMATS) {
    formats.push(
      {
        format,
        jpegOptions: {
          progressive: true,
        },
        pngOptions: {
          adaptiveFiltering: true,
          palette: true,
        },
      },
    );
  }

  return { formats };
}

export const optimizeImages = () => gulp.src(`build/images/*.{${FILE_EXTENSIONS.join(',')}}`, {
  encoding: false,
  allowEmpty: true
})
  .pipe(sharpResponsive(createOptionsFormat()))
  .pipe(gulp.dest('build/images'));
