import TransferElements from 'transfer-elements';

export const initTransferElements = () => {
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

};
