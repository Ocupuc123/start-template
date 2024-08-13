const scrollers = document.querySelectorAll('.marquee__wrapper');

const addAnimation = () => {
  scrollers.forEach((scroller) => {

    scroller.setAttribute('data-animated', true);

    const scrollerInner = scroller.querySelector('.marquee__scroller');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
};

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && scrollers.length > 0) {
  addAnimation();
}
