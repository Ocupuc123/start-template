import { getScrollbarSize } from '../../../scripts/utils/get-scrollbar-size.js';

document.addEventListener('DOMContentLoaded', () => {
  const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'), 10);
  const backdrop = document.createElement('div');

  document.addEventListener('click', (event) => {
    const target = event.target.closest('a[data-mobile-nav], button[data-mobile-nav]');

    if (target && target.dataset.mobileNav === 'open') {
      showMobileNav(document.getElementById((target.hash || target.dataset.mobileNavTarget).slice(1)));
    }

    if (target && target.dataset.mobileNav === 'close' || event.target.matches('[aria-modal]')) {
      closeMobileNavs();
    }

    function showMobileNav(targetModalNode) {
      if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
        document.body.style.paddingRight = `${bodyPaddingRightOriginal + getScrollbarSize() }px`;
      }
      document.body.classList.add('mobile-nav-open');

      targetModalNode.classList.add('mobile-nav--show');
      targetModalNode.style.display = 'block';
      targetModalNode.ariaModal = true;
      targetModalNode.setAttribute('role', 'dialog');

      backdrop.className = 'mobile-nav-backdrop';
      document.body.append(backdrop);
    }

    function closeMobileNavs() {
      document.body.classList.remove('mobile-nav-open');
      document.body.style.paddingRight = '';

      const mobileNav = document.querySelector('.mobile-nav');

      mobileNav.classList.remove('mobile-nav--show');
      mobileNav.style.display = 'none';
      mobileNav.ariaModal = null;
      mobileNav.removeAttribute('role');

      backdrop.remove();
    }
  });
});
