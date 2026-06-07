// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navEl = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  navEl.classList.toggle('menu-open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Smooth scroll helper
function smoothScrollTo(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Desktop nav — smooth scroll on click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  });
});

// Close mobile menu when a link is clicked — smooth scroll after close animation
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      navEl.classList.remove('menu-open');
      document.body.style.overflow = '';
      setTimeout(() => smoothScrollTo(href), 300);
    } else {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      navEl.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  });
});

// Active nav link highlight based on scroll position
const sections = document.querySelectorAll('section[id]');
const desktopLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  desktopLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Contact form submit handler
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = 'transparent';
  btn.style.color = 'var(--accent)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = 'var(--accent)';
    btn.style.color = 'var(--bg)';
    e.target.reset();
  }, 3000);
}

// Scroll-triggered fade-in for cards and detail items
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .detail-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
