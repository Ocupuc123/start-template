import { createBackdrop, removeBackdrop } from '../../js/utils/backdrop.js';

const offcanvasElement = document.querySelector('.offcanvas-mobile');

const openOffcanvas = () => {
  document.body.classList.add('offcanvas-mobile-open');
  offcanvasElement.classList.add('offcanvas-mobile--open');

  createBackdrop('offcanvas-mobile-backdrop');
};

const closeOffcanvas = () => {
  document.body.classList.remove('offcanvas-mobile-open');
  document.body.style.paddingRight = '';
  offcanvasElement.classList.remove('offcanvas-mobile--open');
  removeBackdrop();
};

document.addEventListener('click', (evt) => {
  const target = evt.target.closest('a[data-offcanvas], button[data-offcanvas]');

  if (target && target.dataset.offcanvas === 'open') {
    openOffcanvas();
  }

  if (target && target.dataset.offcanvas === 'close' || evt.target.matches('.offcanvas-mobile-backdrop')) {
    closeOffcanvas();
  }
});
