import { deleteAsync } from 'del';

const clean = (callback) => deleteAsync('build/*').then(() => {
  callback();
});

export default clean;
