
const fields = document.querySelectorAll( '.field-num' );
if(fields.length) {
  Array.prototype.forEach.call( fields, ( field ) => {
    const input = field.querySelector('.field-num__input');
    const valueMin = input.getAttribute('min') ? +input.getAttribute('min') : -Infinity;
    const valueMax = input.getAttribute('max') ? +input.getAttribute('max') : Infinity;
    const valueStep = input.getAttribute('step') ? +input.getAttribute('step') : 1;
    field.addEventListener('click', (evt)=> {
      if(evt.target.classList.contains('field-num__btn') && !input.getAttribute('disabled')) {
        let num = parseInt(input.value, 10);
        if (isNaN(num)) {
          num = 0;
        }
        if(evt.target.classList.contains('field-num__btn--plus')) {
          if (num < valueMax) {
            input.value = num + valueStep;
          }
        }
        if(evt.target.classList.contains('field-num__btn--minus')) {
          if (num > valueMin) {
            input.value = num - valueStep;
          }
        }
      }
    });
  });
}
