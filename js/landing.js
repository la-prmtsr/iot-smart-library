const heroVisual = document.getElementById('heroVisual');
const sections = document.querySelectorAll('main[id], section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const reveals = document.querySelectorAll('.reveal');

function animateOnScroll() {
  const scrollY = window.scrollY;
  const rotateY = -14 + Math.min(scrollY / 45, 18);
  const rotateX = 9 - Math.min(scrollY / 90, 6);
  const translateY = Math.min(scrollY / 18, 28);

  if (heroVisual) {
    heroVisual.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px)`;
  }

  let current = 'home';
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (scrollY >= top) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('show');
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
