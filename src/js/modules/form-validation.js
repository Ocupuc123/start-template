import { validateForms } from '../libs/form-validation.js';

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
  console.log('Произошла отправка, тут можно писать любые действия');
};

validateForms('.form', rulesArray, afterForm);
