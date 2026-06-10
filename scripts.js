/* ============================================
   Ambassador Lock and Key LLC – Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky Nav on scroll ----
  const navHeader = document.getElementById('nav-header');
  const onScroll = () => {
    navHeader.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Smooth active link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  // ---- Scroll-triggered fade-in animations ----
  const animEl = document.querySelectorAll('.service-card, .testimonial-card, .contact-card, .why-feature');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${(entry.target.dataset.index || 0) * 0.08}s`;
        entry.target.classList.add('animate-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animEl.forEach((el, i) => {
    el.dataset.index = i % 6;
    el.classList.add('pre-animate');
    fadeObserver.observe(el);
  });

  // ---- Contact form submission ----
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const phone = form.querySelector('#phone').value.trim();

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    // Simulate form submission (no backend)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      successMsg.classList.add('visible');
      setTimeout(() => successMsg.classList.remove('visible'), 8000);
    }, 900);
  });

});

/* ---- CSS injection for animation classes ---- */
const style = document.createElement('style');
style.textContent = `
  .pre-animate {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .5s ease, transform .5s ease;
  }
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  .nav-links a.active {
    color: #e8b64e !important;
  }
`;
document.head.appendChild(style);
