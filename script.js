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



/* Section 7 testimonial carousel: three cards per set */
const testimonialSection = document.querySelector('#testimonials');
if (testimonialSection) {
  const testimonialCards = [...testimonialSection.querySelectorAll('.testimonial-card')];
  const pageButtons = [...testimonialSection.querySelectorAll('.testimonials-pagination button')];
  const timelineSegments = [...testimonialSection.querySelectorAll('.testimonial-timeline span')];
  const currentLabel = testimonialSection.querySelector('.testimonial-set-current');
  const previousButton = testimonialSection.querySelector('[data-testimonial-prev]');
  const nextButton = testimonialSection.querySelector('[data-testimonial-next]');
  const pageCount = Math.ceil(testimonialCards.length / 3);
  let currentPage = 0;

  const showTestimonialPage = (page) => {
    currentPage = (page + pageCount) % pageCount;
    testimonialCards.forEach((card, index) => {
      card.hidden = index < currentPage * 3 || index >= (currentPage + 1) * 3;
    });
    pageButtons.forEach((button, index) => {
      const active = index === currentPage;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    timelineSegments.forEach((segment, index) => segment.classList.toggle('is-current', index === currentPage));
    currentLabel.textContent = String(currentPage + 1).padStart(2, '0');
  };

  pageButtons.forEach((button, index) => button.addEventListener('click', () => showTestimonialPage(index)));
  previousButton.addEventListener('click', () => showTestimonialPage(currentPage - 1));
  nextButton.addEventListener('click', () => showTestimonialPage(currentPage + 1));
  showTestimonialPage(0);
}


/* Section 8 contact links carousel: show three, then three, then centre the final two */
const contactSection = document.querySelector('#contact');
if (contactSection) {
  const contactGrid = contactSection.querySelector('.contact-links');
  const contactCards = [...contactGrid.querySelectorAll('.contact-link')];
  const contactDots = [...contactSection.querySelectorAll('.contact-page-dots button')];
  const contactLabel = contactSection.querySelector('.contact-page-label');
  const contactPrev = contactSection.querySelector('[data-contact-prev]');
  const contactNext = contactSection.querySelector('[data-contact-next]');
  const contactPageCount = Math.ceil(contactCards.length / 3);
  let contactPage = 0;

  const showContactPage = (page) => {
    contactPage = Math.max(0, Math.min(contactPageCount - 1, page));
    const first = contactPage * 3;
    contactCards.forEach((card, index) => {
      card.hidden = index < first || index >= first + 3;
    });
    contactGrid.classList.toggle('is-last-page', contactPage === contactPageCount - 1 && contactCards.length % 3 === 2);
    contactDots.forEach((dot, index) => {
      const active = index === contactPage;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    contactLabel.innerHTML = String(contactPage + 1).padStart(2, '0') + ' <i>/</i> ' + String(contactPageCount).padStart(2, '0');
    contactPrev.disabled = contactPage === 0;
    contactNext.disabled = contactPage === contactPageCount - 1;
  };

  contactDots.forEach((dot, index) => dot.addEventListener('click', () => showContactPage(index)));
  contactPrev.addEventListener('click', () => showContactPage(contactPage - 1));
  contactNext.addEventListener('click', () => showContactPage(contactPage + 1));
  showContactPage(0);
}
