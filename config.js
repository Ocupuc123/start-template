export default {
  'ignoredBlocks': [
    // 'no-js',
  ],
  'alwaysAddBlocks': [
    // 'sprite-svg',
    // 'slideout',
    // 'form-validation'
    // 'aos'
  ],
  'addStyle': [
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    'src/scss/functions.scss',
    'src/scss/fonts.scss',
    'src/scss/normalize.scss',
    // 'node_modules/swiper/swiper-bundle',
    // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  'addJsBefore': [
    // './utils/some.js',
    // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  'addJsAfter': [
    './main.js',
  ],
  'addAssets': {
    'src/fonts/*.*': 'fonts/',
    // 'src/resources/mail.*': '/',
    // 'src/resources/phpmailer/*.*': 'phpmailer/',
    // 'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'images/favicon/',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'images/',
  },
};
