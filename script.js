/* ==========================================
   PORTFOLIO — script.js
   ========================================== */

// --- Scroll Reveal ---
const revealEls = document.querySelectorAll(
  '.about-grid, .project-card, .skill-group, .contact-sub, .contact-email, .social-links'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--text)';
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));

// --- Smooth scroll for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Stagger project cards on reveal ---
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// --- Language circle animation on scroll ---
const circles = document.querySelectorAll('.circle-fill');
const circleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'stroke-dashoffset 1.4s ease';
        entry.target.classList.add('animate');
        circleObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
circles.forEach(c => circleObserver.observe(c));

// --- Counter Animation ---
const counters = document.querySelectorAll('.fact-num');

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.innerText;
        const hasPlus = text.includes('+');
        const end = parseInt(text.replace('+', ''));
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(end / (duration / 16));

        const counter = setInterval(() => {
          start += step;
          if (start >= end) {
            target.innerText = end + (hasPlus ? '+' : '');
            clearInterval(counter);
          } else {
            target.innerText = start + (hasPlus ? '+' : '');
          }
        }, 16);

        countObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => countObserver.observe(counter));

// --- Card Tilt Effect ---
const tiltCards = document.querySelectorAll('.project-card, .profdev-card, .edu-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });
});

// --- Glowing Cursor ---
const cursor = document.createElement('div');
cursor.classList.add('cursor-glow');
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot follows instantly
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

// Glow follows smoothly with lag
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Grow on hovering links and cards
const hoverEls = document.querySelectorAll('a, button, .project-card, .profdev-card, .edu-card, .langcomp-card');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-expand');
    cursorDot.classList.add('cursor-dot-hide');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-expand');
    cursorDot.classList.remove('cursor-dot-hide');
  });
});

// --- Page Progress Bar ---
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});