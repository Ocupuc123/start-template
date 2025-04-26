import { showMore } from '../vendor/show-more.js';

new showMore('.list', {
  config: {
    type: 'list',
    element: 'div',
    limit: 6,
    more: 'Показать больше',
    less: 'Скрыть'
  }
});
