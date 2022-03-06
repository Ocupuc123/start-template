// Документация плагина: https://github.com/pehaa/beerslider

import BeerSlider from 'beerslider';

const BeerSliders = document.querySelectorAll('.beer-slider');

BeerSliders.forEach((item) => {
  // eslint-disable-next-line no-unused-vars
  const beerSlider = new BeerSlider(item);
});
