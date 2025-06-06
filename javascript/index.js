document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".slider-wrapper");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevBtn = document.querySelector(".prev-button");
  const nextBtn = document.querySelector(".next-button");
  let currentIndex = 0;

  function slidesPerView() {
    if (window.innerWidth >= 600) {
      return 2;
    } else {
      return 1;
    }
  }

  function updateSlider() {
    const spv = slidesPerView();
    const maxIndex = slides.length - spv;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const shift = (currentIndex * -100) / spv;
    wrapper.style.transform = `translateX(${shift}%)`;
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