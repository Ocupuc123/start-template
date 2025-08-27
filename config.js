export default {
  projectName: 'project-name',
  ignoredBlocks: [
    // 'no-js',
  ],
  alwaysAddBlocks: [
    // 'tippy',
  ],
  addStyle: [
    'src/styles/variables.scss',
    'src/styles/mixins.scss',
    'src/styles/functions.scss',
    'src/styles/global.scss',
    'src/styles/fonts.scss',
    '../../node_modules/normalize.css/normalize'
    // '../../node_modules/swiper/swiper-bundle',
    // '../../node_modules/tippy.js/dist/tippy',
    // '../../node_modules/@fancyapps/ui/dist/fancybox/fancybox',
    // '../../node_modules/aos/src/sass/aos',
  ],
  addJsBefore: [
    // './utils/some.js',
    // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  addJsAfter: ['./index.js'],
  addAssets: {
    'src/assets/fonts/**/*.{woff,woff2}': 'fonts/',
    'src/assets/favicons/**/*.{png,ico,svg,xml,webmanifest}': 'favicons/',
    // 'node_modules/somePackage/images/**': 'images/',
  },
};
