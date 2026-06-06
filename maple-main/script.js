// Maple & Main Café — shared interactions (multi-page demo)

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

// Menu tabs (menu page)
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu-panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  tab.classList.add('active');
  const target = document.querySelector('.menu-panel[data-panel="' + tab.dataset.tab + '"]');
  if (target) target.classList.add('active');
}));

// Contact / catering form
document.querySelectorAll('form[data-demo-form]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.querySelectorAll('.field, .form-note, button[type="submit"]').forEach(el => el.style.display = 'none');
    const success = form.querySelector('.form-success');
    if (success) success.classList.add('show');
  });
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
