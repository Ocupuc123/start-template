const sublistToogles = document.querySelectorAll('.main-nav__sublist-toggle');

if (sublistToogles.length > 0) {
  sublistToogles.forEach((toggle) => {
    toggle.addEventListener('click', (evt) => {
      if (evt.target.nextElementSibling.style.display === 'block') {
        evt.target.nextElementSibling.style.display = 'none';
        evt.target.classList.remove('main-nav__sublist-toggle--active');
      } else {
        evt.target.nextElementSibling.style.display = 'block';
        evt.target.classList.add('main-nav__sublist-toggle--active');
      }
    });
  });
}
