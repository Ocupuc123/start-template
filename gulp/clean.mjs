import { deleteAsync } from 'del';

export default function clean(callback) {
  return deleteAsync('build/*').then(() => {
    callback();
  });
}
