const subArrowElements = document.querySelectorAll('.sub-arrow');

if (subArrowElements.length) {
  subArrowElements.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.target.classList.toggle('active');

      if (evt.target.nextElementSibling.style.display !== 'block') {
        evt.target.nextElementSibling.style.display = 'block';
      } else {
        evt.target.nextElementSibling.style.display = 'none';
      }
    });
  });
}
