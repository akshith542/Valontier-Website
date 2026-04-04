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

  const slotA = document.getElementById('wordSwapA');
  const slotB = document.getElementById('wordSwapB');
  if (!slotA || !slotB) return;

  let index = 0;
  let active = slotA;   // currently visible slot
  let hidden = slotB;   // off-screen slot

  function swap() {
    index = (index + 1) % words.length;

    // Load next word into the hidden slot (below, invisible)
    hidden.textContent = words[index];
    hidden.setAttribute('aria-hidden', 'false');

    // Force a paint so the browser registers the starting state
    hidden.getBoundingClientRect();

    // Slide active out upward
    active.classList.remove('swap-in');
    active.classList.add('swap-exit');
    active.setAttribute('aria-hidden', 'true');

    // Slide hidden in from below
    hidden.classList.remove('swap-enter');
    hidden.classList.add('swap-in');

    // After exit transition, reset exited slot back below
    const exited = active;
    setTimeout(() => {
      exited.classList.remove('swap-exit');
      exited.classList.add('swap-enter');
      exited.textContent = '';
    }, 420);

    // Swap references
    [active, hidden] = [hidden, active];
  }

  setInterval(swap, 2600);
});
