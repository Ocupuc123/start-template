import closest from 'closest';

// Для всех форм страницы
const forms = Array.from(document.querySelectorAll('form[data-check-form]'));
forms.forEach((form)=> {
  // Подпишемся на событие отправки
  form.addEventListener('submit', (evt)=> {
    let valid = true;
    // Проверим все текстовые инпуты
    const allFieldsText = Array.from(form.querySelectorAll('input[data-check-pattern]'));
    allFieldsText.forEach((input)=> {
      if (!checkFieldText(input)) {
        valid = false;
      }
    });
    // Проверим все чекбоксы
    const allFieldsCheckbox = Array.from(form.querySelectorAll('input[data-check-state]'));
    allFieldsCheckbox.forEach((input)=> {
      if (!checkFieldCheckbox(input)) {
        valid = false;
      }
    });
    // Если были ошибки, не отправляем форму
    if (!valid) {
      evt.preventDefault();
    }
  });
});

// Для всех проверяемых текстовых полей
const fieldsText = Array.from(document.querySelectorAll('input[data-check-pattern]'));
fieldsText.forEach((input)=> {
  let hasBeenAlreadyBlured = false;
  input.addEventListener('blur', ()=> {
    checkFieldText(input);
    if (!hasBeenAlreadyBlured) {
      hasBeenAlreadyBlured = true;
    }
  });
  input.addEventListener('input', () => {
    if (hasBeenAlreadyBlured) {
      checkFieldText(input);
    }
  });
});

// Для всех проверяемых чекбоксов
const fieldsCheckbox = Array.from(document.querySelectorAll('input[data-check-state]'));
fieldsCheckbox.forEach((input)=> {
  input.addEventListener('change', () => {
    checkFieldCheckbox(input);
  });
});

function checkFieldText(input) {
  const regExp = new RegExp(input.dataset.checkPattern, 'gi');
  const result = regExp.test(input.value);
  const errorClass = 'field-text--error';
  const parent = closest(input, '.field-text');
  if (result) {
    parent.classList.remove(errorClass);
  } else {
    parent.classList.add(errorClass);
  }
  return result;
}

function checkFieldCheckbox(input) {
  const trueVal = input.dataset.checkState === 'on';
  const result = trueVal === input.checked;
  const errorClass = 'field-checkbox__input-wrap--error';
  const parent = closest(input, '.field-checkbox__input-wrap');
  if (result) {
    parent.classList.remove(errorClass);
  } else {
    parent.classList.add(errorClass);
  }
  return result;
}
