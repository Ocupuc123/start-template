export const getHeaderHeight = () => {
  const headerHeight = document?.querySelector(".page-header").offsetHeight;
  document.querySelector(":root").style.setProperty("--header-height", `${headerHeight}px`);
};

window.addEventListener("resize", getHeaderHeight);
