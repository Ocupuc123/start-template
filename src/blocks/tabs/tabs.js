document.addEventListener('DOMContentLoaded', ()=> {

  // Следим за поднимающимися кликами
  document.addEventListener('click', (evt) => {
    if(evt.target.dataset.toggle === 'tab') {
      evt.preventDefault();
      const target = evt.target.hash === undefined ? evt.target.dataset.target : evt.target.hash;
      if (target !== undefined) {
        showTab(target);
      }
    }
  });

  /**
   * Показывает таб
   * @param  {string} tabId ID таба, который нужно показать
   */
  function showTab(tabId){
    const element = document.querySelector(tabId);
    if ( element && element.classList.contains('tabs__content-item') ) {
      const tabsParent = document.querySelector(tabId).closest('.tabs');
      const activeTabClassName = 'tabs__link-wrap--active';
      const activeTabContentClassName = 'tabs__content-item--active';
      // таб
      tabsParent.querySelectorAll(`.${activeTabClassName}`).forEach((item)=> {
        item.classList.remove(activeTabClassName);
      });
      const activeTab = tabsParent.querySelector(`[href="${tabId}"]`) ? tabsParent.querySelector(`[href="${tabId}"]`) : tabsParent.querySelector(`[data-target="${tabId}"]`);
      activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName);
      // контент таба
      tabsParent.querySelectorAll(`.${activeTabContentClassName}`).forEach((item)=> {
        item.classList.remove(activeTabContentClassName);
      });
      tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
    }
  }

});
