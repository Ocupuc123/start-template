import JustValidate from 'just-validate';

const validateForms = (selector, rules, afterSend) => {
  const form = document.querySelector(selector);

  if (!form) {
    return false;
  }

  const validation = new JustValidate(selector, {
    errorLabelCssClass: 'field-text__help-text',
  });

  if (!rules) {
    return false;
  }

  for (const item of rules) {
    validation.addField(item.ruleSelector, item.rules);
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
    ruleSelector: '#phone',
    rules: [
      {
        rule: 'required',
        errorMessage: 'Введите телефон'
      },
    ]
  },
  {
    ruleSelector: '#name',
    rules: [
      {
        rule: 'required',
        errorMessage: 'Заполните это поле'
      },
    ]
  },
  {
    ruleSelector: '#approval',
    rules: [
      {
        rule: 'required',
        errorMessage: 'Согласие обязательно'
      },
    ]
  },
];

const afterForm = () => {
  // console.log('Произошла отправка, тут можно писать любые действия');
};

validateForms('.form', rulesArray, afterForm);
