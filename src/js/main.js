// import { showMore } from './vendors/show-more.js';
import { useDynamicAdapt } from './vendors/dynamic-adapt.js';
// import Swiper from 'swiper/bundle';
// import HandyCollapse from 'handy-collapse';
// import 'img-comparison-slider';

document.addEventListener('DOMContentLoaded', () => {
  // new HandyCollapse({
  //   closeOthers: false
  // });

  // new showMore('.list', {
  //   config: {
  //     type: 'list',
  //     element: 'div',
  //     limit: 6,
  //     more: 'Показать больше',
  //     less: 'Скрыть'
  //   }
  // });

  useDynamicAdapt();

  // new Swiper('.swiper', {
  //   slidesPerView: 1,
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 2,
  //     },
  //     480: {
  //       slidesPerView: 3,
  //     },
  //     640: {
  //       slidesPerView: 4,
  //     }
  //   }
  // });

});
