export const getHeaderHeight = () => {
  const header = document.querySelector('.page-header');

  const getHeight = () => {
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  };

  if (header) {
    window.addEventListener('resize', getHeight);
    getHeight();
  }
};
