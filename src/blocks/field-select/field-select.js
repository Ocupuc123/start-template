import Choices from 'choices.js';

document.addEventListener('DOMContentLoaded', () => {

  if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {

      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        const source = arguments[index];
        if (source != null) {
          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }

  // Включим на каком-то конкретном отдельно
  // const choices = new Choices('#some-if', {/* options */});

  // Или тупо найдём все селекты и включим на них Choices
  const selects = document.querySelectorAll('.field-select__select');
  selects.forEach((item) =>{
    new Choices(item, {
      searchEnabled: false,
      placeholderValue: 'Выберите',
    });
  });

});
