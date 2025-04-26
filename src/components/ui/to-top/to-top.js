class Animation {
  constructor({ timing, draw, duration }) {
    this.timing = timing;
    this.draw = draw;
    this.duration = duration;
    this.start = performance.now();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  animate(time) {
    let timeFraction = (time - this.start) / this.duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    const progress = this.timing(timeFraction);
    this.draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(this.animate);
    }
  }
}

const visibilityToggle = () => {
  const toTopElement = document.querySelector('.to-top');
  if (window.scrollY >= 500) {
    toTopElement.classList.toggle('to-top--visible', true);
  } else {
    toTopElement.classList.toggle('to-top--visible', false);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toTopElement = document.querySelector('.to-top');

  if (toTopElement) {
    toTopElement.addEventListener('click', (e) => {
      e.preventDefault();
      const scroll = window.scrollY;
      const targetTop = 0;
      const scrollDiff = (scroll - targetTop) * -1;
      new Animation({
        duration: 500,
        timing: (timeFraction) => Math.pow(timeFraction, 4),
        draw: (progress) => {
          const scrollNow = scroll + progress * scrollDiff;
          window.scrollTo(0, scrollNow);
        }
      });
    });

    window.addEventListener('scroll', visibilityToggle);
    visibilityToggle();
  }
});
