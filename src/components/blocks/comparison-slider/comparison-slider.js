const comparisonSliders = document.querySelectorAll('.comparison-slider');
if (comparisonSliders.length > 0) {
  comparisonSliders.forEach((sliderContainer) => {
    const slider = sliderContainer.querySelector('.comparison-slider__slider');
    const afterContainer = sliderContainer.querySelector('.comparison-slider__after-container');
    const sliderButton = sliderContainer.querySelector('.comparison-slider__slider-button');

    const updateSliderPosition = (percentage) => {
      percentage = Math.max(0, Math.min(100, percentage));
      slider.value = percentage;
      afterContainer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      sliderButton.style.left = `${percentage}%`;
    };

    // Увеличим область перетаскивания для слайдера
    sliderButton.style.touchAction = 'none'; // Отключаем стандартные действия браузера при касании

    // Функция для обработки событий перемещения
    const handleMove = (clientX) => {
      const sliderRect = sliderContainer.getBoundingClientRect();
      const position = (clientX - sliderRect.left) / sliderRect.width;
      updateSliderPosition(position * 100);
    };

    // Обработка стандартного ввода через range slider
    slider.addEventListener('input', () => {
      updateSliderPosition(slider.value);
    });

    // Обработка событий мыши
    let isDragging = false;

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) {
        return;
      }
      handleMove(e.clientX);
    });

    // Обработка событий касания
    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault(); // Предотвращаем скролл страницы
      handleMove(e.touches[0].clientX);
    }, { passive: false });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) {
        return;
      }
      handleMove(e.touches[0].clientX);
    }, { passive: true });

    // Инициализация начального положения
    updateSliderPosition(50);
  });
}
