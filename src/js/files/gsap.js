import gsap from 'gsap';
import ScrollTrigger from '../../../node_modules/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// gsap.fromTo('.class', { opacity: 0, y: 200 }, {
//   y: 0,
//   opacity: 1,

//   scrollTrigger: {
//     trigger: '.class',
//     start: '+200',
//     scrub: true,
//     onEnter: (self) => {
//       self.trigger.classList.add('trigger');
//     }
//   }
// });
