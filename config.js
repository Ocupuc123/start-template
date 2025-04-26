export default {
  ignoredBlocks: [
    // 'no-js',
  ],
  alwaysAddBlocks: [
    // 'tippy',
  ],
  addStyle: [
    'src/styles/settings/variables.scss',
    'src/styles/base/normalize.scss',
    'src/styles/utils/mixins.scss',
    'src/styles/utils/functions.scss',
    'src/styles/utils/utils.scss',
    'src/styles/typograhpy/fonts.scss',
    'src/styles/typograhpy/headings.scss',
    'node_modules/swiper/swiper-bundle',
    // 'node_modules/tippy.js/dist/tippy',
    // 'node_modules/@fancyapps/ui/dist/fancybox/fancybox',
    // 'node_modules/aos/src/sass/aos',
  ],
  addJsBefore: [
    // './utils/some.js',
    // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  addJsAfter: ['./index.js'],
  addAssets: {
    'src/assets/fonts/**/*.{woff,woff2}': 'fonts/',
    'src/assets/images/**/*.{jpg,jpeg,png,gif,webp,svg}': 'images/',
    'src/assets/favicons/**/*.{png,ico,svg,xml,webmanifest}': 'favicons/',
    // 'node_modules/somePackage/images/**': 'images/',
  },
};
