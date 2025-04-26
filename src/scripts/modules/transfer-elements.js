import TransferElements from 'transfer-elements';

const responsiveMenu = document.querySelector('.responsive-menu');

if (responsiveMenu) {
  new TransferElements(
    {
      sourceElement: document.querySelector('.responsive-menu'),
      breakpoints: {
        1023: {
          targetElement: document.querySelector('.mobile-nav__menu'),
        }
      }
    }
  );
}
