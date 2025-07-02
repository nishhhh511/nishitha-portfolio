// Responsive menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
      navMenu.classList.remove('open');
    }
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
  // Set initial theme
  if (localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.textContent = '🌙';
  }
}

// Animated typing effect in hero
const typingText = document.getElementById('typing-text');
if (typingText) {
  const fullText = typingText.textContent;
  typingText.textContent = '';
  let i = 0;
  function type() {
    if (i <= fullText.length) {
      typingText.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, 30);
    }
  }
  setTimeout(type, 400);
}

// Scroll-triggered fade-in-up animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll('.animate-fade-in-up');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.style.animationPlayState = 'running';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn?.classList.add('show-scroll');
  } else {
    scrollToTopBtn?.classList.remove('show-scroll');
  }
});
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Navbar section highlight on scroll & smooth scrolling for nav links
const navLinks = document.querySelectorAll('#navbar-links a');
const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href'));
// Smooth scrolling for nav links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
        mobileMenu?.classList.add('hidden');
      }
    }
  });
});
function highlightNav() {
  let scrollPos = window.scrollY + 120;
  sectionIds.forEach((id, idx) => {
    const section = document.querySelector(id);
    if (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active-nav'));
        navLinks[idx].classList.add('active-nav');
      }
    }
  });
}
window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);

// Tooltips accessibility (aria-label)
document.querySelectorAll('.tooltip a').forEach(el => {
  const span = el.parentElement.querySelector('.tooltip-text');
  if (span) el.setAttribute('aria-label', span.textContent);
});

// Prevent contact form submit (UI only)
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.reset();
    contactForm.querySelector('button[type="submit"]').textContent = 'Message Sent!';
    setTimeout(() => {
      contactForm.querySelector('button[type="submit"]').textContent = 'Send Message';
    }, 2000);
  });
} 