import JustValidate from 'just-validate';
import Inputmask from '../../../node_modules/inputmask/lib/inputmask.js';

const validateForms = (selector, rules, afterSend) => {
  const form = document.querySelector(selector);
  const telSelector = form.querySelector('input[type="phone"]');

  if (!form) {
    return false;
  }

  if (!rules) {
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    for (const item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  const validation = new JustValidate(selector);

  for (const item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    const formData = new FormData(ev.target);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
          }
        }
      }
    };

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  });

};


const rulesArray = [
  {
    ruleSelector: '.field-text__input',
    tel: true,
    telError: 'Введите корректный телефон',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните телефон!'
      }
    ]
  },
];

const afterForm = () => {
  // console.log('Произошла отправка, тут можно писать любые действия');
};

validateForms('.form', rulesArray, afterForm);
