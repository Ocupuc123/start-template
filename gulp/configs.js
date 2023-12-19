/* eslint-disable camelcase */
export const PrettyHtmlConfig = {
  indent_size: 2,
  preserve_newlines: true,
  end_with_newline: true,
};

export const ServerConfig = {
  server: 'build/',
  notify: false,
  cors: true,
  ui: false,
  open: false
};

export const SvgSpriteConfig = {
  shape: {
    transform: [{
      svgo: {
        plugins: [
          'preset-default',
          {
            name: 'removeAttrs',
            params: {
              attrs: '(fill|stroke)'
            },
          },
        ]
      }
    }]
  },
  mode: {
    symbol: {
      sprite: '../sprite.svg'
    }
  }
};
