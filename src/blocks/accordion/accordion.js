// https://github.com/michu2k/Accordion

import Accordion from 'accordion-js';

const accordions = Array.from(document.querySelectorAll('.accordion'));

if (accordions.length) {
  const accordion = new Accordion(accordions, {
    elementClass: 'accordion__item',
    triggerClass: 'accordion__trigger',
    panelClass: 'accordion__panel',
    activeClass: 'accordion__item--active',
    duration: 400,
  });
  accordion.forEach((item) => {
    item.open(0);
  });
}
