// Документация плагина: https://mmenujs.com/mmenu-light/tutorial.html
// Сниппет(HTML): g-nav
import MmenuLight from 'mmenu-light';

export function mmenu() {
  const mmenuDrawerButton = document.querySelector('[data-mmenu]');

  if (mmenuDrawerButton) {
    const menu = new MmenuLight(document.querySelector('#menu'), '(max-width: 1024px)');

    // eslint-disable-next-line no-unused-vars
    const navigator = menu.navigation({
      title: 'Меню',
    });
    const drawer = menu.offcanvas({
      position: 'right',
    });

    mmenuDrawerButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      drawer.open();
    });
  }
}
