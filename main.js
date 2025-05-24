document.addEventListener('DOMContentLoaded', () => {
  // AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      once: true,
    });
  }

  // ======= КАРУСЕЛЬ ОТЗЫВОВ =======
  const track = document.querySelector('.carousel-track');
  const testimonials = Array.from(track?.children || []);
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

  if (prevBtn && nextBtn && testimonials.length > 0) {
    prevBtn.addEventListener('click', () => {
      showPrev();
      resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      showNext();
      resetAutoSlide();
    });

    const carousel = document.querySelector('.carousel');
    carousel?.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    carousel?.addEventListener('mouseleave', () => {
      resetAutoSlide();
    });

    updateCarousel();
    startAutoSlide();
  }

  function startAutoSlide() {
    if (testimonials.length <= 1) return;
    autoSlideInterval = setInterval(showNext, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // ======= АНИМАЦИЯ ОТКРЫТИЯ НОВОГО ДНЯ =======
  const newDays = document.querySelectorAll('.sidebar li.new');

  newDays.forEach((day) => {
    // Проверяем, открыт ли уже (чтобы не переанимировать)
    if (!day.classList.contains('unlocked')) {
      day.classList.add('unlock-animation', 'unlocked'); // добавляем анимацию
      setTimeout(() => {
        day.classList.remove('unlock-animation'); // удаляем класс, чтобы можно было снова анимировать
      }, 1000);
    }
  });

});
