/* eslint-disable camelcase */
export const sharpOptimizeImagesConfig = {
  webp: {
    quality: 80,
    lossless: false,
    alsoProcessOriginal: false,
  },
  png_to_png: {
    progressive: true,
  },
  jpg_to_jpg: {
    mozjpeg: true,
    progressive: true,
  },
};

export const sharpWebpConfig = {
  webp: {
    quality: 80,
    lossless: false,
    alsoProcessOriginal: false,
  },
};

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
  open: false,
  ghostMode: false
};
