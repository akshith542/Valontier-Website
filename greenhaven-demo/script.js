// GreenHaven Landscaping — one-page demo interactions
// Demo website designed by Volontier for portfolio use.

// Keep nav offset + scroll anchoring in sync with the (wrappable) demo banner height
const banner = document.querySelector('.demo-banner');
function syncBannerHeight() {
  if (banner) document.documentElement.style.setProperty('--banner-h', banner.offsetHeight + 'px');
}
syncBannerHeight();
window.addEventListener('resize', syncBannerHeight);
window.addEventListener('load', syncBannerHeight);

// Nav scroll state + back-to-top visibility
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (nav) nav.classList.toggle('scrolled', y > 20);
  if (toTop) toTop.classList.toggle('show', y > 600);
});
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
function closeMenu() {
  hamburger && hamburger.classList.remove('open');
  mobileMenu && mobileMenu.classList.remove('open');
  overlay && overlay.classList.remove('open');
}
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
  });
}
if (overlay) overlay.addEventListener('click', closeMenu);
if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Demo quote form — show confirmation in place, no real submission
document.querySelectorAll('form[data-demo-form]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.querySelectorAll('.field, .field-row, .form-note, button[type="submit"]').forEach(el => el.style.display = 'none');
    const success = form.querySelector('.form-success');
    if (success) success.classList.add('show');
  });
});

// Interactive services showcase (home)
const scItems = document.querySelectorAll('.sc-item');
const scImg = document.getElementById('scImg');
const scTitle = document.getElementById('scTitle');
const scDesc = document.getElementById('scDesc');
if (scItems.length && scImg) {
  const canHover = window.matchMedia('(hover: hover)').matches;
  function activateShowcase(item) {
    if (item.classList.contains('active')) return;
    scItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    scTitle.innerHTML = item.dataset.title;
    scDesc.textContent = item.dataset.desc;
    // Preload the new image, then crossfade it in
    scImg.classList.add('swapping');
    const next = new Image();
    next.onload = () => { scImg.src = item.dataset.img; scImg.classList.remove('swapping'); };
    next.src = item.dataset.img;
  }
  scItems.forEach(item => {
    item.addEventListener('click', () => activateShowcase(item));
    if (canHover) item.addEventListener('mouseenter', () => activateShowcase(item));
  });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
