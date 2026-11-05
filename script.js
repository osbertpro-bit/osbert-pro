const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const comparison = document.querySelector('.map-comparison');
if (comparison) {
  const slider = comparison.querySelector('.map-slider');
  const beforeWrap = comparison.querySelector('.map-before-wrap');
  const beforeImage = comparison.querySelector('.map-before');
  const syncComparison = () => {
    beforeImage.style.width = `${comparison.clientWidth}px`;
    comparison.style.setProperty('--split', `${slider.value}%`);
  };
  slider.addEventListener('input', syncComparison);
  window.addEventListener('resize', syncComparison);
  syncComparison();
}


// Section 7 testimonial carousel controls
const testimonialCarousel = document.querySelector('.testimonial-carousel');
if (testimonialCarousel) {
  const slides = [...testimonialCarousel.querySelectorAll('.testimonial-slide')];
  const dots = [...testimonialCarousel.querySelectorAll('.testimonial-pagination button')];
  const progress = [...testimonialCarousel.querySelectorAll('.testimonial-progress span')];
  const current = testimonialCarousel.querySelector('.testimonial-count strong');
  let activeReview = 0;
  const showReview = (index) => {
    activeReview = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== activeReview;
      slide.classList.toggle('is-active', i === activeReview);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeReview);
      if (i === activeReview) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    progress.forEach((segment, i) => segment.classList.toggle('is-active', i === activeReview));
    current.textContent = String(activeReview + 1).padStart(2, '0');
  };
  testimonialCarousel.querySelector('.testimonial-prev').addEventListener('click', () => showReview(activeReview - 1));
  testimonialCarousel.querySelector('.testimonial-next').addEventListener('click', () => showReview(activeReview + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showReview(i)));
  showReview(0);
}
