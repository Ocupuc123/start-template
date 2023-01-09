const config = {
  'ignoredBlocks': [
    'no-js',
  ],
  'alwaysAddBlocks': [
    // 'form-validation',
    // 'logo',
  ],
  'addStyle': [
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    'src/scss/functions.scss',
    'src/scss/fonts.scss',
    'src/scss/normalize.scss',
    'node_modules/smartmenus/dist/css/sm-core-css',
  ],
  'addJsBefore': [
    // './utils/some.js',
  ],
  'addJsAfter': [
    './main.js',
  ],
  'addAssets': {
    'src/fonts/*.*': 'fonts/',
    'src/images/favicons/*.{png,ico,svg,xml,webmanifest}': 'images/favicons/',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'images/',
  },
};

export default config;
