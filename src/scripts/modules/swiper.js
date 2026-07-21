/* eslint-disable no-unused-vars */
import Swiper from 'swiper';
// import {Navigation, Pagination} from 'swiper/modules';

export const initSwiper = () => {
  const newSlider = new Swiper('.swiper', {
    // modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 800,
    enabled: true,
    // breakpoints: {
    //   1280: {
    //     enabled: true,
    //   },
    // },
    a11y: {
      enabled: false,
    },
  });
};
