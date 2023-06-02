export default {
  'useBootstrap': true,
  'ignoredBlocks': [
    // 'no-js',
  ],
  'alwaysAddBlocks': [
    'sprite-svg',
    'slideout'
    // 'aos'
  ],
  'addStyle': [
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    'src/scss/functions.scss',
    'src/scss/fonts.scss',
    'src/scss/normalize.scss',
  ],
  'addJsBefore': [
    // './utils/some.js',
  ],
  'addJsAfter': [
    './main.js',
  ],
  'addAssets': {
    'src/fonts/*.*': 'fonts/',
    'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'images/favicon/',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'images/',
  },
};
