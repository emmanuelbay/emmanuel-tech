// Add your JavaScript code here/* Smooth scrolling for internal links */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* Portfolio image loading using Unsplash Source
   Note: This uses the free Unsplash Source endpoint. No API key required.
   Images are randomized by a unique `sig` parameter to avoid repeats.
*/
const portfolioConfig = [
];

function buildUnsplashUrl({ width = 800, height = 600, query = 'creative', sig = 1 }) {
  // Unsplash Source: random image by query
  return `https://source.unsplash.com/random/${width}x${height}/?${encodeURIComponent(query)}&sig=${sig}`;
}

async function loadCategory({ id, countId, query }, items = 8) {
  const grid = document.getElementById(id);
  const count = document.getElementById(countId);
  if (!grid) return;

  grid.innerHTML = ''; // clear
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < items; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'grid__item';

    const img = document.createElement('img');
    img.alt = 'Portfolio image';
    img.loading = 'lazy';

    // Randomize signature + vary aspect ratios slightly for visual rhythm
    const sig = Math.floor(Math.random() * 100000) + i;
    const width = [600, 700, 800, 900][i % 4];
    const height = [450, 525, 600, 675][i % 4];
    img.src = buildUnsplashUrl({ width, height, query, sig });

    wrapper.appendChild(img);
    fragment.appendChild(wrapper);
  }

  grid.appendChild(fragment);
  if (count) count.textContent = `${items} photos`;
}

// Initialize portfolio sections
document.addEventListener('DOMContentLoaded', () => {
  portfolioConfig.forEach((c) => loadCategory(c, 8));
});

/* Booking form validation */
const form = document.getElementById('bookingForm');
const fields = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  service: document.getElementById('service'),
  message: document.getElementById('message'),
};

const errors = {
  fullName: document.getElementById('error-fullName'),
  email: document.getElementById('error-email'),
  phone: document.getElementById('error-phone'),
  service: document.getElementById('error-service'),
  message: document.getElementById('error-message'),
};

function clearErrors() {
  Object.values(errors).forEach((el) => (el.textContent = ''));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());
}

function isValidPhone(value) {
  // Basic international/UG number check: digits, spaces, plus, dashes
  return /^[+]?[\d\s-]{7,}$/.test(String(value));
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;

  // Full Name
  if (!fields.fullName.value.trim() || fields.fullName.value.trim().length < 2) {
    errors.fullName.textContent = 'Please enter your full name.';
    valid = false;
  }

  // Email
  if (!isValidEmail(fields.email.value)) {
    errors.email.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // Phone
  if (!isValidPhone(fields.phone.value)) {
    errors.phone.textContent = 'Please enter a valid phone number.';
    valid = false;
  }

  // Service
  if (!fields.service.value) {
    errors.service.textContent = 'Please select a service.';
    valid = false;
  }

  // Message
  if (!fields.message.value.trim() || fields.message.value.trim().length < 10) {
    errors.message.textContent = 'Please provide a brief description (at least 10 characters).';
    valid = false;
  }

  if (!valid) return;

  // Simulate success (front-end only)
  const successEl = document.getElementById('formSuccess');
  successEl.textContent = 'Thank you! Your booking has been received. We’ll get back to you shortly.';
  form.reset();

  // Optional: Smooth scroll to top of contact section for confirmation visibility
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});