// import { showMore } from './vendors/show-more.js';
import { useDynamicAdapt } from './vendors/dynamic-adapt.js';
// import Swiper from 'swiper/bundle';
// import HandyCollapse from 'handy-collapse';
// import Slideout from 'slideout';
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

  // const slideoutToggleButtonElement = document.querySelector('.slideout-toggler');
  // const slideoutCloseButtonElement = document.querySelector('.slideout-close');

  // const slideoutInit = new Slideout({
  //   'panel': document.querySelector('.page__slideout-panel'),
  //   'menu': document.querySelector('.page__slideout-menu'),
  //   'padding': 256,
  //   'tolerance': 70,
  //   'side': 'right',
  // });

  // slideoutToggleButtonElement.addEventListener('click', () => {
  //   slideoutInit.toggle();
  // });

  // slideoutCloseButtonElement.addEventListener('click', () => {
  //   slideoutInit.close();
  // });

});
