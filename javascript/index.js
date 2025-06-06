document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".slider-wrapper");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevBtn = document.querySelector(".prev-button");
  const nextBtn = document.querySelector(".next-button");
  const container = document.querySelector(".slider-container");
  let currentIndex = 0;

  function slidesPerView() {
    return window.innerWidth >= 600 ? 2 : 1;
  }

  function updateSlider() {
    const spv = slidesPerView();
    const maxIndex = Math.ceil(slides.length / spv) - 1;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    // Jedes Mal verschieben wir um genau 1 x Container-Breite:
    const containerWidth = container.offsetWidth;
    wrapper.style.transform = `translateX(-${currentIndex * containerWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex -= 1;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex += 1;
    updateSlider();
  });

  updateSlider();
  window.addEventListener("resize", updateSlider);
});