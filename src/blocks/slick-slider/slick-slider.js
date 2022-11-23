import $ from 'jquery';
import 'slick-carousel';

const slickSliderInit = () => {
  $('.slick-slider').slick({
    dots: true,
    infinite: false
  });
};

export { slickSliderInit };
