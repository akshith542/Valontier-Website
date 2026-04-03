/* ========================
   HOME PAGE — WORD SWAP
   ======================== */

document.addEventListener('DOMContentLoaded', () => {

  const words = [
    'beautiful.',
    'daring.',
    'unforgettable.',
    'luxurious.',
    'playful.',
    'yours.',
  ];

  const el = document.getElementById('wordSwap');
  if (!el) return;

  let index = 0;

  function swap() {
    // Exit animation
    el.classList.add('exit');

    setTimeout(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.classList.remove('exit');
      // Re-trigger enter animation
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = '';
    }, 380);
  }

  setInterval(swap, 2400);
});
