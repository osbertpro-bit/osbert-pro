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

