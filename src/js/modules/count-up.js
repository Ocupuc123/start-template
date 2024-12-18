import { CountUp } from 'countup.js';

const counts = document.querySelectorAll('.count-to');

if (counts.length > 0) {
  counts.forEach((count) => {
    const startVal = count.textContent;
    if (!isNaN(startVal) && startVal !== '') {
      const numAnim = new CountUp(count, Number(startVal), {
        startVal: 0,
        enableScrollSpy: true,
        scrollSpyOnce: true,
        useGrouping: false,
      });

      numAnim.start();
    }
  });
}