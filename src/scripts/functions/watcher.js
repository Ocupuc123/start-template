/**
 * Отслеживает появление элемента на экране и вызывает коллбэк, когда элемент становится видимым
 * @param {string} selector - CSS-селектор элемента (класс, id и т.д.)
 * @param {Function} callback - Функция, которая будет вызвана при появлении элемента
 * @param {Object} [options] - Дополнительные параметры для IntersectionObserver
 * @param {number|Array} [options.threshold=0.1] - Порог видимости (0-1)
 * @param {string} [options.rootMargin='0px'] - Отступы вокруг root
 * @param {Element|Document} [options.root=null] - Элемент, который выступает в качестве viewport
 */

export function watcher(selector, callback, options = {}) {
  if (!('IntersectionObserver' in window)) {
    callback();
    return;
  }

  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    return;
  }

  const defaultOptions = {
    threshold: 0,
    rootMargin: '100px 0px 0px 0px',
    root: null,
    ...options
  };

  const observer = new IntersectionObserver((entries, _observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        _observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  elements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
}
