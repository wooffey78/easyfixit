/* =====================================================
   EasyFixit — script.js
   Réparation smartphones à domicile — Challans (85)
   ===================================================== */

'use strict';

/* ─── 1. HEADER — SCROLL & HAMBURGER ──────────────────── */
(function initHeader() {
  const header      = document.querySelector('header');
  const menuToggle  = document.querySelector('.menu-toggle');
  const nav         = document.querySelector('header nav');

  if (!header) return;

  /* Scroll : ajoute la classe .scrolled au header */
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init au chargement

  /* Menu hamburger */
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Fermeture au clic sur un lien */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Fermeture avec Échap */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }
})();


/* ─── 2. BARRE DE PROGRESSION LECTURE ─────────────────── */
(function initProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);

  window.addEventListener('scroll', function () {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = Math.min(progress, 100) + '%';
  }, { passive: true });
})();


/* ─── 3. PARTICULES HERO ────────────────────────────────── */
(function initHeroParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  /* Créer le conteneur */
  const container = document.createElement('div');
  container.className = 'hero-particles';
  container.setAttribute('aria-hidden', 'true');
  hero.prepend(container);

  const COUNT = 22;
  const colors = [
    'rgba(255,255,255,0.4)',
    'rgba(26,170,85,0.5)',
    'rgba(77,140,232,0.5)',
    'rgba(255,255,255,0.2)',
  ];

  for (let i = 0; i < COUNT; i++) {
    const span = document.createElement('span');
    const size = (Math.random() * 5 + 3) + 'px';
    span.style.cssText = [
      'left:'             + (Math.random() * 100) + '%',
      'width:'            + size,
      'height:'           + size,
      'background:'       + colors[Math.floor(Math.random() * colors.length)],
      'animation-duration:'  + (Math.random() * 10 + 8) + 's',
      'animation-delay:'     + (Math.random() * 10) + 's',
    ].join(';');
    container.appendChild(span);
  }
})();


/* ─── 4. ANIMATIONS REVEAL AU SCROLL ──────────────────── */
(function initReveal() {
  /* Ajouter la classe .reveal à tous les éléments concernés */
  const selectors = [
    '.card',
    '.info-box',
    '.step',
    '.zone-intro',
    '.zone-map-section',
    '.zone-details',
    '.brands-intro .intro-content',
    '.service-detail-card',
    '.section-title',
    '.contact-method',
    '.cta-box',
    '.footer-logo',
    '.footer-links',
    '.footer-legal',
    '.footer-contact',
  ];

  const elements = document.querySelectorAll(selectors.join(','));

  elements.forEach(function (el, index) {
    /* Éviter de re-animer si déjà visible */
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) return;
    el.classList.add('reveal');
  });

  /* Observer */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    observer.observe(el);
  });
})();


/* ─── 5. FLOATING CTA ────────────────────────────────────── */
(function initFloatingCTA() {
  /* Créer le bouton flottant */
  const floatingCTA = document.createElement('div');
  floatingCTA.className = 'floating-cta';
  floatingCTA.setAttribute('aria-label', 'Contact rapide');
  floatingCTA.innerHTML = `
    <a href="tel:+33781513321" class="float-tel" aria-label="Appeler EasyFixit">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      07 81 51 33 21
    </a>
    <a href="mailto:contact@easyfixit-smartphone.com" class="float-email" aria-label="Envoyer un email à EasyFixit">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      Email
    </a>
  `;

  document.body.appendChild(floatingCTA);

  /* Afficher uniquement après le défilement */
  let visible = false;
  window.addEventListener('scroll', function () {
    const shouldShow = window.scrollY > 300;
    if (shouldShow !== visible) {
      visible = shouldShow;
      floatingCTA.style.opacity     = visible ? '1' : '0';
      floatingCTA.style.pointerEvents = visible ? 'auto' : 'none';
      floatingCTA.style.transform   = visible ? 'translateY(0)' : 'translateY(20px)';
    }
  }, { passive: true });

  /* Styles initiaux */
  floatingCTA.style.cssText += 'opacity:0;pointer-events:none;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease;';
})();


/* ─── 6. COMPTEUR ANIMÉ ──────────────────────────────────── */
(function initCounters() {
  /* Cherche des éléments data-count dans la page */
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const step     = 16;
    const steps    = duration / step;
    let current    = 0;

    const timer = setInterval(function () {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);
  }
})();


/* ─── 7. LIEN ACTIF NAVIGATION ───────────────────────────── */
(function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks    = document.querySelectorAll('header nav a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();


/* ─── 8. SMOOTH SCROLL POUR ANCRES INTERNES ──────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector('header')?.offsetHeight || 70;
      const top          = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* ─── 9. HOVER EFFET ONDULATION SUR LES BOUTONS ─────────── */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect   = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size   = Math.max(rect.width, rect.height) * 1.5;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(255,255,255,0.3)',
        'width:'  + size + 'px',
        'height:' + size + 'px',
        'left:'   + x    + 'px',
        'top:'    + y    + 'px',
        'pointer-events:none',
        'animation:rippleAnim 0.6s ease-out forwards',
      ].join(';');

      /* Injecter l'animation si pas encore dans le DOM */
      if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = '@keyframes rippleAnim{from{transform:scale(0);opacity:1}to{transform:scale(1);opacity:0}}';
        document.head.appendChild(style);
      }

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () { ripple.remove(); });
    });
  });
})();


/* ─── 10. COPYRIGHT ANNÉE DYNAMIQUE ─────────────────────── */
(function initYear() {
  document.querySelectorAll('.footer-bottom p').forEach(function (el) {
    el.innerHTML = el.innerHTML.replace(/2026/g, new Date().getFullYear());
  });
})();


/* ─── 11. ACCESSIBILITÉ — SKIP LINK ─────────────────────── */
(function initSkipLink() {
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.textContent = 'Aller au contenu principal';
  skip.style.cssText = [
    'position:fixed',
    'top:-100%',
    'left:1rem',
    'z-index:9999',
    'background:' + '#0d3c82',
    'color:white',
    'padding:0.75rem 1.5rem',
    'border-radius:0 0 0.5rem 0.5rem',
    'font-family:inherit',
    'font-weight:600',
    'transition:top 0.2s',
    'text-decoration:none',
  ].join(';');

  skip.addEventListener('focus', function () { skip.style.top = '0'; });
  skip.addEventListener('blur',  function () { skip.style.top = '-100%'; });

  document.body.prepend(skip);

  /* Ajouter l'id sur le main */
  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'main-content';
})();