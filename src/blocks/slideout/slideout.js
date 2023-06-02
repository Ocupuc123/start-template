// https://github.com/mango/slideout

import Slideout from 'slideout';

document.addEventListener('DOMContentLoaded', () => {
  const slideoutToggleButtonElement = document.querySelector('.slideout-toggler');
  const slideoutCloseButtonElement = document.querySelector('.slideout-close');

  const slideoutInit = new Slideout({
    'panel': document.querySelector('.page__slideout-panel'),
    'menu': document.querySelector('.page__slideout-menu'),
    'padding': 256,
    'tolerance': 70,
    'side': 'right',
  });

  slideoutToggleButtonElement.addEventListener('click', () => {
    slideoutInit.toggle();
  });

  slideoutCloseButtonElement.addEventListener('click', () => {
    slideoutInit.close();
  });
});
