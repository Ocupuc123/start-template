import { createBackdrop, removeBackdrop } from '../../js/utils/backdrop.js';

const showModal = (targetModalNode)=> {
  document.body.classList.add('modal-open');

  targetModalNode.classList.add('modal--show');
  targetModalNode.style.display = 'block';
  targetModalNode.ariaModal = true;
  targetModalNode.ariaHidden = null;
  targetModalNode.setAttribute('role', 'dialog');

  createBackdrop('modal-backdrop');

};

const closeAllModals = ()=> {
  document.body.classList.remove('modal-open');
  document.body.style.paddingRight = '';

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.classList.remove('modal--show');
    modal.style.display = 'none';
    modal.ariaModal = null;
    modal.ariaHidden = true;
    modal.removeAttribute('role');
  });
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', escapeKeydownHandler);
  removeBackdrop();
};

const escapeKeydownHandler = (evt) => {
  if (evt.code === 'Escape') {
    closeAllModals();
  }
};

document.addEventListener('click', (evt) => {
  const target = evt.target.closest('a[data-modal], button[data-modal]');

  if (target && target.dataset.modal === 'open') {
    showModal(document.getElementById((target.hash || target.dataset.modalTarget).slice(1)));

    document.addEventListener('keydown', escapeKeydownHandler);
  }

  if (target && target.dataset.modal === 'close' || evt.target.matches('[aria-modal]')) {
    closeAllModals();
  }
});
