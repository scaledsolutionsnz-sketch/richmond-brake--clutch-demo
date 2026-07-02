// Richmond Brake & Clutch — shared interactions

// Intro overlay
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if (intro) setTimeout(() => intro.classList.add('done'), 1500);
});

// Nav scroll state
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile menu
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('x');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('x');
    links.classList.remove('open');
  }));
}

// Hero slideshow
const slides = document.querySelectorAll('.hero-slide');
if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 6000);
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Reviews: reveal the full Google list
const revMore = document.getElementById('revMore');
if (revMore) {
  revMore.addEventListener('click', () => {
    document.querySelectorAll('.rev.is-hidden').forEach(el => {
      el.classList.remove('is-hidden');
      el.classList.add('in');
    });
    revMore.parentElement.style.display = 'none';
  });
}
