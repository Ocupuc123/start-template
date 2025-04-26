import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.swiper', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    speed: 800,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    a11y: {
      enabled: false,
    }
  });
});
