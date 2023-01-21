const cookieElement = document.querySelector('.cookie');

const cookieCloseHandler = () => {
  cookieElement.remove();
};

const cookieApplyHandler = () => {
  cookieElement.remove();
  document.cookie = 'cookie=true;max-age=2592000;path=/';
};

if (cookieElement) {
  const cookieButtonElement = cookieElement.querySelector('.button');
  const cookieCloseElement = cookieElement.querySelector('.close');

  setTimeout(() => {
    cookieElement.classList.add('cookie--shown');
  }, 3000);
  cookieButtonElement.addEventListener('click', cookieApplyHandler);
  cookieCloseElement.addEventListener('click', cookieCloseHandler);
}
