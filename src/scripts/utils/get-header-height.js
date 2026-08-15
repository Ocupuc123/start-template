export const getHeaderHeight = () => {
  const setHeaderHeight = () => {
    const header = document.querySelector('.page-header');
    const headerHeight = header.offsetHeight;
    document.body.style.setProperty('--header-height', `${headerHeight}px`);
  };

  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
};
