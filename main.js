/* ========================
   VOLONTIER — MAIN JS
   ======================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // NAVBAR SCROLL
  // ========================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ========================
  // HAMBURGER MENU
  // ========================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    // close on outside tap
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ========================
  // SCROLL PROGRESS BAR
  // ========================
  const progress = document.getElementById('scrollProgress');
  if (progress) {
    let rafPending = false;
    window.addEventListener('scroll', () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = total > 0 ? window.scrollY / total : 0;
        progress.style.transform = `scaleX(${ratio})`;
        rafPending = false;
      });
    }, { passive: true });
  }

  // ========================
  // REVEAL ON SCROLL
  // ========================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  // ========================
  // PARALLAX ORBS
  // ========================
  const orbs = document.querySelectorAll('.hero-bg-orb');
  if (orbs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      orbs.forEach((orb, i) => {
        orb.style.transform = `translateY(${y * (0.12 + i * 0.06)}px)`;
      });
    }, { passive: true });
  }

  // ========================
  // NUMBER COUNTER ANIMATION
  // ========================
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1800;
        const start = performance.now();
        const isFloat = el.dataset.float;

        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = isFloat ? (target * eased).toFixed(1) : Math.round(target * eased);
          el.textContent = prefix + val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  // ========================
  // TILT CARDS
  // ========================
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -12;
      const ry = ((e.clientX - cx) / rect.width) * 12;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ========================
  // MARQUEE PAUSE ON HOVER
  // ========================
  const track = document.querySelector('.marquee-track');
  if (track) {
    track.closest('.marquee-wrap')?.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.closest('.marquee-wrap')?.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  // ========================
  // HERO MOUSE PARALLAX
  // ========================
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroVisual.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    });
  }

  // ========================
  // CHAR SPLIT ANIMATION
  // ========================
  document.querySelectorAll('.split-text').forEach(el => {
    const text = el.textContent;
    el.innerHTML = text.split('').map((ch, i) =>
      ch === ' '
        ? ' '
        : `<span class="char" style="display:inline-block;animation-delay:${i * 0.035}s">${ch}</span>`
    ).join('');
  });

});
