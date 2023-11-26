export const addLoadedClass = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
};
