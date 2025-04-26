document.addEventListener('DOMContentLoaded', () => {
  const inputFiles = document.querySelectorAll('.field-file__input:not([disabled])');
  const handleInputChange = (evt)=> {
    const input = evt.target;
    const label = input.closest('.field-file').querySelector('.field-file__name-text');
    const labelVal = label.textContent;

    let fileName = '';
    if (input.files && input.files.length > 1) {
      fileName = input.getAttribute('data-multiple-caption')?.replace('{count}', input.files.length) || '';
    } else if (input.files?.length) {
      fileName = input.files[0].name;
    }

    label.textContent = fileName || labelVal;
  };

  inputFiles.forEach((input) => input.addEventListener('change', handleInputChange));
});

