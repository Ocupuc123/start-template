import { isMobile } from './is-mobile.js';

export const addTouchClass = () => {
  if (isMobile.any()) {
    document.documentElement.classList.add('touch');
  }
};
