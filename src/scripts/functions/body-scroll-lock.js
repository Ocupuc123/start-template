const body = document.querySelector('body');

let scrollPosition = 0;

export const disableBodyScroll = () => {
  scrollPosition = window.scrollY;
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollPosition}px`;
  body.style.width = '100%';
};

export const enableBodyScroll = () => {
  body.style.removeProperty('overflow');
  body.style.removeProperty('position');
  body.style.removeProperty('top');
  body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
};
