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
    // Exit
    el.classList.remove('entering');
    el.classList.add('exiting');

    setTimeout(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.classList.remove('exiting');
      el.classList.add('entering');
    }, 370);
  }

  // Kick off the initial entering animation
  el.classList.add('entering');
  setInterval(swap, 2600);
});
