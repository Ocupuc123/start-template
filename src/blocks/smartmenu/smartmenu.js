import jQuery from 'jquery';
// eslint-disable-next-line no-unused-vars
import smartmenus from 'smartmenus';

jQuery(() => {
  jQuery('.smartmenu').smartmenus({
    mainMenuSubOffsetX: -1,
    mainMenuSubOffsetY: 4,
    subMenusSubOffsetX: 6,
    subMenusSubOffsetY: -6
  });
});
