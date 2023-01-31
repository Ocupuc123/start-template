import { getScrollSize } from '../../js/utils/getScrollSize.js';

const bodyPaddingRightOriginal = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right'), 10);
const backdrop = document.createElement('div');

document.addEventListener('click', (evt) => {
  const target = evt.target.closest('a[data-modal], button[data-modal]');

  if (target && target.dataset.modal === 'open') {
    showModal( document.getElementById((target.hash || target.dataset.modalTarget).slice(1)) );
  }

  if (target && target.dataset.modal === 'close' || evt.target.matches('[aria-modal]')) {
    closeAllModals();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    closeAllModals();
  }
});

function showModal(targetModalNode) {
  if ((document.body.clientHeight - document.documentElement.clientHeight) > 0) {
    document.body.style.paddingRight = `${bodyPaddingRightOriginal + getScrollSize() }px`;
  }
  document.body.classList.add('modal-open');

  targetModalNode.classList.add('modal--show');
  targetModalNode.style.display = 'block';
  targetModalNode.ariaModal = true;
  targetModalNode.ariaHidden = null;
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
    modal.ariaHidden = true;
    modal.removeAttribute('role');
  });

  backdrop.remove();
}
