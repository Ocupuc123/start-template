import { getScrollSize } from './get-scroll-size.js';

const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'), 10);
const backdrop = document.createElement('div');

export const createBackdrop = (backdropClassName = 'backdrop') => {
  backdrop.className = backdropClassName;

  if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
    document.body.style.paddingRight = `${bodyPaddingRightOriginal + getScrollSize() }px`;
  }

  document.body.append(backdrop);

};

export const removeBackdrop = () => {
  backdrop.remove();
};
