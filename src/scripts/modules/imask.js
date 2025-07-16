import IMask from 'imask';

export const initImask = () => {
  const maskOptions = {
    mask: '+{7}(#00)000-00-00',
    definitions: {
      '#': /[012345679]/
    },
    lazy: true,
  };

  const phones = document.querySelectorAll('.phone-mask');

  if (phones.length > 0) {
    phones.forEach((phone) => {
      IMask(phone, maskOptions);
    });
  }
};
