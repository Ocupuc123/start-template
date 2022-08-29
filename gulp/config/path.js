// Получаем имя папки проекта
import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    js: `${srcFolder}/js/**/*.*`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    templateScss: `${srcFolder}/scss/template.scss`,
    bootstrapScss: `${srcFolder}/scss/bootstrap.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/resources/**/*.*`,
    css: `${srcFolder}/css/*.css`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.*`
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/**/*.scss`,
    bootstrapScss: `${srcFolder}/scss/_variables.scss`,
    svg: `${srcFolder}/svgicons/**/*.svg`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    files: `${srcFolder}/resources/**/*.*`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: '',
};
