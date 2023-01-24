/* global Buffer */
import through from 'through2';
import getClassesFromHtml from 'get-classes-from-html';
import config from '../../config.js';

const blocksFromHtml = [];

const getClassesToBlocksList = () => through.obj(function (file, enc, cb) {
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  try {
    const data = file.contents
      .toString()
      .split('\n')
      .map((html) => {
        const fileContent = html;
        const classesInFile = getClassesFromHtml(fileContent);
        for (const item of classesInFile) {
          if ((item.indexOf('__') > -1) || (item.indexOf('--') > -1) || (blocksFromHtml.indexOf(item) + 1)) {
            continue;
          }
          if (config.ignoredBlocks.indexOf(item) + 1) {
            continue;
          }
          blocksFromHtml.push(item);
        }
        return html;
      })
      .join('\n');
    if (config.alwaysAddBlocks.length > 0) {
      for (const item of config.alwaysAddBlocks) {
        if (blocksFromHtml.indexOf(item) > -1) {
          continue;
        }
        blocksFromHtml.push(item);
      }
    }
    // eslint-disable-next-line no-console
    console.log(`---------- Used HTML blocks: ${blocksFromHtml.join(', ')}`);
    file.contents = new Buffer.from(data);
    this.push(file);
  } catch (err) {
    this.emit('error', new Error(err));
  }
  cb();
});

export { getClassesToBlocksList, blocksFromHtml };
