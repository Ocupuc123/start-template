import { isMobile } from './is-mobile.js';

export const fullVHfix = () => {
  const fixHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  if (isMobile.any()) {
    window.addEventListener('resize', fixHeight);
    window.addEventListener('orientationchange', fixHeight);
    fixHeight();
  }
};
