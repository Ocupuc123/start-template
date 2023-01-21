import cpy from 'cpy';
import blocksFromHtml from '../utils/blocks-from-html.js';
import config from '../../config.js';
import { fileExist } from '../utils/file-exist.js';

const copyImages = (cb) => {
  const copiedImages = [];

  blocksFromHtml.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.{png,jpg,jpeg,svg}`);
    }
  });

  config.alwaysAddBlocks.forEach((block) => {
    const src = `src/blocks/${block}/img`;
    if (fileExist(src)) {
      copiedImages.push(`${src}/*.{png,jpg,jpeg,svg}`);
    }
  });

  if(copiedImages.length) {
    (async () => {
      await cpy(copiedImages, 'build/images');
      cb();
    })();
  } else {
    cb();
  }
};

export { copyImages };
