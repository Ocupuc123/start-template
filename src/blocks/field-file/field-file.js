import closest from 'closest';

/*
    Форма: работа стилизованного input[type="file"]
    Автор: Osvaldas Valutis, www.osvaldas.info (адаптировано под используемую разметку)
    Available for use under the MIT License
  */

const inputs = document.querySelectorAll('.field-file__input:not([disabled])');

Array.prototype.forEach.call( inputs, ( input ) => {
  const label = closest(input, '.field-file').querySelector('.field-file__name-text');
  const labelVal = label.innerHTML;

  input.addEventListener( 'change', (evt)=> {
    let fileName = '';
    if( evt.target.files && evt.target.files.length > 1 ) {
      fileName = ( evt.target.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', evt.target.files.length );
    }
    else {
      fileName = evt.target.value.split( '\\' ).pop();
    }

    if( fileName ) {
      label.innerHTML = fileName;
    }
    else {
      label.innerHTML = labelVal;
    }
  });
});
