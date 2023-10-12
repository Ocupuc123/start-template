import Swiper from 'swiper/bundle';

const initSlidersScroll = () => {
  const fullScreen = document.querySelector('.full-screen');

  const setScrollType = (slider) => {
    if (slider.el.classList.contains('full-screen__is-freemode')) {
      slider.el.classList.remove('full-screen__is-freemode');
      slider.params.freeMode.enabled = false;
    }

    slider.slides.forEach((slide) => {
      const slideContent = slide.querySelector('.screen__content');

      if (slideContent) {
        const slideContentHeight = slideContent.offsetHeight;

        if (slideContentHeight > window.innerHeight) {
          slider.el.classList.add('full-screen__is-freemode');
          slider.params.freeMode.enabled = true;
        }
      }
    });
  };

  new Swiper(fullScreen, {
    wrapperClass: 'full-screen__wrapper',
    slideClass: 'full-screen__screen',
    direction: 'vertical',
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    slidesPerView: 'auto',
    parallax: true,
    keyboard: {
      enabled: true
    },
    // freeMode: true,
    mousewheel: {
      releaseOnEdges: true,
      sensitivity: 0.7
    },
    scrollbar: {
      el: '.full-screen__scroll',
      dragClass: 'full-screen__drag-scroll',
      draggable: true,
    },
    speed: 800,
    // allowSlideNext: false,
    // allowSlidePrev: false,
    // breakpoints: {
    //   480: {
    //     allowSlideNext: true,
    //     allowSlidePrev: true,
    //   },
    // },
    on: {
      init: function () {
        setScrollType(this);
        this.el.classList.add('full-screen__is-loaded');
      },
      slideChange: function () {

      },
      resize: function () {
        setScrollType(this);
      }
    }
  });

};

document.addEventListener('DOMContentLoaded', () => {
  initSlidersScroll();
});
