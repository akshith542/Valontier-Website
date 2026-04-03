/* ========================
   VALONTIER — MAIN JS
   ======================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // CUSTOM CURSOR
  // ========================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover states
    document.querySelectorAll('a, button, .filter-tab, .option-card, .budget-pill, .project-card, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  // ========================
  // NAVBAR SCROLL
  // ========================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ========================
  // SCROLL PROGRESS BAR
  // ========================
  const progress = document.getElementById('scrollProgress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      progress.style.width = pct + '%';
    });
  }

  // ========================
  // REVEAL ON SCROLL
  // ========================
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  // ========================
  // HERO PARALLAX
  // ========================
  const heroOrbs = document.querySelectorAll('.hero-bg-orb');
  if (heroOrbs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroOrbs.forEach((orb, i) => {
        orb.style.transform = `translateY(${y * (0.15 + i * 0.07)}px)`;
      });
    });
  }

  // ========================
  // MAGNETIC BUTTONS
  // ========================
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

});
