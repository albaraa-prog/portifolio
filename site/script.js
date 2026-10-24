document.documentElement.classList.add('js');

// Reveal elements as they scroll into view
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Mobile menu
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Copy email
const toast = document.querySelector('.toast');
function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('.copy-email').forEach((btn) => btn.addEventListener('click', async () => {
  const email = btn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email copied');
  } catch {
    window.location.href = `mailto:${email}`;
  }
}));

document.getElementById('year').textContent = new Date().getFullYear();

// English / Arabic switch: elements carry their Arabic in data-ar
const langBtn = document.querySelector('.lang-toggle');
function setLang(lang) {
  document.querySelectorAll('[data-ar]').forEach((el) => {
    if (!el.dataset.en) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === 'ar' ? el.dataset.ar : el.dataset.en;
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  langBtn.textContent = lang === 'ar' ? 'EN' : 'ع';
  langBtn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  try { localStorage.setItem('lang', lang); } catch {}
}
langBtn.addEventListener('click', () => setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
let savedLang = null;
try { savedLang = localStorage.getItem('lang'); } catch {}
if (savedLang === 'ar' || (!savedLang && navigator.language.startsWith('ar'))) setLang('ar');
