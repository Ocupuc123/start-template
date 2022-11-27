const config = {
  'ignoredBlocks': [
    'no-js',
  ],
  'alwaysAddBlocks': [
    // 'burger',
    // 'logo',
  ],
  'addStyle': [
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    'src/scss/functions.scss',
    'src/scss/fonts.scss',
    'src/scss/normalize.scss',
    // 'node_modules/slick-carousel/slick/slick.css',
  ],
  'addJsBefore': [
    './modules/is-webp.js',
  ],
  'addJsAfter': [
    './main.js',
  ],
  'addAssets': {
    // 'src/img/demo-*.{png,svg,jpg,jpeg}': 'img/',
    // 'src/fonts/demo-empty-open-sans.woff2': 'fonts/',
    // 'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },
};

export default config;
