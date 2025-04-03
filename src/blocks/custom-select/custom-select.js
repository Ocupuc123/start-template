const customSelect = document.querySelectorAll('.custom-select');

if (customSelect.length > 0) {
  customSelect.forEach((select) => {
    const selectToggle = select.querySelector('.custom-select__toggle');
    const selectOptions = select.querySelectorAll('.custom-select__option');

    const handleClickOutside = (event) => {
      if (!select.contains(event.target)) {
        select.classList.remove('custom-select--open');
        document.removeEventListener('click', handleClickOutside);
      }
    };

    selectToggle.addEventListener('click', () => {
      document.addEventListener('click', handleClickOutside);
      select.classList.toggle('custom-select--open');
    });

    selectOptions.forEach((option) => {
      option.addEventListener('click', () => {
        selectToggle.textContent = option.textContent;
        select.classList.remove('custom-select--open');
      });
    });
  });
}
