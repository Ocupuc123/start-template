document.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.querySelector('.main-nav');

  if (! mainNav) {
    return;
  }

  const menu = mainNav.getElementsByTagName('ul')[0];
  const links = menu.getElementsByTagName('a');
  const linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

  for (const link of links) {
    link.addEventListener('focus', toggleFocus, { capture: true });
    link.addEventListener('blur', toggleFocus, { capture: true });
  }

  for (const link of linksWithChildren) {
    link.addEventListener('touchstart', toggleFocus, { passive: false, capture: false });
  }

  function toggleFocus(event) {
    if (event.type === 'focus' || event.type === 'blur') {
      let self = this;

      while (! self.classList.contains('menu')) {
        if ('li' === self.tagName.toLowerCase()) {
          self.classList.toggle('focus');
        }
        self = self.parentNode;
      }
    }

    if (event.type === 'touchstart') {
      const menuItem = this.parentNode;
      event.preventDefault();
      for (const link of menuItem.parentNode.children) {
        if (menuItem !== link) {
          link.classList.remove('focus');
        }
      }
      menuItem.classList.toggle('focus');
    }
  }
});
