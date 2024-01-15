export default {
  'ignoredBlocks': [
    // 'no-js',
  ],
  'alwaysAddBlocks': [
    // 'sprite-svg',
  ],
  'addStyle': [
    'src/scss/variables.scss',
    'src/scss/mixins/form-mixins.scss',
    'src/scss/mixins/helpers.scss',
    'src/scss/fonts.scss',
    'src/scss/normalize.scss',
    'src/scss/headings.scss',
    'src/scss/utils.scss',
    // 'src/scss/libs/lenis.scss',
    // 'node_modules/aos/src/sass/aos',
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
    'src/fonts/**': 'fonts/',
    // 'src/resources/**': '/',
    // 'src/favicon/**': 'favicons/',
    // 'node_modules/somePackage/images/**': 'images/',
  },
  'settings': {
    'useWebpConverter': false,
    'imageminQuality': 90,
  }
};
