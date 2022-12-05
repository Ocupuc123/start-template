import { enablePageScroll } from 'scroll-lock';

const offcanvas = document.querySelector('.off-canvas');
const offcanvasClose = offcanvas.querySelector('.close');
const burger = document.querySelector('.burger');
const scrollableElement = document.querySelector('.off-canvas__body');

offcanvasClose.addEventListener('click', () => {
  offcanvas.classList.remove('off-canvas--shown');
  burger.classList.remove('burger--close');
  enablePageScroll(scrollableElement);
});
