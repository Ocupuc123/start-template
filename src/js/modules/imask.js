import IMask from 'imask';

const maskOptions = {
  mask: '+{7}(#00)000-00-00',
  definitions: {
    '#': /[012345679]/
  },
  lazy: true,
};

const phones = document.querySelectorAll('.input-mask');

if (phones.length > 0) {
  phones.forEach((phone) => {
    IMask(phone, maskOptions);
  });
}
