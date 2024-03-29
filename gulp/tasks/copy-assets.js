import cpy from 'cpy';
import config from '../../config.js';

export const copyAssets = ((cb) => {
  for (const item in config.addAssets) {
    const dest = `build/${config.addAssets[item]}`;
    cpy(item, dest);
  }
  cb();
});
