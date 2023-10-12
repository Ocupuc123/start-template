/* Проверка мобильного браузера */
export const isMobile = { Android: function () {
  return navigator.userAgent.match(/Android/i);
}, BlackBerry: function () {
  return navigator.userAgent.match(/BlackBerry/i);
}, iOS: function () {
  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
}, Opera: function () {
  return navigator.userAgent.match(/Opera Mini/i);
}, Windows: function () {
  return navigator.userAgent.match(/IEMobile/i);
}, any: function () {
  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
} };
/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    document.documentElement.classList.add('touch');
  }
}
// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
}
// Учет плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
  const fixHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  if (isMobile.any()) {
    window.addEventListener('resize', fixHeight);
    fixHeight();
  }
}

export const getHeaderHeight = () => {
  const header = document.querySelector('.page-header');

  if (header) {
    const getHeight = () => {
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    };
    window.addEventListener('resize', getHeight);

    getHeight();
  }
};

let addWindowScrollEvent = false;

// Работа с шапкой при скроле
export function headerScroll() {
  addWindowScrollEvent = true;
  const header = document.querySelector('header.header');
  const headerShow = header.hasAttribute('data-scroll-show');
  const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
  const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
  let scrollDirection = 0;
  let timer;
  document.addEventListener('windowScroll', () => {
    const scrollTop = window.scrollY;
    clearTimeout(timer);
    if (scrollTop >= startPoint) {
      !header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
      if (headerShow) {
        if (scrollTop > scrollDirection) {
          // downscroll code
          header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
        } else {
          // upscroll code
          !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
        }
        timer = setTimeout(() => {
          !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
        }, headerShowTimer);
      }
    } else {
      header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
      if (headerShow) {
        header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
      }
    }
    scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
  });
}

setTimeout(() => {
  if (addWindowScrollEvent) {
    const windowScroll = new Event('windowScroll');
    window.addEventListener('scroll', () => {
      document.dispatchEvent(windowScroll);
    });
  }
}, 0);
