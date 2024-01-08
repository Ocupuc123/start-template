/* eslint-disable no-undef */
import '../libs/gsap/gsap.min.js';
import '../libs/gsap/ScrollTrigger.min.js';
import '../libs/gsap/ScrollSmoother.min.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: '.page__inner',
  content: '.page__content',
  smooth: 1,
  effects: true
});

gsap.fromTo('.section-2', { opacity: 0 }, {
  opacity: 1,
  scrollTrigger: {
    trigger: '.section-2',
    scrub: true
  }
});
