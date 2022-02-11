// mmenu-light.js ================================================//
/* Документация плагина: https://mmenujs.com/mmenu-light/tutorial.html */
// Сниппет(HTML): g-nav
import MmenuLight from "mmenu-light";

export function mmenuInit() {
  const mmenuButtonOpen = document.querySelector("[data-mmenu]");
  const menu = new MmenuLight(document.querySelector("#menu"), "(max-width: 991px)");

  const navigator = menu.navigation({
    title: "Меню",
  });
  const drawer = menu.offcanvas({
    position: "right",
  });

  mmenuButtonOpen.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    drawer.open();
  });
};