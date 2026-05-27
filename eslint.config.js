import globals from 'globals';
import preset from 'eslint-config-htmlacademy/vanilla';

export default [
  ...preset,

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        noUiSlider: 'readonly',
        Pristine: 'readonly',
      },
    },
  },

  {
    ignores: [
      'build/',
      'node_modules/',
      'src/scripts/vendor/',
    ],
  },
];
