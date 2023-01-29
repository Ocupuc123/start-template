import { deleteAsync } from 'del';

export const cleanBuildDirectory = (cb) => deleteAsync('build/*').then(() => {
  cb();
});
