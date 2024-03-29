import closest from 'closest';

document.addEventListener('DOMContentLoaded', () => {

  /*
    Форма: работа стилизованного input[type="file"]
    Автор: Osvaldas Valutis, www.osvaldas.info (адаптировано под используемую разметку)
    Available for use under the MIT License
  */

  const inputs = document.querySelectorAll('.field-file__input:not([disabled])');
  Array.prototype.forEach.call(inputs, (input) => {
    const label = closest(input, '.field-file').querySelector('.field-file__name-text'),
      labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
      let fileName = '';
      if(this.files && this.files.length > 1) {
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      } else {
        fileName = e.target.value.split('\\').pop();
      }

      if(fileName) {
        label.innerHTML = fileName;
      } else {
        label.innerHTML = labelVal;
      }
    });
  });

});
