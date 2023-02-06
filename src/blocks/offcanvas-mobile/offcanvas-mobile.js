import { getScrollSize } from '../../js/utils/get-scroll-size.js';

const offcanvasElement = document.querySelector('.offcanvas-mobile');
const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'), 10);
const backdrop = document.createElement('div');

const openOffcanvas = () => {

  if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
    document.body.style.paddingRight = `${bodyPaddingRightOriginal + getScrollSize() }px`;
  }

  document.body.classList.add('offcanvas-mobile-open');
  offcanvasElement.classList.add('offcanvas-mobile--open');

  backdrop.className = 'offcanvas-mobile-backdrop';
  document.body.append(backdrop);
};

const closeOffcanvas = () => {
  document.body.classList.remove('offcanvas-mobile-open');
  document.body.style.paddingRight = '';
  offcanvasElement.classList.remove('offcanvas-mobile--open');

  backdrop.remove();
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
