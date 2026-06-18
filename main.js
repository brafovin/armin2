// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Burger menu (mobile)
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '68px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(8,8,8,0.97)';
    navLinks.style.padding = '20px 48px 28px';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
  });
}

// Animate RPM bars when in view
const bars = document.querySelectorAll('.rpm-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0%';
      requestAnimationFrame(() => {
        setTimeout(() => { entry.target.style.width = width; }, 100);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => {
  const target = bar.style.width;
  bar.style.width = '0%';
  bar.dataset.target = target;
  barObserver.observe(bar);
});
