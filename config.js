export default {
  ignoredBlocks: [
    // 'no-js',
  ],
  alwaysAddBlocks: [
    // 'sprite-svg',
  ],
  addStyle: [
    "src/scss/variables.scss",
    "src/scss/mixins.scss",
    "src/scss/functions.scss",
    "src/scss/fonts.scss",
    "src/scss/normalize.scss",
    "src/scss/headings.scss",
    "src/scss/utils.scss",
    // 'src/scss/vendor/lenis.scss',
    // 'node_modules/aos/src/sass/aos',
    // 'node_modules/swiper/swiper-bundle',
    // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  addJsBefore: [
    // './utils/some.js',
    // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  addJsAfter: ["./index.js"],
  addAssets: {
    "src/fonts/**": "fonts/",
    // 'src/resources/**': '/',
    // 'src/favicon/**': 'favicons/',
    // 'node_modules/somePackage/images/**': 'images/',
  },
};
