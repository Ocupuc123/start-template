import { Buffer } from 'node:buffer';
import through from 'through2';
import getClassesFromHtml from 'get-classes-from-html';
import config from '../../config.js';

const blocksFromHtml = [];

export const getUsedBlocks = () => [...blocksFromHtml];

export const resetUsedBlocks = () => {
  blocksFromHtml.length = 0;
};

export const getClassesToBlocksList = () => through.obj(function(file, enc, cb) {
  if (file.isNull()) {
    return cb(null, file);
  }

  try {
    const content = file.contents.toString();
    const classesInFile = getClassesFromHtml(content);

    classesInFile.forEach((className) => {
      if (
        !className.includes('__') &&
        !className.includes('--') &&
        !config.ignoredBlocks.includes(className) &&
        !blocksFromHtml.includes(className)
      ) {
        blocksFromHtml.push(className);
      }
    });

    config.alwaysAddBlocks.forEach((block) => {
      if (!blocksFromHtml.includes(block)) {
        blocksFromHtml.push(block);
      }
    });

    file.contents = Buffer.from(content);
    this.push(file);
  } catch (err) {
    console.error(`Error processing file ${file.path}:`, err);
    return cb(new Error(`Failed to process file: ${file.path}`));
  }

  cb();
});
