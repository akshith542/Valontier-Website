/* ========================
   SIGNUP FORM JS
   ======================== */

let currentStepNum = 1;

function nextStep(stepNum) {
  if (stepNum > 1 && !validateStep(currentStepNum)) return;

  const prev = document.getElementById('step' + currentStepNum);
  const next = document.getElementById('step' + stepNum);

  if (prev) {
    prev.style.opacity = '0';
    prev.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      prev.classList.remove('active');
      next.classList.add('active');
      next.style.opacity = '0';
      next.style.transform = 'translateX(20px)';
      requestAnimationFrame(() => {
        next.style.transition = 'opacity 0.4s, transform 0.4s';
        next.style.opacity = '1';
        next.style.transform = '';
      });
    }, 200);
  }

  currentStepNum = stepNum;
  updateStepIndicator(stepNum);
  document.getElementById('currentStep').textContent = stepNum;

  // Scroll form into view
  document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function prevStep(stepNum) {
  const prev = document.getElementById('step' + currentStepNum);
  const next = document.getElementById('step' + stepNum);

  prev.style.opacity = '0';
  prev.style.transform = 'translateX(20px)';
  setTimeout(() => {
    prev.classList.remove('active');
    next.classList.add('active');
    next.style.opacity = '0';
    next.style.transform = 'translateX(-20px)';
    requestAnimationFrame(() => {
      next.style.transition = 'opacity 0.4s, transform 0.4s';
      next.style.opacity = '1';
      next.style.transform = '';
    });
  }, 200);

  currentStepNum = stepNum;
  updateStepIndicator(stepNum);
  document.getElementById('currentStep').textContent = stepNum;
}

function updateStepIndicator(active) {
  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i + 1 < active) dot.classList.add('completed');
    if (i + 1 === active) dot.classList.add('active');
  });
}

function validateStep(stepNum) {
  let valid = true;

  if (stepNum === 1) {
    const name = document.getElementById('name');
    const email = document.getElementById('email');

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    } else {
      clearError(name);
    }

    if (!email.value.trim() || !email.value.includes('@')) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(email);
    }
  }

  return valid;
}

function showError(input, msg) {
  const group = input.closest('.form-group');
  group.classList.add('error');
  let err = group.querySelector('.error-msg');
  if (!err) {
    err = document.createElement('div');
    err.className = 'error-msg';
    group.appendChild(err);
  }
  err.textContent = msg;
  err.style.display = 'block';
}

function clearError(input) {
  const group = input.closest('.form-group');
  group.classList.remove('error');
  const err = group.querySelector('.error-msg');
  if (err) err.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {

  // Character count for textarea
  const textarea = document.getElementById('description');
  const charCount = document.getElementById('charCount');
  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const count = textarea.value.length;
      charCount.textContent = count;
      if (count > 900) {
        charCount.style.color = '#E84040';
      } else {
        charCount.style.color = '';
      }
    });

    textarea.setAttribute('maxlength', 1000);
  }

  // Form submission
  const form = document.getElementById('signupForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateStep(3)) return;

      const desc = document.getElementById('description');
      if (!desc.value.trim()) {
        showError(desc, 'Please describe your project.');
        return;
      }
      clearError(desc);

      const submitBtn = document.getElementById('submitBtn');
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';

      // Collect form data
      const data = new FormData(form);

      fetch('https://formspree.io/f/meeprvpy', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');

        form.style.opacity = '0';
        form.style.transform = 'translateY(-10px)';
        form.style.transition = 'opacity 0.4s, transform 0.4s';

        setTimeout(() => {
          form.style.display = 'none';
          document.querySelector('.step-indicator').style.display = 'none';
          document.querySelector('.step-label').style.display = 'none';

          const ref = Math.random().toString(36).substring(2, 8).toUpperCase();
          document.getElementById('refNumber').textContent = ref;

          success.classList.add('visible');
        }, 400);
      })
      .catch(() => {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Send My Brief';
        alert('Something went wrong. Please try again or email us directly at contact@volontier.com');
      });
    });
  }

  // Live validation on blur
  document.querySelectorAll('input[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        showError(input, 'This field is required.');
      } else {
        clearError(input);
      }
    });

    input.addEventListener('input', () => {
      if (input.value.trim()) {
        clearError(input);
      }
    });
  });

});
