// Motion layer: headline intro, count-ups, staggered reveals, scroll-linked
// parallax for the portrait and project panels, a timeline that draws itself,
// and a cursor spotlight on cards. Everything is skipped for visitors who ask
// their system for reduced motion.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.add('motion-ready');
  if (reduce) root.classList.add('reduce-motion');

  /* Headline: split into words so they can rise in one after another */
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span');
            w.className = 'word';
            w.style.setProperty('--i', i++);
            w.textContent = part;
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    };
    walk(el);
    el.classList.remove('words-in');
    void el.offsetWidth; // restart the animation
    el.classList.add('words-in');
  }
  const h1 = document.querySelector('.hero h1');
  if (h1 && !reduce) {
    h1.classList.add('split');
    splitWords(h1);
    // The language switch replaces the headline's HTML, so split it again.
    document.addEventListener('langchange', () => splitWords(h1));
  }

  /* Stagger reveals inside groups */
  ['.numbers', '.tiles', '.toolkit', '.quotes', '.timeline', '.research-grid', '.hero-actions'].forEach((sel) => {
    document.querySelectorAll(sel).forEach((group) => {
      group.querySelectorAll(':scope > .reveal').forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
      });
    });
  });

  /* Count the highlight numbers up when they come into view */
  const counters = [...document.querySelectorAll('.stat strong')].filter((el) => /^\d/.test(el.textContent.trim()));
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countIO.unobserve(entry.target);
      const el = entry.target;
      const m = el.textContent.trim().match(/^([\d.,]+)(.*)$/);
      if (!m) return;
      const target = parseFloat(m[1].replace(/,/g, ''));
      const decimals = (m[1].split('.')[1] || '').length;
      const suffix = m[2];
      const start = performance.now();
      const dur = 1600;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  if (!reduce) counters.forEach((el) => countIO.observe(el));

  /* Timeline: a line that draws down the journey, with a dot per role */
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const rail = document.createElement('div');
    rail.className = 'timeline-rail';
    rail.setAttribute('aria-hidden', 'true');
    rail.innerHTML = '<span></span>';
    timeline.appendChild(rail);
  }

  /* Cursor spotlight on cards */
  document.querySelectorAll('.tile, .tool-group, .paper, .award, .stat').forEach((card) => {
    card.classList.add('spot');
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* Scroll-linked motion, batched into one frame */
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.nav-progress');
  const portrait = document.querySelector('.hero-portrait');
  const features = [...document.querySelectorAll('.feature')];
  const clamp = (v) => Math.max(0, Math.min(1, v));
  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - vh;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (reduce) return;

    if (portrait) portrait.style.setProperty('--hp', clamp(y / vh).toFixed(3));

    features.forEach((f) => {
      const top = f.getBoundingClientRect().top;
      // 0 when the panel's top touches the bottom of the screen, 1 when it reaches 20% from the top
      f.style.setProperty('--p', clamp((vh - top) / (vh * 0.8)).toFixed(3));
    });

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = clamp((vh * 0.7 - r.top) / r.height);
      timeline.style.setProperty('--tp', p.toFixed(3));
      timeline.querySelectorAll(':scope > li').forEach((li) => {
        li.classList.toggle('passed', li.getBoundingClientRect().top < vh * 0.7);
      });
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
