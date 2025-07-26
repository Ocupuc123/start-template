import { rmSync } from 'node:fs';

export const cleanBuildDirectory = (done) => {
  rmSync('build/', {
    force: true,
    recursive: true,
  });
  done();
};
