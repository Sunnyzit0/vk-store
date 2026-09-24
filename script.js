const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

function setHidden(el, hidden) {
  if (!el) return;
  if (hidden) el.setAttribute('hidden', '');
  else el.removeAttribute('hidden');
}

let iconsInitialized = false;
function initIcons() {
  if (iconsInitialized || !window.lucide) return;
  lucide.createIcons();
  document.querySelectorAll('.menu-fallback').forEach((el) => setHidden(el, true));
  iconsInitialized = true;
}
initIcons();
window.addEventListener('load', initIcons);

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
if (menuToggle && mainNav) {
  const iconOpen = menuToggle.querySelector('.icon-open');
  const iconClose = menuToggle.querySelector('.icon-close');

  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mainNav.classList.toggle('is-open', open);
    setHidden(iconOpen, open);
    setHidden(iconClose, !open);
  };

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      menuToggle.getAttribute('aria-expanded') === 'true' &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenu(false);
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
