document.addEventListener('DOMContentLoaded', () => {
  $('.slick-slider').slick();

  const dropdownButtons = document.querySelectorAll('.main-nav .chevron');

  if (dropdownButtons.length > 0) {
    dropdownButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const parentElement = button.parentElement;
        parentElement.classList.toggle('is-active');
      });
    });
  }
});
