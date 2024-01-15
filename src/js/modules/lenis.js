import Lenis from '@studio-freight/lenis';

export const lenis = new Lenis({
  duration: 1.5
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
