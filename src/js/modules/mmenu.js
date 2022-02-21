// mmenu-light.js ================================================//
/* Документация плагина: https://mmenujs.com/mmenu-light/tutorial.html */
// Сниппет(HTML): g-nav
import MmenuLight from "mmenu-light";

export default function mmenuInit() {
  const mmenuButtonOpen = document.querySelector("[data-mmenu]");
  if (mmenuButtonOpen) {
    const menu = new MmenuLight(document.querySelector("#menu"), "(max-width: 1024px)");

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
  }
}
