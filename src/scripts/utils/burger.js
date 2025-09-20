import {ScrollLock} from './scroll-lock';
import {FocusLock} from './focus-lock';

export class Burger {
  constructor() {
    this._header = document.querySelector('[data-header]');
    this._burger = document.querySelector('[data-burger]');
    this._scrollLock = new ScrollLock();
    this._focusLock = new FocusLock();
    this._isMenuOpen = false;

    this._onBurgerClick = this._onBurgerClick.bind(this);
    this._onDocumentKeydown = this._onDocumentKeydown.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  init() {
    if (!this._burger) {
      return;
    }

    this._burger.addEventListener('click', this._onBurgerClick);
  }

  _makeBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'page-header__offcanvas-backdrop';
    this._header.append(backdrop);

    backdrop.addEventListener('click', () => {
      this._closeMenu();
      backdrop.remove();
    });
  }

  _removeBackdrop() {
    const backdrop = document.querySelector('.page-header__offcanvas-backdrop');
    backdrop?.remove();
  }

  _openMenu() {
    this._isMenuOpen = true;
    this._header.classList.add('is-open');
    this._scrollLock.disableScrolling();
    document.addEventListener('keydown', this._onDocumentKeydown);
    document.addEventListener('click', this._onDocumentClick);
    this._focusLock.lock('[data-header]');
    this._makeBackdrop();
    if (window.ls) {
      window.ls.stop();
    }
  }

  _closeMenu() {
    this._isMenuOpen = false;
    this._header.classList.remove('is-open');
    this._scrollLock.enableScrolling();
    this._focusLock.unlock('[data-header]');
    this._removeBackdrop();
    document.removeEventListener('keydown', this._onDocumentKeydown);
    document.removeEventListener('click', this._onDocumentClick);
    if (window.ls) {
      window.ls.start();
    }
  }

  _onBurgerClick() {
    if (this._isMenuOpen) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      this._closeMenu();
    }
  }

  _onDocumentClick(evt) {
    if (evt.target.hasAttribute('data-close-menu')) {
      this._closeMenu();
    }
  }
}
