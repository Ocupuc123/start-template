// https://github.com/vadikom/smartmenus

// eslint-disable-next-line no-unused-vars
import smartmenus from 'smartmenus';

if ($('.sm-clean')) {
  $('.sm-clean').smartmenus({
    mainMenuSubOffsetX: -1,
    mainMenuSubOffsetY: 4,
    subMenusSubOffsetX: 6,
    subMenusSubOffsetY: -6
  });
}
