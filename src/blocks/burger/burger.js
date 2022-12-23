const burgers = document.querySelectorAll('.burger');

if (burgers.length > 0) {
  burgers.forEach((burger) => {
    burger.addEventListener('click', (evt) => {
      const targetId = evt.currentTarget.getAttribute('data-target-id');
      const targetClassToggle = evt.currentTarget.getAttribute('data-target-class-toggle');
      if (targetId && targetClassToggle) {
        evt.currentTarget.classList.toggle('burger--close');
        document.getElementById(targetId).classList.toggle(targetClassToggle);
      }
    });
  });
}
