// Swiper js =====================================================//
/* Документация плагина: https://swiperjs.com/ */
// Сниппет(HTML): g-swiper
// eslint-disable-next-line no-unused-vars
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

export default function sliderInit() {
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    spaceBetween: 30,
    slidesPerView: 1,
    watchSlidesProgress: true,
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      320: { slidesPerView: 2 },
      480: { slidesPerView: 3 },
      640: { slidesPerView: 4 },
    },
  });
}
