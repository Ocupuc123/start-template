import hcSticky from 'hc-sticky';

document.addEventListener('DOMContentLoaded', () => {

  new hcSticky('.page-header__bottom', {
    stickTo: '.page__body'
  });

});
