import { deleteAsync } from 'del';

const cleanBuildDirectory = (callback) => deleteAsync('build/*').then(() => {
  callback();
});

export { cleanBuildDirectory };
