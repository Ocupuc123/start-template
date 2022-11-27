/* global Buffer */

import getClassesFromHtml from 'get-classes-from-html';
import through from 'through2';

let blocksFromHtml = [];

const getClassesToBlocksList = () => through.obj(function (file, enc, cb) {
  const blocksList = [];
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
          if ((item.indexOf('__') > -1) || (item.indexOf('--') > -1) || (blocksList.indexOf(item) + 1)) {
            continue;
          }
          blocksList.push(item);
        }
        return html;
      })
      .join('\n');
    blocksFromHtml = blocksList;
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
