document.addEventListener('DOMContentLoaded', () =>{

  if(location.hash) {
    showTab(location.hash);
  }

  // Следим за поднимающимися кликами
  document.addEventListener('click', (event) => {
    if(event.target.dataset.toggle === 'tab') {
      event.preventDefault();
      const target = event.target.hash === undefined ? event.target.dataset.target : event.target.hash;
      if (target !== undefined) {
        showTab(target);
        if(history && history.pushState && history.replaceState) {
          const stateObject = {'url' : target};
          if (window.location.hash && stateObject.url !== window.location.hash) {
            window.history.pushState(stateObject, document.title, window.location.pathname + target);
          } else {
            window.history.replaceState(stateObject, document.title, window.location.pathname + target);
          }
        }
      }
    }
  });

  /**
   * Показывает таб
   * @param  {string} tabId ID таба, который нужно показать
   */
  function showTab(tabId){
    const element = document.querySelector(tabId);
    if (element && element.classList.contains('tabs__content-item')) {
      const tabsParent = document.querySelector(tabId).closest('.tabs');
      const activeTabClassName = 'tabs__link-wrap--active';
      const activeTabContentClassName = 'tabs__content-item--active';
      // таб
      tabsParent.querySelectorAll(`.${activeTabClassName}`).forEach((item) =>{
        item.classList.remove(activeTabClassName);
      });
      const activeTab = tabsParent.querySelector(`[href="${tabId}"]`) ? tabsParent.querySelector(`[href="${tabId}"]`) : tabsParent.querySelector(`[data-target="${tabId}"]`);
      activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName);
      // контент таба
      tabsParent.querySelectorAll(`.${activeTabContentClassName}`).forEach((item) =>{
        item.classList.remove(activeTabContentClassName);
      });
      tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
    }
  }

});
