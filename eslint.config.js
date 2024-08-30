import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['src/js/vendor/**/*', 'build/**/*', 'node_modules/**/*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-template-curly-in-string': 'error',
      'no-use-before-define': ['error', {'functions': false}],
      'accessor-pairs': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'camelcase': 'error',
      'curly': 'error',
      'eqeqeq': ['error', 'always'],
      'no-alert': 'error',
      'no-console': 'error',
      'no-nested-ternary': 'error',
      'no-return-assign': 'error',
      'no-shadow': ['error', {'hoist': 'all'}],
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'radix': 'error',
      'strict': ['error', 'global'],
      'arrow-parens': 'error',
      'eol-last': 'error',
      'indent': ['error', 2, {
        SwitchCase: 1,
      }],
      'lines-between-class-members': ['error', 'always', {'exceptAfterSingleLine': true}],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-trailing-spaces': 'error',
      'quotes': ['error', 'single'],
      'semi': 'error',
      'semi-style': 'error',
      'space-infix-ops': 'error',
      'brace-style': ['error'],
      'space-in-parens': ['error'],
    },
  },
];
