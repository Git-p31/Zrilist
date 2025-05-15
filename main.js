document.addEventListener('DOMContentLoaded', () => {
  // Инициализация AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      once: true,
    });
  }

  // Карусель отзывов
  const track = document.querySelector('.carousel-track');
  const testimonials = Array.from(track.children);
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentIndex = 0;
  let autoSlideInterval;

  function updateCarousel() {
    testimonials.forEach((testimonial, index) => {
      testimonial.style.opacity = index === currentIndex ? 1 : 0;
      testimonial.style.transform = `translateY(${index === currentIndex ? 0 : 20}px)`;
      testimonial.classList.toggle('active', index === currentIndex);
    });
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
  }

  // Обработчики кнопок
  prevBtn.addEventListener('click', () => {
    showPrev();
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    showNext();
    resetAutoSlide();
  });

  // Автопрокрутка
  function startAutoSlide() {
    if (testimonials.length <= 1) return; // Не запускать если только один отзыв
    autoSlideInterval = setInterval(showNext, 5000); // каждые 5 секунд
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Остановить автопрокрутку при наведении
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    resetAutoSlide();
  });

  // Инициализация
  updateCarousel();
  startAutoSlide();
});