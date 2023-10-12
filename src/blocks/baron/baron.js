import baron from 'baron';

document.addEventListener('DOMContentLoaded', () => {

  baron({
    root: '#baron-demo',
    scroller: '.baron__scroller',
    bar: '.baron__bar',
    scrollingCls: 'baron--scrolling',
    draggingCls: 'baron--dragging',
    barOnCls: 'baron--scrollbar',
  });

});
