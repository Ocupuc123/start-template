import { getScrollbarSize } from '../../../scripts/functions/get-scrollbar-size.js';

document.addEventListener('DOMContentLoaded', () => {
  const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'), 10);
  const backdrop = document.createElement('div');

  document.addEventListener('click', (event) => {
    const target = event.target.closest('a[data-modal], button[data-modal]');

    if (target && target.dataset.modal === 'open') {
      event.preventDefault();
      showModal(document.getElementById((target.hash || target.dataset.modalTarget).slice(1)));
    }

    if (target && target.dataset.modal === 'close' || event.target.matches('[aria-modal]')) {
      closeAllModals();
    }

    function showModal(targetModalNode) {
      if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
        document.body.style.paddingRight = `${bodyPaddingRightOriginal + getScrollbarSize() }px`;
      }
      document.body.classList.add('modal-open');

      targetModalNode.classList.add('modal--show');
      targetModalNode.style.display = 'block';
      targetModalNode.ariaModal = true;
      targetModalNode.setAttribute('role', 'dialog');

      backdrop.className = 'modal-backdrop';
      document.body.append(backdrop);
    }

    function closeAllModals() {
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';

      document.querySelectorAll('.modal').forEach((modal) => {
        modal.classList.remove('modal--show');
        modal.style.display = 'none';
        modal.ariaModal = null;
        modal.removeAttribute('role');
      });

      backdrop.remove();
    }
  });
});
