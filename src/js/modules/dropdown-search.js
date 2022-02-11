// Сниппет(HTML): g-dropdown-search
export function dropdownSearch() {
  const dropdownSearch = document.querySelector(".dropdown-search");
  const dropdownSearchToggler = document.querySelector(".dropdown-search__toggler");
  const dropdownSearchWrapper = document.querySelector(".dropdown-search__wrapper");

  dropdownSearchToggler.addEventListener("click", () => {
    dropdownSearchWrapper.classList.toggle("is-active");
  });

  document.addEventListener("click", (event) => {
    if (!dropdownSearch.contains(event.target)) {
      dropdownSearchWrapper.classList.remove("is-active");
      return;
    }
  });
}
