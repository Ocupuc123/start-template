import {disableBodyScroll, enableBodyScroll} from '../../js/functions/body-scroll-lock';

const IS_OPEN_CLASS = 'filter-toggler--is-open';
const filterToggler = document.querySelector('.filter-toggler');
const filterTogglerOpenButtons = document.querySelectorAll('[data-filter-toggler-open]');
const filterTogglerCloseButtons = document.querySelectorAll('[data-filter-toggler-close]');

if (filterToggler) {
  filterTogglerOpenButtons.forEach((btnOpen) => {
    btnOpen.addEventListener('click', () => {
      filterToggler.classList.add(IS_OPEN_CLASS);
      disableBodyScroll();
    });
  });

  filterTogglerCloseButtons.forEach((btnClose) => {
    btnClose.addEventListener('click', () => {
      filterToggler.classList.remove(IS_OPEN_CLASS);
      enableBodyScroll();
    });
  });
}
