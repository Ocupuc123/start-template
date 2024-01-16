const EXPAND_BUTTON_CLASS = 'expand-button';
const SUBMENU_CLASS = 'submenu';
const HAS_SUBMENU_CLASS = 'has-submenu';

const responsiveMenu = document.querySelector('.responsive-menu');
const menuItems = document.querySelectorAll('.responsive-menu li');

const addExpandButton = () => {
  menuItems.forEach((menuItem) => {
    const subMenu = menuItem.querySelector('ul');

    if (subMenu) {
      const expandButton = document.createElement('button');
      expandButton.classList.add(EXPAND_BUTTON_CLASS);
      expandButton.setAttribute('aria-expanded', 'false');
      expandButton.setAttribute('type', 'button');
      expandButton.innerHTML = 'Показать подпункты';

      expandButton.addEventListener('click', () => {
        subMenu.classList.toggle('expanded');
        const isExpanded = subMenu.classList.contains('expanded');
        expandButton.setAttribute('aria-expanded', isExpanded.toString());
        expandButton.innerHTML = isExpanded ? 'Скрыть подпункты' : 'Показать подпункты';
      });

      if (!menuItem.querySelector('.expand-button')) {
        menuItem.insertBefore(expandButton, subMenu);
      }
    }
  });
};

const addSubmenuClasses = () => {
  menuItems.forEach((menuItem) => {
    const subMenu = menuItem.querySelector('ul');

    if (subMenu && !menuItem.classList.contains(HAS_SUBMENU_CLASS)) {
      menuItem.classList.add(HAS_SUBMENU_CLASS);
    }

    if (subMenu && !subMenu.classList.contains(SUBMENU_CLASS)) {
      subMenu.classList.add(SUBMENU_CLASS);
    }
  });
};

const responsiveMenuInit = () => {
  if (responsiveMenu) {
    addExpandButton();
    addSubmenuClasses();
  }
};

responsiveMenuInit();
