/* ==========================================================================
   DK DESIGNS STUDIO - 3D Parallax & Interactive Master Module (Cybernetic & Holographic Edition)
   Features:
   - GPU Accelerated Lerped Custom Cursor & Follower
   - Holographic Levitation & 3D Tilt Card Engine with Animated Specular Light Glare
   - Cybernetic Constellation & 3D Geometry Hero Canvas Engine with Mouse Energy Well
   - Physics Inertia Mouse Parallax Depth Engine (60/120 FPS RAF)
   - Hardware Accelerated ScaleX Scroll Progress Bar
   - Filter & Modal System with Fluid Card Transitions
   - Dark / Light Mode Switcher with localStorage persistence
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initThemeToggle();
  initCustomCursor();
  init3DTiltCards();
  init3DGlobalParallax();
  initHero3DCanvas();
  initNavbar();
  initSmoothScrolling();
  initPortfolio();
  initCaseStudyModal();
  initSkills();
  initCounters();
  initTestimonials();
  initContactForm();
  initBackToTop();
  init3DScrollReveal();
});

/* --------------------------------------------------------------------------
   00. TOP SCROLL PROGRESS BAR ENGINE
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  let ticking = false;

  function updateProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
}

/* --------------------------------------------------------------------------
   0. DARK / LIGHT THEME TOGGLE ENGINE (Interactive Pill Switch)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-switch');
  if (!toggleBtns.length) return;

  const savedTheme = localStorage.getItem('dk-theme') || 'light';
  const isLight = savedTheme === 'light';

  applyTheme(isLight);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isNowLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('dk-theme', isNowLight ? 'light' : 'dark');
      applyTheme(isNowLight);
    });
  });

  function applyTheme(isLightMode) {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-checked', isLightMode ? 'true' : 'false');
      const thumbIcon = btn.querySelector('.thumb-icon');
      if (thumbIcon) {
        thumbIcon.className = isLightMode ? 'thumb-icon ri-sun-fill' : 'thumb-icon ri-moon-fill';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   1. CUSTOM 3D CURSOR REMOVED
   -------------------------------------------------------------------------- */
function initCustomCursor() { }

/* --------------------------------------------------------------------------
   2. HOLOGRAPHIC LEVITATION & TILT CARD ENGINE (FIXED HOVER JITTER BUG)
   -------------------------------------------------------------------------- */
function init3DTiltCards() {
  // Disabled JS rotate tilt animation to prevent hover jitter/glitch
}

/* --------------------------------------------------------------------------
   3. GLOBAL MOUSE PERSPECTIVE 3D PARALLAX INERTIA ENGINE
   -------------------------------------------------------------------------- */
function init3DGlobalParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax-depth]');
  if (!parallaxEls.length) return;

  let targetDx = 0, targetDy = 0;
  let currentDx = 0, currentDy = 0;

  function updatePointerPos(clientX, clientY) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetDx = (clientX - cx) / cx;
    targetDy = (clientY - cy) / cy;
  }

  window.addEventListener('pointermove', (e) => {
    updatePointerPos(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    updatePointerPos(e.clientX, e.clientY);
  }, { passive: true });

  function renderParallax() {
    currentDx += (targetDx - currentDx) * 0.07;
    currentDy += (targetDy - currentDy) * 0.07;

    parallaxEls.forEach(el => {
      const depth = parseFloat(el.getAttribute('data-parallax-depth')) || 0.05;
      const moveX = currentDx * depth * 80;
      const moveY = currentDy * depth * 80;
      const rotateZ = currentDx * depth * 5;

      el.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0px) rotate(${rotateZ.toFixed(2)}deg)`;
    });

    requestAnimationFrame(renderParallax);
  }
  requestAnimationFrame(renderParallax);
}

/* --------------------------------------------------------------------------
   4. MULTI-DISCIPLINARY CREATIVE 3D HERO CANVAS ENGINE
   -------------------------------------------------------------------------- */
function initHero3DCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
  let width, height;
  let time = 0;
  let mouse = { x: null, y: null, targetX: null, targetY: null };
  let stardust = [];
  let prisms = [];
  let sparks = [];
  let isCanvasVisible = true;
  let animFrameId = null;

  // IntersectionObserver to pause heavy canvas animation when hero is offscreen
  const heroContainer = document.getElementById('home') || canvas;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !animFrameId) {
          animate();
        }
      });
    }, { threshold: 0.02 });
    observer.observe(heroContainer);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    initScene();
  }

  window.addEventListener('resize', resize, { passive: true });

  function updateHeroMouse(clientX, clientY) {
    mouse.targetX = clientX;
    mouse.targetY = clientY;
  }

  window.addEventListener('pointermove', (e) => {
    updateHeroMouse(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    updateHeroMouse(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });

  window.addEventListener('click', (e) => {
    const sparkCount = isMobile ? 8 : 20;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5);
      const speed = Math.random() * 4 + 2;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1,
        alpha: 1,
        color: i % 2 === 0 ? '#D946EF' : '#06B6D4'
      });
    }
  }, { passive: true });

  function initScene() {
    stardust = [];
    const maxParticles = isMobile ? 22 : 80;
    const count = Math.min(maxParticles, Math.floor((width * height) / (isMobile ? 24000 : 16000)));
    const colors = ['#D946EF', '#7C3AED', '#06B6D4', '#38BDF8'];

    for (let i = 0; i < count; i++) {
      stardust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
        vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
        radius: Math.random() * (isMobile ? 1.8 : 2.5) + 1,
        color: colors[i % colors.length],
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    prisms = [];
    const prismCount = isMobile ? 3 : 8;
    for (let i = 0; i < prismCount; i++) {
      prisms.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobile ? 22 : 35) + 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.012,
        sides: i % 2 === 0 ? 4 : 6,
        color: colors[i % colors.length]
      });
    }
  }

  function drawPrisms() {
    const isLight = document.body.classList.contains('light-mode');
    ctx.save();

    prisms.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;

      if (p.x < -40 || p.x > width + 40) p.vx *= -1;
      if (p.y < -40 || p.y > height + 40) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          const force = (1 - dist / 220) * 2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);

      ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.25)' : p.color;
      ctx.globalAlpha = isLight ? 0.3 : 0.45;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = isMobile ? 0 : (isLight ? 4 : 12);

      ctx.beginPath();
      const step = (Math.PI * 2) / p.sides;
      for (let i = 0; i < p.sides; i++) {
        const px = Math.cos(step * i) * p.size;
        const py = Math.sin(step * i) * p.size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < p.sides; i++) {
        const px = Math.cos(step * i + Math.PI / p.sides) * (p.size * 0.5);
        const py = Math.sin(step * i + Math.PI / p.sides) * (p.size * 0.5);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    });

    ctx.restore();
  }

  function drawStardustMesh() {
    const isLight = document.body.classList.contains('light-mode');
    ctx.save();

    for (let i = 0; i < stardust.length; i++) {
      const p = stardust[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 200) {
          const force = (1 - mdist / 200) * 2;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;

          ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.3)' : 'rgba(6, 182, 212, 0.4)';
          ctx.lineWidth = 1;
          ctx.globalAlpha = (1 - mdist / 200) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = isLight ? '#7C3AED' : p.color;
      ctx.globalAlpha = isLight ? 0.45 : p.alpha;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = isMobile ? 0 : (isLight ? 5 : 12);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < stardust.length; j++) {
        const p2 = stardust[j];
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = isMobile ? 90 : 130;

        if (dist < maxDist) {
          const linkAlpha = (1 - dist / maxDist) * (isLight ? 0.18 : 0.3);
          ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(217, 70, 239, 0.25)';
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = linkAlpha;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }

  function drawClickSparks() {
    ctx.save();
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.95;
      s.vy *= 0.95;
      s.alpha -= 0.025;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = isMobile ? 0 : 10;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function animate() {
    if (!isCanvasVisible) {
      animFrameId = null;
      return;
    }

    time += 0.015;

    if (mouse.targetX !== null && mouse.targetY !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.14;
        mouse.y += (mouse.targetY - mouse.y) * 0.14;
      }
    }

    ctx.clearRect(0, 0, width, height);

    drawPrisms();
    drawStardustMesh();
    drawClickSparks();

    animFrameId = requestAnimationFrame(animate);
  }

  resize();
  animate();
}

/* --------------------------------------------------------------------------
   6. NAVBAR STICKY & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const backdrop = document.getElementById('nav-backdrop');
  const sections = document.querySelectorAll('section[id]');

  let ticking = false;
  let cachedSections = [];

  function cacheSectionDimensions() {
    cachedSections = Array.from(sections).map(sec => ({
      id: sec.getAttribute('id'),
      top: sec.offsetTop - 150,
      height: sec.offsetHeight
    }));
  }

  cacheSectionDimensions();
  window.addEventListener('resize', () => {
    cacheSectionDimensions();
    if (window.innerWidth > 768) {
      closeDrawer();
    }
  }, { passive: true });

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const scrollY = window.pageYOffset + 160;
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLinksForId = document.querySelectorAll(`.nav-link[href*="${id}"]`);

      if (navLinksForId.length) {
        if (isAtBottom && id === 'contact') {
          navLinksForId.forEach(l => l.classList.add('active'));
        } else if (!isAtBottom && scrollY >= top && scrollY < top + height) {
          navLinksForId.forEach(l => l.classList.add('active'));
        } else {
          navLinksForId.forEach(l => l.classList.remove('active'));
        }
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  function closeDrawer() {
    if (navLinks) navLinks.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (mobileBtn && mobileBtn.querySelector('i')) {
      mobileBtn.querySelector('i').className = 'ri-menu-line';
    }
  }

  function openDrawer() {
    if (navLinks) navLinks.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (mobileBtn && mobileBtn.querySelector('i')) {
      mobileBtn.querySelector('i').className = 'ri-close-line';
    }
  }

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    const allDrawerLinks = document.querySelectorAll('.nav-links a');
    allDrawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6.5. GLOBAL SMOOTH SCROLLING FOR HASH LINKS
   -------------------------------------------------------------------------- */
function initSmoothScrolling() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') {
      e.preventDefault();
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navbar = document.querySelector('.navbar');
      const navHeight = navbar ? navbar.offsetHeight : 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}

/* --------------------------------------------------------------------------
   7. PORTFOLIO FILTERING WITH FLUID CARD TRANSITIONS
   -------------------------------------------------------------------------- */
function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  function updatePortfolioDisplay(filterValue) {
    projectCards.forEach(card => {
      const rawCategories = card.getAttribute('data-category') || '';
      const categories = rawCategories.split(' ');
      const isMatch = filterValue === 'all' || categories.includes(filterValue);

      if (isMatch) {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        requestAnimationFrame(() => {
          card.classList.add('active');
          card.style.opacity = '1';
          card.style.transform = 'perspective(1000px) scale(1) translateY(0)';
          card.style.pointerEvents = 'auto';
        });
      } else {
        card.classList.remove('active');
        card.style.opacity = '0';
        card.style.transform = 'perspective(1000px) scale(0.92) translateY(20px)';
        card.style.pointerEvents = 'none';
        setTimeout(() => {
          if (!card.classList.contains('active')) {
            card.style.display = 'none';
          }
        }, 350);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      updatePortfolioDisplay(filterValue);
    });
  });

  updatePortfolioDisplay('branding');
}

/* --------------------------------------------------------------------------
   8. CASE STUDY MODAL SYSTEM
   -------------------------------------------------------------------------- */
const caseStudyData = {
  'riits-metal-craft-packaging': {
    title: 'RIITS Metal Craft — Luxury Packaging Design',
    category: 'Packaging Design & Branding',
    client: 'Sithiq S., Proprietor of RIITS Metal Craft',
    year: '2026',
    deliverables: 'Packaging Box Design, Custom Tissue Paper Wrap, Branded Swing Hangtag, Thank-You Customer Card, Rigid Outer Box, Brand Identity Application',
    img: './assets/images/riits-metal-craft-packaging.jpg',
    overview: 'This luxury packaging design was created for RIITS Metal Craft, a premier metal fabrication and architectural solutions provider established by Sithiq S. The project encompasses a complete industrial-luxury unboxing experience, including a premium matte-teal and copper corrugated mailer box, branded tissue wrapping paper, a custom die-cut swing hangtag, a sleek secondary rigid cube box, and a gold-accented customer appreciation card.',
    problem: 'Architectural metal products and high-grade fabrication components often suffer from plain industrial packaging. RIITS Metal Craft needed an executive, high-end packaging solution that reflects their motto "The Art of Metal" (Stronger Spaces, Better Tomorrow), instills client trust, and elevates the physical delivery of custom metal works and architectural hardware.',
    solution: 'Engineered an executive packaging system centered on deep teal (#285F5B), metallic copper, and matte black tones. The primary mailer box showcases the metallic shield-and-gear emblem, prominent architectural imagery, key competency icons (Steel Fabrication, Architectural Solutions, Custom Metal Works), and the tagline "The Art of Metal". The inner unboxing experience features custom-patterned tissue paper, a swing tag, and a gold foil-accented thank-you card ("Thank You FOR BEING A PART OF OUR JOURNEY").',
    designElements: [
      { icon: 'ri-box-3-fill', title: 'Primary Corrugated Mailer Box', desc: 'Matte dark-teal and black mailer box featuring copper diagonal stripes, gear-shield logo, slogan "STRONGER SPACES BETTER TOMORROW", and architectural facade hero graphics.' },
      { icon: 'ri-copper-diamond-line', title: 'Corporate Color Hierarchy', desc: 'Uses deep teal, metallic copper accents, and titanium black to convey structural strength, engineering precision, and luxury craftsmanship.' },
      { icon: 'ri-shield-star-fill', title: 'Custom Patterned Tissue Wrap', desc: 'Teal wrapping tissue printed with a repeating grid of orange-and-copper RIITS shield monograms for an executive unboxing experience.' },
      { icon: 'ri-price-tag-3-line', title: 'Die-Cut Branded Hangtag', desc: 'Forest green textured swing tag with copper logo, tagline "The Art of Metal", and black cord loop for hardware and custom products.' },
      { icon: 'ri-heart-3-line', title: 'Gold Foil Thank-You Card', desc: 'Matte black customer card featuring gold script "Thank You FOR BEING A PART OF OUR JOURNEY" and brand monogram at bottom.' },
      { icon: 'ri-apps-2-line', title: 'Competency Iconography', desc: 'Front panel icon badges highlighting Steel Fabrication, Architectural Solutions, and Custom Metal Works.' }
    ],
    metrics: [
      'Client: Sithiq S., Proprietor of RIITS Metal Craft',
      'Project Year: 2026',
      'Exclusively categorized under Packaging Design',
      'Official Slogan: "STRONGER SPACES BETTER TOMORROW"',
      'Official Tagline: "The Art of Metal"',
      'Complete Packaging Suite: Mailer box, rigid cube box, tissue paper, swing hangtag, & thank-you card',
      'Elevated brand value and delivery experience for high-end architectural metal craft'
    ],
    quote: '"Stronger Spaces, Better Tomorrow — Crafting metal, building tomorrow with an unboxing experience that reflects pure precision and luxury artistry."'
  },
  'riits-office-branding': {
    title: 'RIITS Metal Craft — Brand Identity & Guidelines',
    category: 'Corporate & Interior Branding',
    client: 'RIITS Metal Craft',
    year: '2026',
    deliverables: 'Brand Identity & Guidelines, Logo System, Typography, Color Palette, ID Card, Apparel, Packaging, Social Media Design',
    img: './assets/images/riits-metal-craft-branding.jpg',
    pdfUrl: './assets/RIITS_Metal_Craft_Brand_Guidelines.pdf',
    overview: 'RIITS Metal Craft is an interior and exterior metal solutions company established in 2020. Guided by the official tagline "The Art of Metal" (Crafting Metal, Building Tomorrow), the brand delivers reliable, well-crafted architectural metal solutions for both residential and commercial spaces including SS & MS gates, grills, railings, roofing sheds, elevation façade works, ACP, toughened glass, and aluminium glazing.',
    problem: 'Transforming structural metal materials into refined architectural spaces required a comprehensive brand identity system that conveys strength, durability, precision craftsmanship, and modern executive aesthetics.',
    solution: 'Engineered a unified Brand Identity & Guidelines system anchored by a dual copper-and-titanium shield emblem, a distinct corporate color palette (#285F5B Teal, #B87333 Copper, #25282A Titanium Black), typography (Montserrat, Poppins, Copperplate CC), and full application across business cards, uniform polo t-shirts, packaging boxes, and digital assets.',
    designElements: [
      { icon: 'ri-shield-star-line', title: 'Primary Logo & Emblem', desc: 'Dual-tone shield featuring gear motif and R monogram symbolizing industrial precision and strength.' },
      { icon: 'ri-palette-line', title: 'Corporate Color Palette', desc: 'Primary Teal (#285F5B), Metallic Copper (#B87333), and Titanium Black (#25282A).' },
      { icon: 'ri-font-size-2', title: 'Brand Typography', desc: 'Montserrat, Poppins, and Copperplate CC for corporate readability and architectural elegance.' },
      { icon: 'ri-id-card-line', title: 'ID & Business Collateral', desc: 'Premium stationery, member badges, and contact cards designed with brand diagonal cutlines.' },
      { icon: 'ri-shirt-line', title: 'Corporate Uniform & Apparel', desc: 'Branded black polo t-shirts with copper collar trims, gear side motifs, and tagline embroidery.' },
      { icon: 'ri-box-3-line', title: 'Packaging System', desc: 'Deep teal and matte black luxury packaging boxes, wrapping tissue, hangtags, and thank-you cards.' }
    ],
    metrics: [
      'Company Name: RIITS Metal Craft',
      'Official Tagline: "The Art of Metal"',
      'Established in 2020 — Full Brand Guidelines System created',
      'Vision: To become a trusted leader in metal craftsmanship',
      'Mission: Delivering high-quality architectural metal solutions with precision',
      'Full Brand Applications: Logo system, business cards, apparel, packaging, and social media',
      'Includes Official 10-Page Brand Guidelines PDF Document'
    ],
    quote: '"The Art of Metal — Crafting metal, building tomorrow. Designed to transform structural metal into refined architectural art."'
  },
  'ssg-loans-branding': {
    title: 'SSG Loans — Financial Brand Identity & Promotional Design',
    category: 'Brand Identity & Financial Services',
    client: 'Mohan Gurumurthy, Founder & CEO of SSG Loans',
    year: '2026',
    deliverables: 'Brand Identity, Financial Campaign Visuals, Product Collateral, Typography, Social Media Assets',
    img: './assets/images/ssg-loans-branding.jpg',
    overview: 'This comprehensive financial branding creative was designed for SSG Loans (Sri Sai Groups), guided by the tagline "Your Dreams, Our Support" and slogan "Loan Made Easy". The visual identity showcases financial growth, trust, home ownership, and financial security through a clean, executive composition.',
    problem: 'Financial loan providers require brand collateral that immediately builds trust, communicates accessibility across various loan products (Home Loan, Personal Loan, Business Loan, Gold Loan), and projects executive credibility to prospective clients.',
    solution: 'Engineered a warm, trust-oriented financial brand creative centered around the official SSG blue and orange corporate palette. The composition features a wooden home model, gold coins stack symbolizing asset growth, house keys, and a structured loan product checklist to visually emphasize reliable financial support.',
    designElements: [
      { icon: 'ri-home-heart-line', title: 'Home & Key Symbolism', desc: 'Wooden house replica and metallic key symbolize home ownership, security, and fulfilled family dreams.' },
      { icon: 'ri-coins-line', title: 'Stacked Gold Coins', desc: 'Rising coin stacks visually represent financial growth, wealth building, and flexible loan support.' },
      { icon: 'ri-checkbox-circle-line', title: 'Product Portfolio Checklist', desc: 'Clear visual checklist highlighting core loan services: Home Loan, Personal Loan, Business Loan, and Gold Loan.' },
      { icon: 'ri-shield-star-line', title: 'Brand Tagline & Identity', desc: 'Prominently features "Sri Sai Groups - Loan Made Easy" branding and the core philosophy "Your Dreams, Our Support".' }
    ],
    metrics: [
      'Official Slogan: "Loan Made Easy"',
      'Official Tagline: "Your Dreams, Our Support"',
      'Categorized exclusively under Branding',
      'Highlights key offerings: Home Loan, Personal Loan, Business Loan, & Gold Loan',
      'Engineered to build high client trust and financial credibility'
    ],
    quote: '"Your Dreams, Our Support — Empowering individuals and businesses with reliable, accessible loan solutions."'
  },
  'brew-hive-branding': {
    title: 'Brew Hive — Brand Identity Presentation & Guidelines',
    category: 'Brand Identity & Product Presentation',
    client: 'Bala, Founder of Brew Hive',
    year: '2025',
    deliverables: 'Brand Identity Presentation, Logo System, Colour Palette, Typography, Coffee Doodle Pattern, Tea Cup Design, 500g Coffee Powder Packaging, Letter Pad Design, Business Card Design, Employee ID Card, Poster Design',
    img: './assets/images/brew-hive.jpg',
    pdfUrl: './assets/Brew_Hive_Brand_Identity.pdf',
    overview: 'Brew Hive was established in 2025 in Perambalur with a vision to bring quality coffee closer to the people. Starting as a welcoming café experience, the brand expanded into its own coffee powder product line, creating a memorable, consistent, and trusted native coffee brand identity.',
    problem: 'Building a native coffee brand from Perambalur that could seamlessly span across café touchpoints, coffee powder pouch packaging, takeaway paper cups, staff ID cards, letter pads, business cards, and marketing posters required a comprehensive and unified brand design system.',
    solution: 'Designed a warm, authentic, and modern visual identity system centered around a custom "BH" monogram with an integrated coffee steam element, a rich coffee-inspired colour palette (#532D1A Coffee Brown, #A67C52 Latte Beige, #F8F5EF Cream White, #E3B563 Honey Gold), structured typography (Poppins, Forte, Times New Roman), hand-drawn coffee doodle patterns, and full applications across paper cups, 500g pouch packaging, letter pads, business cards, employee ID cards, and opening hours posters.',
    designElements: [
      { icon: 'ri-cup-fill', title: 'Primary Logo & BH Monogram', desc: 'Custom B+H monogram with flowing steam element representing freshly brewed coffee, warmth, and aroma.' },
      { icon: 'ri-layout-grid-fill', title: '6 Logo Variations', desc: 'Primary Logo, Dark Primary Logo, Sticked Logo (circular badge), Icon, Monochrome, and Inverted Logo.' },
      { icon: 'ri-palette-line', title: 'Coffee Colour Palette', desc: 'Primary Coffee Brown (#532D1A), Latte Beige (#A67C52), Cream White (#F8F5EF), Caramel, & Honey Gold (#E3B563).' },
      { icon: 'ri-font-size-2', title: 'Typography Architecture', desc: 'Primary Font (Poppins), Secondary Font (Forte), and Accent Font (Times New Roman).' },
      { icon: 'ri-brush-line', title: 'Coffee Doodle Pattern', desc: 'Custom illustrated pattern featuring coffee cups, beans, mocha pots, cupcakes, and leaves.' },
      { icon: 'ri-cup-line', title: 'Tea & Coffee Cup Design', desc: 'Branded kraft paper coffee cup featuring the BH steam monogram and scattered roasted coffee beans.' },
      { icon: 'ri-box-3-line', title: '500g Coffee Powder Packaging', desc: 'Front & back pouch design with coffee latte art, nutrition facts, FSSAI seal, barcode, and product details.' },
      { icon: 'ri-file-text-line', title: 'Letter Pad & Business Card', desc: 'Corporate letterhead with watermark logo and double-sided business card featuring coffee cup graphics.' },
      { icon: 'ri-id-card-line', title: 'Employee ID Card Design', desc: 'Staff ID card with branded brown lanyard, employee details, barcode, and coffee bean base design.' },
      { icon: 'ri-poster-line', title: 'Store Poster & Marketing', desc: 'Opening Hours store poster with schedule, contact info, order CTA, and brand tagline.' }
    ],
    metrics: [
      'Company Name: Brew Hive (From Perambalur, With a Love for Coffee)',
      'Official Tagline: "GOOD COFFEE • BETTER DAYS"',
      'Established in 2025 — Full Brand Presentation & Guidelines System created',
      'Vision: To build a trusted coffee brand from Perambalur and take the Brew Hive experience to every corner',
      'Mission: Delivering quality coffee experiences through café & products with a memorable, consistent identity',
      'Full Applications: Logo variations, coffee cups, 500g packaging, letter pad, business cards, ID cards, posters',
      'Includes Official 13-Page Brand Identity Presentation PDF Document'
    ],
    quote: '"Good Coffee, Better Days — Built around quality, consistency, and a genuine love for coffee, bringing the essence of Perambalur wherever it goes."'
  },
  'izone-technologies': {
    title: 'iZone Technologies — 24/7 E-Commerce Social Media Campaign',
    category: 'Social Media Ad & Digital Campaign Design',
    client: 'KESSEVAN B, CEO of IZONE TECHNOLOGIES',
    year: '2026',
    deliverables: 'Social Media Ad Design, Website Promotion Campaign, Brand Visuals, Tamil & English Typography, Concept Visualisation, Call-to-Action Design',
    img: './assets/images/izone-technologies.jpg',
    overview: 'This social media ad campaign creative was designed for iZone Technologies, led by CEO Kessevan B. The creative addresses retail shop owners with a compelling Tamil-English hybrid storyline ("உங்க Shop-ல 24/7 உங்க Product sale ஆகணுமா?"), illustrating the transformation from a traditional physical shop (Sri Ganesh Stores, Trichy-18) to a 24/7 online e-commerce website powered by iZone Technologies.',
    problem: 'Traditional brick-and-mortar retail owners often miss out on round-the-clock sales because their physical stores are limited to walk-in customers and fixed working hours. iZone Technologies needed an engaging social media visual to explain the value of custom website development and online store creation in a relatable, conversational way.',
    solution: 'The design presents a side-by-side comparative narrative featuring a physical store owner pondering limited footfall versus a modern laptop displaying a fully-functional online store ("Sri Ganesh Stores - Quality Products Delivered to Your Doorstep") with an iZone expert guiding the client. The green and white corporate palette reflects iZone Technologies\' brand identity, while clear callouts (Contact: 99430 77284, www.izonetech.in, @izone_technologies) drive immediate conversions.',
    designElements: [
      { icon: 'ri-store-2-fill', title: 'Traditional vs. Digital Storytelling', desc: 'Visual contrast between a local physical store and a modern e-commerce storefront.' },
      { icon: 'ri-chat-3-fill', title: 'Conversational Tamil Callout', desc: '"உங்க Shop-ல 24/7 உங்க Product sale ஆகணுமா?" creates immediate regional customer resonance.' },
      { icon: 'ri-computer-fill', title: 'Interactive E-Commerce Mockup', desc: 'Detailed laptop mockup displaying grocery delivery features, product categories, and fast delivery badges.' },
      { icon: 'ri-shield-flash-fill', title: 'iZone Brand Identity Integration', desc: 'Features the official green iZone Technologies logo, location details (Aruvi Arcade, Trichy-18), and social handles.' },
      { icon: 'ri-phone-fill', title: 'Direct Call-to-Action', desc: 'Prominent contact number (99430 77284) and web address (www.izonetech.in) formatted for high readability.' }
    ],
    metrics: [
      'Designed a high-converting social media creative for iZone Technologies',
      'Created an engaging storytelling concept comparing physical stores with 24/7 online stores',
      'Incorporated localized Tamil sales copy to maximize regional engagement',
      'Prominently displayed iZone Technologies branding, contact info, and website details',
      'Optimized for social media platforms including Instagram, Facebook, and WhatsApp marketing',
      'Highlighted CEO Kessevan B\'s vision of digital transformation for Trichy retail businesses'
    ],
    quote: '"Transforming traditional retail into 24/7 digital powerhouses with creative storytelling and custom website development."'
  },
  'biryani-express': {
    title: 'Biryani Express — Promotional Campaign',
    category: 'Social Media Poster Design & Food Advertising',
    client: 'Mathu, Owner of Biryani Express',
    year: '2026',
    deliverables: 'Social Media Poster Design, Food Advertising, Promotional Campaign Visual, Product Composition, Typography, Call-to-Action Design',
    img: './assets/images/biryani-express-poster.jpg',
    overview: 'This project was created as a promotional social media poster for Biryani Express, designed to showcase the brand\'s biryani offering through a bold, appetizing, and highly engaging visual. The objective was to create a social media creative that could immediately capture attention, highlight the food product, communicate a promotional offer, and encourage customers to place an order.',
    problem: 'The primary challenge was to make the food the hero of the design while keeping the promotional message, discount, branding, and ordering information clear. Since the artwork was created specifically for social media, the design needed to deliver its message quickly through strong visual hierarchy, bold typography, high food appeal, and a clear call-to-action.',
    solution: 'The design was developed around a bold orange, black, and white colour palette, creating an energetic and food-focused visual identity. The biryani bowl was positioned as the central hero element and enlarged to create maximum appetite appeal. The "DELICIOUS Biryani" headline establishes the product immediately, while the 50% OFF badge provides a strong promotional hook. The ORDER NOW button and contact details were placed prominently at the bottom to create a direct path from viewing the poster to taking action.',
    designElements: [
      { icon: 'ri-restaurant-fill', title: 'Hero Food Visual', desc: 'The biryani bowl dominates the composition, making the food the first and strongest visual element.' },
      { icon: 'ri-font-size-2', title: 'Bold Headline Typography', desc: 'Large, high-contrast typography creates immediate attention and communicates the product message clearly.' },
      { icon: 'ri-price-tag-3-fill', title: '50% OFF Promotional Badge', desc: 'The discount element acts as a visual hook and highlights the promotional value of the campaign.' },
      { icon: 'ri-palette-fill', title: 'Orange & Black Colour Palette', desc: 'The combination creates an energetic, bold, and appetite-driven visual style suitable for a fast-moving food brand.' },
      { icon: 'ri-cursor-fill', title: 'Order Now CTA', desc: 'A clearly positioned call-to-action encourages viewers to move directly from interest to ordering.' },
      { icon: 'ri-phone-fill', title: 'Contact & Website Information', desc: 'Phone number and website details were integrated at the bottom to make the creative practically useful as a promotional communication piece.' }
    ],
    metrics: [
      'Created a high-impact social media promotional poster for Biryani Express',
      'Made the biryani product the primary visual focus',
      'Communicated the promotional offer instantly',
      'Created strong appetite appeal through product-focused composition',
      'Maintained clear visual hierarchy across headline, offer, CTA, and contact details',
      'Designed specifically for digital and social media promotion',
      'Combined branding and sales communication within a single creative',
      'Created a bold and recognisable promotional visual for the food brand'
    ],
    quote: '"A delicious product deserves a visual that makes people stop scrolling, look twice, and crave a bite."'
  },
  'sri-vannamayil-chits': {
    title: 'Sri Vannamayil Chits — We\'re Hiring!',
    category: 'Social Media Recruitment Campaign Design',
    client: 'Pandiyan, Owner of Sri Vannamayil Chits (P) Ltd.',
    year: '2026',
    deliverables: 'Social Media Poster Design, Recruitment Campaign Creative, Brand Communication, Typography, Visual Composition, Call-to-Action Design',
    img: './assets/images/sri-vannamayil-chits.jpg',
    overview: 'This project was created as a professional recruitment social media poster for Sri Vannamayil Chits (P) Ltd., designed to announce a new hiring opportunity and attract suitable candidates. The objective was to create a clear, trustworthy, and professional visual that immediately communicates the "We\'re Hiring!" message while maintaining the established identity of the company. The design combines strong typography, corporate visuals, contact details, and brand elements to create an effective recruitment communication.',
    problem: 'The main challenge was to make the hiring announcement visually powerful while keeping all essential information — company identity, job opportunity, date, location, phone numbers, and website — clear and easy to understand. Since the design was created for social media promotion, it needed to capture attention quickly and communicate the recruitment message within seconds.',
    solution: 'The design was developed using a professional blue, teal, and white colour palette, reflecting trust, growth, professionalism, and corporate credibility. The "WE\'RE HIRING!" headline was given maximum prominence to immediately capture attention. A professionally styled business visual was positioned alongside the content to create a human connection and reinforce the career-focused message. A dedicated information section at the bottom organises the date, office location, contact numbers, and website, making the poster both visually appealing and practically useful.',
    designElements: [
      { icon: 'ri-user-add-fill', title: 'Bold Hiring Headline', desc: 'The large "WE\'RE HIRING!" typography acts as the primary attention-grabbing element and instantly communicates the purpose of the campaign.' },
      { icon: 'ri-briefcase-fill', title: 'Professional Business Visual', desc: 'The business professional image creates a corporate and career-oriented atmosphere, helping the design connect with potential job seekers.' },
      { icon: 'ri-palette-fill', title: 'Corporate Colour Palette', desc: 'Blue, teal, and white tones were used to create a clean, trustworthy, and professional visual identity aligned with the company\'s branding.' },
      { icon: 'ri-shield-check-fill', title: 'Brand Identity Integration', desc: 'The Sri Vannamayil Chits logo and company tagline were positioned prominently to ensure strong brand recognition throughout the campaign.' },
      { icon: 'ri-layout-grid-fill', title: 'Clear Information Hierarchy', desc: 'The hiring message, date, location, contact details, and website were organised strategically for quick and easy communication.' },
      { icon: 'ri-phone-line', title: 'Strong Call-to-Action', desc: 'The contact information provides a direct path for interested candidates to connect with the company and learn more about the opportunity.' }
    ],
    metrics: [
      'Created a professional recruitment campaign visual for Sri Vannamayil Chits',
      'Made the hiring announcement the strongest communication element',
      'Maintained a clean and trustworthy corporate visual style',
      'Integrated company branding with clear recruitment messaging',
      'Organised important candidate information for quick readability',
      'Designed specifically for social media visibility and engagement',
      'Created a reusable visual approach for future hiring campaigns',
      'Balanced professional aesthetics with practical communication'
    ],
    quote: '"A strong career opportunity deserves a strong first impression — designed to attract the right people and represent the brand with confidence."'
  },
  'ssg-loans-founder-story': {
    title: 'SSG Loans — Founder Story Campaign',
    category: 'Social Media Story Design & Brand Promotion',
    client: 'Mohan Gurumurthy, Founder & CEO of SSG Loans',
    year: '2026',
    deliverables: 'Instagram Story Design, Promotional Creative, Founder Spotlight, Event Communication, Photo Manipulation, Typography & Visual Composition',
    img: './assets/images/ssg-loans-founder-story.jpg',
    overview: 'This project was created as a social media story creative for SSG Loans, designed to promote an inspiring entrepreneurial journey and highlight the story behind the organisation\'s growth. The concept focuses on the journey from selling books to creating a ₹4,000+ crore legacy, presenting the founder\'s story as the central communication.',
    problem: 'The key challenge was to communicate a powerful entrepreneurial journey while presenting important event information such as the date, time, venue, and speaker details without making the design feel overloaded. Since the creative was designed for social media, the information needed to be structured with a strong visual hierarchy so viewers could quickly understand the story, personality, and event details.',
    solution: 'The design was developed around the established SSG Loans blue and orange brand language, creating a professional yet energetic corporate appearance. The founder\'s portrait was positioned as the primary visual focus, supported by a bold headline communicating the transformation from selling books to creating a ₹4,000+ crore legacy. The event details were arranged using clear icon-based sections.',
    designElements: [
      { icon: 'ri-user-star-fill', title: 'Founder Spotlight', desc: 'The founder\'s portrait is used as the primary visual element, creating a strong human connection and giving the story a personal identity.' },
      { icon: 'ri-line-chart-fill', title: 'Powerful Storytelling Headline', desc: 'The headline communicates the transformation from selling books to building a major business legacy, making the creative more engaging.' },
      { icon: 'ri-trophy-fill', title: '₹4,000+ Crore Legacy Highlight', desc: 'The achievement is given strong visual emphasis to immediately communicate scale, success, credibility, and business growth.' },
      { icon: 'ri-palette-fill', title: 'Blue & Orange Brand Palette', desc: 'The SSG Loans brand colours are used consistently throughout the design to strengthen brand recognition and maintain financial credibility.' },
      { icon: 'ri-calendar-event-fill', title: 'Event Information System', desc: 'Date, time, venue, and speaker information are organised into individual sections with supporting icons, making the information easy to scan.' },
      { icon: 'ri-contacts-book-2-fill', title: 'Corporate Contact Information', desc: 'Phone numbers, email address, and company location are clearly presented at the bottom, ensuring the creative works as a practical brand asset.' }
    ],
    metrics: [
      'Created a professional Instagram Story creative for SSG Loans',
      'Combined brand storytelling with event promotion',
      'Positioned the founder as the central focus of the campaign',
      'Highlighted the ₹4,000+ crore business journey prominently',
      'Maintained strong SSG Loans brand consistency',
      'Created a professional founder-focused visual identity',
      'Organised event information for quick social-media readability',
      'Combined storytelling, personal branding, and business communication in one creative',
      'Created a premium corporate visual suitable for digital promotion'
    ],
    quote: '"Every successful business has a story — this creative was designed to turn that journey into a powerful visual experience."'
  },
  'orange-juice-shop-poster': {
    title: 'Fresh Orange Juice — Beverage Promotional Poster',
    category: 'Beverage & Juice Shop Poster Design',
    client: 'DHEENA (Juice Shop)',
    year: '2026',
    deliverables: 'Juice Shop Poster Design, Food & Beverage Advertising, 3D Product Manipulation, Color Grading, Call-to-Action Design',
    img: './assets/images/orange-juice-shop-poster.jpg',
    overview: 'This vibrant food and beverage poster was designed for Dheena\'s Juice Shop. The artwork showcases a refreshing 250ml canned orange juice product surrounded by splashing citrus slices, fresh green leaves, and crystal-clear ice cubes, designed to evoke maximum thirst and drive instant customer orders.',
    problem: 'Juice shop promotional creatives need to immediately stimulate taste buds and thirst through high-saturate fruit imagery while keeping ordering calls-to-action clear and prominent.',
    solution: 'The design features an energetic warm orange sunburst background with floating citrus elements creating dynamic depth. The central 250ml juice can is flanked by realistic ice cubes and fresh orange halves, with a prominent "ORDER NOW" CTA button at the base.',
    designElements: [
      { icon: 'ri-cup-fill', title: 'Refreshing Product Visual', desc: 'Central orange juice can mockup floating amidst realistic ice cubes and fresh citrus slices.' },
      { icon: 'ri-sun-fill', title: 'Energetic Sunburst Palette', desc: 'Vibrant yellow and orange gradients convey natural fruit energy and summer freshness.' },
      { icon: 'ri-leaf-fill', title: 'Natural Organic Accents', desc: 'Dynamic floating mint and citrus leaves provide a natural, 100% fresh fruit feel.' },
      { icon: 'ri-font-size-2', title: 'Playful Doodle Typography', desc: 'Hand-drawn "Orange JUICE" headline and doodle accents create a fun, friendly shop vibe.' },
      { icon: 'ri-shopping-cart-2-fill', title: 'Order Now CTA', desc: 'High-contrast orange button at the bottom encourages immediate customer purchase.' }
    ],
    metrics: [
      'Designed a high-appeal promotional poster for Dheena\'s Juice Shop',
      'Created strong thirst appeal using high-saturation fruit & ice compositions',
      'Communicated 100% fresh fruit quality message visually',
      'Optimized for both in-store poster display and social media food marketing'
    ],
    quote: '"Pure refreshing taste captured in a vibrant, thirst-inducing visual experience."'
  },
  'rs-shoes-nike-airforce-poster': {
    title: 'RS Shoes Perambalur — Nike Airforce Limited Edition Poster',
    category: 'Footwear Retail Poster & Advertising Design',
    client: 'Dheena (RS Shoes, Perambalur)',
    year: '2026',
    deliverables: 'Retail Poster Design, Footwear Commercial Creative, Product Mockup, Typography, Offer Badge, Retail Store Visual',
    img: './assets/images/rs-shoes-nike-airforce-poster.jpg',
    overview: 'This retail footwear poster design was created for Dheena at RS Shoes, Perambalur. The artwork features a vibrant high-top Nike Airforce Limited Edition sneaker in pink and blue colorways, designed as a high-impact in-store display poster to promote best-selling footwear at an irresistible price of ₹400.',
    problem: 'Retail footwear stores in Perambalur need clear, vibrant in-store posters that immediately highlight best-selling shoes, features (Flexible, Durable, Comfortable), and affordable pricing while maintaining a premium brand aesthetic.',
    solution: 'The design combines a bold split-color layout (magenta-pink & off-white) with an oversized 3D high-top sneaker graphic floating dynamically across the poster. Feature badges, a clear ₹400 price tag, and the inspirational slogan "JUST DO IT. BE UNSTOPPABLE" drive footfall and immediate customer conversion.',
    designElements: [
      { icon: 'ri-footprint-fill', title: 'Dynamic 3D Sneaker Visual', desc: 'Floating high-top Nike Airforce sneaker positioned diagonally for maximum visual impact.' },
      { icon: 'ri-checkbox-circle-fill', title: 'Product Feature Badges', desc: 'Highlights key selling points: Flexible, Durable, and Comfortable.' },
      { icon: 'ri-price-tag-3-fill', title: '₹400 Price Tag Highlight', desc: 'Prominently displays affordable pricing to capture immediate shopper interest.' },
      { icon: 'ri-contrast-drop-2-fill', title: 'Vibrant Magenta Split Palette', desc: 'Modern dual-tone background with vertical brand typography to create a luxury retail ambiance.' },
      { icon: 'ri-fire-fill', title: 'Action-Driven Slogan', desc: '"JUST DO IT. BE UNSTOPPABLE" tagline reinforces motivation and athletic brand energy.' }
    ],
    metrics: [
      'Designed an exclusive in-store retail poster for RS Shoes Perambalur',
      'Highlighted Nike Airforce Limited Edition best-seller item',
      'Promoted special ₹400 price point for quick store sales',
      'Optimized for high-resolution retail lightbox and wall poster display'
    ],
    quote: '"Turning footwear products into high-impact retail visual experiences that stop shoppers in their tracks."'
  },
  'dheena-car-lover-poster': {
    title: 'Drive Luxury Car — Automotive Promotional Poster',
    category: 'Automotive Poster & Advertising Design',
    client: 'Dheena (Car Lover)',
    year: '2026',
    deliverables: 'Poster Design, Automotive Advertising, High-Speed Racing Graphics, Product Composition, Discount Badge & Call-to-Action Design',
    img: './assets/images/dheena-car-lover-poster.jpg',
    overview: 'This high-energy automotive promotional poster was designed for Dheena (Car Lover). The artwork showcases a sleek Mercedes-AMG supercar centered on bold orange racing stripes, created to market luxury car rentals and premium vehicle sales with an attractive 50% discount offer ("Drive Luxury Car In Your Suitable Price").',
    problem: 'Automotive posters need to evoke speed, luxury, and instant desire while ensuring that key marketing details—such as price suitability, discount badges, and contact CTAs—stand out clearly against dynamic background graphics.',
    solution: 'The design utilizes a clean grey-and-white architectural backdrop contrasted with vibrant orange vertical racing lines. The supercar is positioned front-and-center in sharp high resolution, anchored by a prominent 50% DISCOUNT badge on the top-left and an irresistible "CONTACT NOW" call-to-action button at the base.',
    designElements: [
      { icon: 'ri-roadster-fill', title: 'Frontal Supercar Hero Visual', desc: 'The Mercedes-AMG GT supercar is positioned centrally to maximize speed and luxury appeal.' },
      { icon: 'ri-speed-up-line', title: 'Triple Orange Racing Stripes', desc: 'Bold vertical orange stripes create motion vectors and frame the headline typography.' },
      { icon: 'ri-percent-line', title: '50% Discount Promotional Badge', desc: 'High-contrast dark badge placed strategically on the left for quick visual scanning.' },
      { icon: 'ri-font-size-2', title: 'Heavy Industrial Typography', desc: '"DRIVE LUXURY CAR" headline rendered in italicized geometric font to communicate speed.' },
      { icon: 'ri-cursor-fill', title: 'High-Impact Contact CTA', desc: 'Clean white Call-to-Action block placed at the base to drive immediate customer inquiries.' }
    ],
    metrics: [
      'Created an eye-catching luxury automotive promotional poster for Dheena',
      'Established high appetite and aspiration for luxury sports cars',
      'Balanced aggressive racing aesthetic with crisp commercial readability',
      'Highlighted 50% discount promotional hook for high conversion',
      'Designed exclusively for print poster and billboard presentation'
    ],
    quote: '"Combining high-octane automotive passion with high-converting commercial poster design."'
  },
  'english-partner-poster': {
    title: 'English Partner — Educational Social Media Creative',
    category: 'Educational Social Media Poster',
    client: 'English Partner',
    year: '2026',
    deliverables: 'Social Media Poster Design, Educational Content Design, Digital Marketing Creative, Typography, Visual Communication, AI-Assisted Visual Design, Campaign Design',
    img: './assets/images/english-partner-poster.jpg',
    overview: 'This project was created as an engaging educational social media creative for English Partner, focusing on helping learners improve their English communication skills through WhatsApp-based learning. The objective was to communicate the concept of learning English through WhatsApp in a simple, modern, and visually appealing way while highlighting the importance of consistent practice in building confidence.',
    problem: 'The main challenge was to communicate an educational service in a way that feels simple, relatable, and motivating rather than like a traditional educational advertisement. The design needed to immediately communicate the WhatsApp-based learning concept while making the audience understand that regular English practice can help improve their confidence and communication skills.',
    solution: 'The creative was designed around the idea of learning English anytime through WhatsApp. A relatable student-learning visual was combined with WhatsApp-inspired branding, bold Tamil typography, English supporting text, and motivational messaging to create a strong visual connection with the target audience. The design uses a clean green-and-white visual direction inspired by the WhatsApp learning concept, while the contrasting yellow CTA creates a strong focal point and encourages immediate action.',
    designElements: [
      { icon: 'ri-whatsapp-fill', title: 'WhatsApp-Based Learning Concept', desc: 'The WhatsApp icon and messaging establish the core concept immediately, communicating practice through a familiar digital platform.' },
      { icon: 'ri-translate-2-fill', title: 'Bilingual Communication', desc: 'Tamil used as primary language while English keywords (English Practice, Confidence) are highlighted for accessibility.' },
      { icon: 'ri-user-smile-fill', title: 'Relatable Learner Visual', desc: 'Student using smartphone while studying creates realistic connection with learners practicing through digital communication.' },
      { icon: 'ri-font-size-2', title: 'Strong Typography Hierarchy', desc: 'Large Tamil headlines grab immediate attention while supporting English text provides clear context.' },
      { icon: 'ri-palette-fill', title: 'Green & Yellow Visual Language', desc: 'Green reinforces WhatsApp and learning concept, while yellow CTA creates a strong focal point.' },
      { icon: 'ri-cursor-fill', title: 'Motivational CTA', desc: 'Encourages audience to start their learning journey immediately, creating direct transition to action.' }
    ],
    metrics: [
      'Created an educational social media creative for English Partner',
      'Promoted WhatsApp-based English practice',
      'Communicated the learning concept through a relatable visual',
      'Used bilingual content to improve audience accessibility',
      'Created a strong visual hierarchy for quick social media consumption',
      'Combined educational messaging with motivational communication',
      'Highlighted English practice and confidence as the core message',
      'Developed a clear and engaging call-to-action',
      'Created a social media-ready promotional creative',
      'Strengthened English Partner\'s digital learning brand presence'
    ],
    quote: '"Turning everyday WhatsApp usage into an opportunity to practice English, build confidence, and communicate better."'
  },
  'biryani-express-billboard': {
    title: 'Biryani Express — Promotional Billboard Design',
    category: 'Promotional Billboard & Outdoor Ad',
    client: 'Bomika',
    year: '2026',
    deliverables: 'Advertising Design, Billboard Design, Social Media Promotion, Food Advertisement, Campaign Creative, Promotional Mockup Presentation',
    img: './assets/images/biryani-express-billboard.jpg',
    overview: 'This project focused on creating a high-impact promotional billboard advertisement for Biryani Express, a food brand focused on delivering an appetising and memorable biryani experience. The objective was to create a visually engaging advertising campaign that immediately captures attention, communicates the promotional offer, and encourages customers to take action. The final design combines appetising food photography, bold Tamil typography, promotional messaging, brand identity, and a clear call-to-action to create a strong outdoor advertising presence.',
    problem: 'The main challenge was to create a food advertisement that could communicate the taste, excitement, and promotional value of Biryani Express within a few seconds. Since billboard advertising needs to be understood quickly from a distance, the design needed a strong visual hierarchy with minimal distractions while still creating an emotional appetite appeal.',
    solution: 'The campaign was designed around a warm, rich, food-focused visual direction, using deep brown and golden tones that naturally complement the biryani imagery. A large-scale food visual was used as the central attraction, featuring a customer enjoying the biryani to create an emotional connection between the viewer and the dining experience. The bold Tamil headline "வாங்க சாப்பிடலாம்!" was positioned prominently to create an energetic and locally relevant communication style. The 50% OFF promotional message was highlighted separately to immediately communicate the offer. Supporting social media icons were included to strengthen the brand\'s digital presence, while the "ORDER NOW" CTA provides a clear action point for potential customers. The final artwork was presented as a realistic building billboard mockup to demonstrate how the advertisement could perform in an actual outdoor environment.',
    designElements: [
      { icon: 'ri-text', title: 'Bold Tamil Headline', desc: 'The prominent Tamil headline "வாங்க சாப்பிடலாம்!" creates an immediate emotional connection with the local audience.' },
      { icon: 'ri-restaurant-2-fill', title: 'Appetising Food Visual', desc: 'A rich biryani food composition was used as the primary visual attraction, helping communicate taste and freshness.' },
      { icon: 'ri-user-smile-fill', title: 'Human-Centred Visual', desc: 'The customer enjoying the biryani adds emotion and relatability to the advertisement, making the experience inviting.' },
      { icon: 'ri-price-tag-3-fill', title: 'Promotional Offer', desc: 'The 50% OFF offer was given strong visual emphasis to make the campaign instantly understandable.' },
      { icon: 'ri-shield-star-fill', title: 'Brand Identity', desc: 'The Biryani Express logo was positioned prominently to maintain strong brand recognition and identity.' },
      { icon: 'ri-share-forward-fill', title: 'Social Media Integration', desc: 'Social media icons encourage audience connection beyond physical ads and support digital presence.' },
      { icon: 'ri-cursor-fill', title: 'Strong Call-to-Action', desc: 'The "ORDER NOW" button provides a direct and visually clear action point for potential customers.' },
      { icon: 'ri-building-4-fill', title: 'Outdoor Advertising Mockup', desc: 'Showcased on a realistic building billboard to demonstrate its potential impact in real-world outdoor environments.' }
    ],
    metrics: [
      'Created a high-impact promotional billboard concept for Biryani Express',
      'Developed a visually engaging food advertising campaign',
      'Strengthened brand visibility through prominent logo placement',
      'Created strong appetite appeal through food-focused imagery',
      'Communicated the 50% promotional offer clearly',
      'Used Tamil communication to create stronger local audience engagement',
      'Established a clear visual hierarchy for outdoor advertising',
      'Integrated social media presence into the campaign design',
      'Added a strong "ORDER NOW" call-to-action',
      'Demonstrated the campaign through a realistic billboard mockup',
      'Created a promotional design that combines branding, emotion, and conversion-focused communication'
    ],
    quote: '"A bold and appetising campaign that brings the Biryani Express experience to life — designed to catch attention, create cravings, and drive customers to order."'
  },
  'mohan-gurumorthi-poster': {
    title: 'SSG Loans — Special Days Social Media Posters',
    category: 'Special Days Social Media Campaign',
    client: 'SSG Loans (Sri Sai Groups)',
    year: '2026',
    deliverables: 'Social Media Creative Design, Festival & Special Day Creatives, Financial Branding, Typography, Visual Communication, Campaign Design',
    img: './assets/images/mohan-gurumorthi-poster.jpg',
    overview: 'This project involved creating a series of premium Special Days and Festival-themed social media creatives for Mohan Gurumorthi, Financial Consultants. The objective was to create visually engaging designs that could help the financial consultancy maintain an active and professional social media presence while connecting important special occasions with the brand\'s financial services. Each creative was designed to balance occasion-specific visual elements, meaningful messaging, brand identity, and financial service communication within a consistent visual style.',
    problem: 'The main challenge was to create multiple creatives for different special occasions while ensuring that every design felt unique and relevant to the occasion. At the same time, the designs needed to maintain a consistent professional identity for the financial consultancy and avoid allowing decorative festival elements to overpower the brand message.',
    solution: 'A flexible social media design system was developed to accommodate different festivals, national days, awareness days, and important occasions. Each creative uses occasion-specific imagery, typography, colours, and messaging while maintaining the client\'s financial brand presence through consistent branding and service communication. For occasions such as Milad-un-Nabi, the design incorporates culturally relevant Islamic visual elements, elegant typography, and a respectful message while connecting the communication with the client\'s loan services.',
    designElements: [
      { icon: 'ri-calendar-event-fill', title: 'Special Day Visual Identity', desc: 'Developed according to specific occasion themes, using relevant imagery, symbols, and colors for immediate contextual recognition.' },
      { icon: 'ri-bank-card-fill', title: 'Financial Brand Integration', desc: 'Client\'s brand identity and financial services are integrated naturally without distracting from the occasion-based message.' },
      { icon: 'ri-font-size-2', title: 'Occasion-Based Typography', desc: 'Carefully structured typography hierarchy highlights occasion name, supporting message, and brand communication clearly.' },
      { icon: 'ri-sparkles-fill', title: 'Festival & Cultural Visuals', desc: 'Culturally relevant elements create emotionally engaging designs while maintaining a clean and professional presentation.' },
      { icon: 'ri-money-dollar-circle-fill', title: 'Financial Service Communication', desc: 'Reinforces core services (Home Loan, Vehicle Loan, Education Loan, Business Loan, Personal Loan) for business visibility.' },
      { icon: 'ri-slideshow-3-fill', title: 'Social Media Optimized Design', desc: 'Structured specifically for digital platforms, ensuring clear readability and strong visual impact in feeds.' }
    ],
    metrics: [
      'Created a series of special-day social media creatives for a financial consultancy',
      'Designed multiple occasion-based campaigns throughout the year',
      'Maintained consistent financial brand visibility across different occasions',
      'Combined festive and cultural visuals with professional financial communication',
      'Integrated loan services naturally into occasion-based content',
      'Created platform-friendly designs for social media marketing',
      'Developed a flexible visual system adaptable to different special days',
      'Strengthened digital presence through consistent creative communication',
      'Balanced promotional messaging with meaningful occasion greetings',
      'Presented creatives as a cohesive social media campaign'
    ],
    quote: '"Turning every special occasion into an opportunity to connect, communicate, and keep the brand closer to its audience."'
  },
  'riits-business-card': {
    title: 'RIITS Metal Craft — Business Card Design',
    category: 'Business Card Design & Corporate Print',
    client: 'Sithiq S., Proprietor of RIITS Metal Craft',
    year: '2026',
    deliverables: 'Business Card Design, Corporate Identity, Print Design, Typography, Contact Information Layout, Brand Presentation, Product Mockup Presentation',
    img: './assets/images/riits-business-card.jpg',
    overview: 'This project was created as a premium business card design for RIITS Metal Craft, a metal fabrication and architectural solutions company based in Trichy. The objective was to create a professional and visually strong business card that communicates the company\'s expertise in metal craftsmanship while maintaining a modern and premium corporate appearance. The design was developed as a two-sided business card, combining essential company information, brand identity, services, contact details, and architectural visuals into a cohesive print-ready composition.',
    problem: 'The challenge was to present a wide range of company information within a compact business card format without making the design feel overcrowded. The card needed to communicate RIITS Metal Craft\'s professional image while clearly presenting the proprietor\'s details, contact information, website, location, services, social media presence, and brand identity.',
    solution: 'The business card was developed around the existing RIITS Metal Craft visual identity, using a combination of deep teal, white, and metallic-inspired tones to reflect strength, craftsmanship, engineering, and premium construction. The front side focuses on the proprietor\'s information, contact details, website, location, and brand identity, while the back side highlights the company\'s major services using an architectural visual and structured typography.',
    designElements: [
      { icon: 'ri-shield-fill', title: 'RIITS Brand Identity', desc: 'The logo and visual identity establish a strong and professional brand presence, creating immediate recognition.' },
      { icon: 'ri-palette-fill', title: 'Premium Teal & Metallic Palette', desc: 'Deep teal and metallic-inspired color combination represents durability, engineering, precision, and craftsmanship.' },
      { icon: 'ri-layout-6-line', title: 'Front & Back Structure', desc: 'Two-sided layout separates company information from service details, keeping the composition visually balanced.' },
      { icon: 'ri-building-line', title: 'Architectural Visuals', desc: 'Modern building imagery visually communicates expertise in fabrication, roofing, elevation façade, and glazing.' },
      { icon: 'ri-tools-fill', title: 'Service Communication', desc: 'Key services (SS & MS Gates, Grills, Railings, Shutters, Roofing Sheds, ACP Façade, Toughened Glass) presented clearly.' },
      { icon: 'ri-contacts-book-fill', title: 'Contact & Digital Presence', desc: 'Phone numbers, email, website, location, Facebook, and Instagram details integrated for a complete contact experience.' }
    ],
    metrics: [
      'Created a premium corporate business card for RIITS Metal Craft',
      'Designed both front and back sides with a consistent visual identity',
      'Clearly presented company services and business information',
      'Integrated architectural imagery to strengthen the industry connection',
      'Established a professional and premium brand presence',
      'Organised multiple contact details within a clean information hierarchy',
      'Integrated social media and website information for digital accessibility',
      'Created a print-focused design suitable for professional business networking',
      'Presented the final business card through a realistic premium mockup'
    ],
    quote: '"A professional business card designed to represent RIITS Metal Craft\'s craftsmanship, reliability, and modern approach to architectural metal solutions."'
  },
  'bni-trophy-sticker': {
    title: 'BNI TPL 2026 — Man of the Series',
    category: 'Trophy Sticker & Award Branding Design',
    client: 'BNI TPL Teams',
    year: '2026',
    deliverables: 'Trophy Sticker Design, Award Branding, Sports Event Identity, Sponsor Integration, Typography, Product Mockup Presentation',
    img: './assets/images/bni-trophy-sticker.jpg',
    overview: 'This project was created as a premium trophy sticker design for the BNI Trichy Premier League (BNI TPL) 2026, specifically for the Man of the Series award. The objective was to create a compact yet impactful award identity that could represent the achievement of the winning player while maintaining the overall visual language of the BNI TPL event and its sponsors.',
    problem: 'The challenge was to design a sticker that could fit naturally onto a premium trophy while clearly communicating the event identity, award category, and sponsor branding. Since the sticker would be placed on a physical award, the design needed to remain bold, readable, balanced, and visually premium even within a limited space.',
    solution: 'The sticker was developed using the established BNI TPL 2026 visual identity, combining the event logo, title sponsor branding, cricket graphics, and the award title into one compact composition. A strong green and gold colour treatment was used to connect the sticker with the larger event branding, while the MAN OF THE SERIES title was given clear visual prominence to immediately communicate the achievement.',
    designElements: [
      { icon: 'ri-trophy-line', title: 'Man of the Series Title', desc: 'The award category is highlighted prominently to make the achievement instantly recognisable.' },
      { icon: 'ri-flag-2-fill', title: 'BNI TPL 2026 Identity', desc: 'The event branding establishes a direct connection between the trophy and the BNI Trichy Premier League.' },
      { icon: 'ri-briefcase-4-fill', title: 'Title Sponsor Integration', desc: 'The SOZO Solar Solutions branding is incorporated into the sticker while maintaining primary focus on the award.' },
      { icon: 'ri-medal-fill', title: 'Cricket Visual', desc: 'The cricket ball and player silhouette reinforce the sporting identity and connect the trophy directly with the tournament.' },
      { icon: 'ri-palette-fill', title: 'Premium Green & Gold Palette', desc: 'The green and gold combination reflects achievement, prestige, celebration, and the premium nature of the award.' },
      { icon: 'ri-shape-2-fill', title: 'Compact Sticker Composition', desc: 'Arranged specifically for a physical trophy surface, ensuring the design remains clean and readable at a smaller scale.' }
    ],
    metrics: [
      'Created a premium award sticker for BNI TPL 2026',
      'Designed specifically for the Man of the Series trophy',
      'Maintained consistency with the overall BNI TPL event identity',
      'Integrated sponsor branding without overpowering the award message',
      'Combined cricket visuals with a premium award aesthetic',
      'Created a compact design suitable for physical trophy application',
      'Strengthened the visual identity of the tournament\'s individual awards',
      'Presented the sticker through a realistic trophy mockup'
    ],
    quote: '"A small piece of branding designed to represent a big achievement — celebrating the player who made the series memorable."'
  },
  'bni-entrance-arch': {
    title: 'BNI TPL — Grand Event Entrance Arch',
    category: 'Event Branding & Entrance Arch Design',
    client: 'BNI TPL Teams',
    year: '2026',
    deliverables: 'Entrance Arch Design, Event Branding, Outdoor Flex Design, Sponsor Branding, Cricket Event Graphics, Environmental Mockup Presentation',
    img: './assets/images/bni-entrance-arch.jpg',
    overview: 'BNI Trichy Premier League (BNI TPL) 2026 is a professional cricket and business networking initiative that brings together business owners, entrepreneurs, and professionals in a common environment to connect, build relationships, and create new business opportunities. This project focused on designing a grand entrance arch that would create a strong first impression for attendees while visually representing the identity, energy, and professional character of the BNI TPL event.',
    problem: 'The entrance needed to function as more than a simple event banner. It had to create a memorable arrival experience while accommodating the event title, BNI TPL branding, title sponsor, co-sponsors, associate sponsors, cricket elements, and supporting graphics. The challenge was to organise these multiple branding elements within a large outdoor structure while maintaining visual hierarchy, readability, balance, and premium presentation.',
    solution: 'The arch was developed using a cream, deep green, and gold visual palette, creating a premium combination that connects the professional BNI environment with the energy of a cricket league. The central arch opening was intentionally kept visually open to frame the event venue and create a natural entrance experience. Sponsor branding was distributed across both sides, while cricket-inspired graphics and the championship trophy strengthen the sporting identity.',
    designElements: [
      { icon: 'ri-door-open-fill', title: 'Grand Entrance Arch', desc: 'The large architectural arch creates a strong visual gateway and establishes an impressive first impression as attendees enter.' },
      { icon: 'ri-flag-2-fill', title: 'BNI TPL 2026 Branding', desc: 'The event title and identity are given prominent placement at the top of the arch for immediate recognition.' },
      { icon: 'ri-briefcase-4-fill', title: 'Sponsor Integration', desc: 'Title sponsor, co-sponsors, and associate sponsors are organised into dedicated sections ensuring structured visibility.' },
      { icon: 'ri-trophy-fill', title: 'Cricket-Inspired Graphics', desc: 'Cricket bats, ball elements, player silhouettes, and the championship trophy communicate the sporting character.' },
      { icon: 'ri-palette-fill', title: 'Premium Colour Palette', desc: 'Cream, green, and gold create a sophisticated visual language balancing business professionalism with sporting excitement.' },
      { icon: 'ri-map-pin-user-fill', title: 'Branded Entrance Pathway', desc: 'BNI TPL 2026 flags placed along the pathway extend branding into the surrounding environment for a complete experience.' }
    ],
    metrics: [
      'Created a premium grand entrance identity for BNI TPL 2026',
      'Designed a strong first-impression experience for event attendees',
      'Integrated multiple sponsor brands within a structured visual hierarchy',
      'Combined professional business-event aesthetics with cricket-inspired graphics',
      'Extended event branding from the main arch into the entrance pathway',
      'Created a visually engaging outdoor flex solution suitable for large-scale events',
      'Designed the arch to work effectively as an event photography backdrop',
      'Presented the final design through a realistic outdoor environmental mockup'
    ],
    quote: '"An entrance designed to welcome people, represent the event, celebrate the game, and bring a community of business minds together."'
  },
  'bni-tpl': {
    title: 'BNI TPL — One-to-One Conclave 2026',
    category: 'Event Branding & Stage Flex Design',
    client: 'BNI TPL Teams',
    year: '2026',
    deliverables: 'Event Flex Design, Stage Backdrop Design, Event Branding, Sponsor Integration, Visual Composition, Mockup Presentation',
    img: './assets/images/bni-tpl.jpg',
    overview: 'This project was created as a large-scale event backdrop for BNI Trichy Premier League (BNI TPL) 2026, designed for a professional business networking environment where entrepreneurs and business leaders come together to connect, build relationships, and explore new business opportunities. The objective was to create a premium stage backdrop that could communicate the event identity clearly while maintaining a professional and welcoming atmosphere for business meetings, networking sessions, and the One-to-One Conclave.',
    problem: 'The main challenge was to bring multiple elements together — event branding, title, sponsor logos, business networking messaging, and Trichy-inspired visual elements — without compromising clarity or hierarchy. Since the backdrop would be viewed by a large audience and appear behind speakers and participants during the event, the design needed to remain highly visible, professional, balanced, and presentation-friendly.',
    solution: 'The visual direction was built around a premium green, cream, and gold colour palette, creating a sophisticated business-event atmosphere. The main event title was given strong visual prominence, while the ONE TO ONE CONCLAVE message was positioned as the central communication point. Trichy-inspired landmarks and natural elements were incorporated into the lower section to create a sense of local identity. Sponsor logos were carefully organised into dedicated sections to maintain clarity and provide proper brand visibility.',
    designElements: [
      { icon: 'ri-flag-2-fill', title: 'Event Title & Identity', desc: 'The BNI Trichy Premier League 2026 identity was positioned prominently to establish immediate event recognition.' },
      { icon: 'ri-user-voice-fill', title: 'One-to-One Conclave Focus', desc: 'The bold central headline communicates the primary purpose of the event — creating opportunities for meaningful business conversations.' },
      { icon: 'ri-team-fill', title: 'Business Networking Theme', desc: 'Designed around the idea of entrepreneurs meeting, connecting, sharing opportunities, and building professional relationships.' },
      { icon: 'ri-briefcase-4-fill', title: 'Sponsor Integration', desc: 'Co-sponsor and associate sponsor logos were arranged systematically to provide clear visibility while maintaining visual hierarchy.' },
      { icon: 'ri-building-2-fill', title: 'Trichy Visual Identity', desc: 'Local architectural landmarks were incorporated into the artwork to connect the event visually with Trichy.' },
      { icon: 'ri-vip-crown-fill', title: 'Premium Event Aesthetic', desc: 'The green and cream combination with subtle gold accents creates a professional, corporate presentation suitable for networking.' }
    ],
    metrics: [
      'Created a premium stage backdrop for BNI TPL 2026',
      'Established a strong visual identity for the One-to-One Conclave',
      'Designed specifically for a professional business networking environment',
      'Presented multiple sponsor brands in a clean and organised hierarchy',
      'Integrated Trichy-inspired visuals to strengthen local identity',
      'Maintained strong readability from the audience and stage',
      'Created a professional backdrop suitable for photographs, presentations, and networking',
      'Presented the final design through a realistic event-stage mockup'
    ],
    quote: '"A professional event identity designed to bring business minds together, create meaningful connections, and turn conversations into opportunities."'
  },
  'evening-spot': {
    title: 'Evening Spot — Promotional Standee',
    category: 'Promotional Standee Design & Food Advertising',
    client: 'Muthupaandi, Founder of Evening Spot',
    year: '2026',
    deliverables: 'Standee Design, Food Advertisement, Promotional Graphic Design, Typography, Product Composition, Mockup Presentation',
    img: './assets/images/evening-spot.jpg',
    overview: 'This project was created as a promotional standee for Evening Spot, a food-focused brand founded by Muthupaandi. The objective was to create an eye-catching promotional visual that could instantly attract customers and communicate the product, offer, and brand message in a busy café or restaurant environment. The design focuses on a bold burger visual, warm food-inspired colours, strong typography, and a clear promotional offer to create an engaging point-of-sale advertising experience.',
    problem: 'The primary challenge was to design a standee that could capture attention from a distance while communicating the product and promotional offer within a few seconds. The artwork needed to balance appetizing food photography, promotional messaging, pricing/discount communication, and call-to-action elements without making the design feel overloaded.',
    solution: 'The standee was designed around a bold yellow, orange, brown, and black colour palette, inspired by the warmth and richness of food. The burger was positioned as the main visual hero, occupying a large portion of the composition to immediately establish the product. Strong headline typography was used at the top, while the 50% OFF promotional message creates a clear visual highlight. A prominent ORDER NOW call-to-action was placed near the bottom to guide customers toward taking action.',
    designElements: [
      { icon: 'ri-restaurant-2-fill', title: 'Hero Burger Visual', desc: 'The oversized burger acts as the main focal point, creating an immediate appetite appeal and making the product the centre of attention.' },
      { icon: 'ri-text', title: 'Bold Promotional Typography', desc: 'Large, heavy typography ensures the headline can be quickly understood even from a distance.' },
      { icon: 'ri-price-tag-3-fill', title: '50% OFF Highlight', desc: 'The discount message is visually separated to create a strong promotional hook and increase customer attention.' },
      { icon: 'ri-palette-fill', title: 'Warm Food Colour Palette', desc: 'Yellow, orange, brown, and black tones create a warm, energetic, and appetizing atmosphere complementing the food.' },
      { icon: 'ri-cursor-fill', title: 'Order Now CTA', desc: 'A clear call-to-action encourages customers to move from visual interest to immediate ordering action.' },
      { icon: 'ri-store-2-fill', title: 'Restaurant Environment Mockup', desc: 'Presented within a realistic restaurant backdrop to demonstrate how the standee looks as an actual in-store display.' }
    ],
    metrics: [
      'Created a high-impact promotional standee for Evening Spot',
      'Established the burger as the primary visual attraction',
      'Communicated the promotional offer clearly and instantly',
      'Designed for strong visibility in a restaurant environment',
      'Combined food photography, typography, and promotional messaging effectively',
      'Created a practical advertising asset suitable for cafés and food outlets',
      'Presented the final artwork through a realistic premium standee mockup'
    ],
    quote: '"A bold food visual designed to grab attention, create appetite, communicate the offer, and turn everyday foot traffic into customer interest."'
  },
  'anusiya': {
    title: 'Anusiya — Queen of Beauty',
    category: 'Photo Frame Design & Personalized Artwork',
    client: 'Anusiya',
    year: '2026',
    deliverables: 'Personalized Photo Frame Design, Photo Manipulation, Creative Composition, Typography, Premium Mockup Presentation',
    img: './assets/images/anusiya.jpg',
    overview: 'This project was created as a personalized premium photo frame for Anusiya, combining multiple memorable portraits into a single artistic composition. The objective was to transform personal photographs into an elegant, meaningful wall-frame artwork that feels both visually premium and emotionally special. The design brings together portrait photography, floral elements, flowing fabric, elegant typography, and a deep teal-purple colour palette to create a sophisticated visual story around beauty, personality, and individuality.',
    problem: 'The main challenge was to combine multiple photographs with different poses and compositions into one cohesive artwork without making the frame feel crowded. The design needed to maintain the personality of each photograph while creating a strong central visual composition suitable for premium display. Since the frame was created as a special personal gift, the design also needed to feel thoughtful, unique, and emotionally meaningful rather than looking like a standard photo collage.',
    solution: 'The artwork was developed around a premium editorial-style composition, using a combination of deep teal, rich purple, floral textures, flowing fabric, and elegant handwritten typography. The portraits were carefully arranged within a V-shaped composition to create visual depth and hierarchy. The flowing teal fabric adds movement across the frame, while the purple floral background creates a rich and feminine atmosphere. The overall composition was designed to feel like a luxury portrait artwork rather than a conventional photo frame.',
    designElements: [
      { icon: 'ri-user-heart-fill', title: 'Portrait Composition', desc: 'Multiple personal portraits creatively combined in a V-shaped composition to showcase different expressions and personalities.' },
      { icon: 'ri-flower-fill', title: 'Purple Floral Background', desc: 'Adds elegance, richness, and a soft feminine character while complementing the purple outfit tones.' },
      { icon: 'ri-wind-line', title: 'Flowing Fabric Element', desc: 'The flowing teal fabric creates movement across the composition and acts as a visual bridge connecting portrait sections.' },
      { icon: 'ri-palette-fill', title: 'Premium Colour Palette', desc: 'Deep teal and rich purple combined to create a luxurious and sophisticated visual identity.' },
      { icon: 'ri-quill-pen-fill', title: 'Elegant Typography', desc: 'Handwritten typography adds a personal and artistic touch, reinforcing the emotional and celebratory nature of the artwork.' },
      { icon: 'ri-double-quotes-l', title: 'Personalized Quote', desc: '“Beauty shines through talent, but greatness comes from hard work.” adds an inspirational layer to the artwork.' }
    ],
    metrics: [
      'Created a completely personalized premium photo frame for Anusiya',
      'Transformed multiple personal photographs into one cohesive artwork',
      'Combined photography, floral elements, fabric, and typography into a single composition',
      'Created a luxury-inspired visual suitable for wall display',
      'Designed specifically as a memorable personal gift',
      'Balanced emotional value with a professional, premium presentation',
      'Presented the final artwork through a realistic wall-frame mockup'
    ],
    quote: '"A personal collection of memories transformed into a timeless piece of art — designed with care, creativity, and a premium finish."'
  },
  'campus-bus': {
    title: 'CampusBus — UX/UI Case Study & Mobile App Design',
    category: 'UX/UI & Mobile App Design',
    client: 'Karthik',
    year: '2026',
    deliverables: 'UX/UI Design, Mobile App UI, Prototyping, Brand Identity, Logo Design, Figma, XD, Photoshop, Illustrator',
    img: './assets/images/campus-bus.jpg',
    behanceUrl: 'https://www.behance.net/gallery/252197485/Campus-Bus-college-Bus-tracking-app-UXUI-Case-Study',
    overview: 'CampusBus is a mobile application designed to help college students track campus buses in real-time, check route schedules, and stay updated on bus locations and timings. The goal was to design an intuitive, user-friendly mobile app interface and visual identity that simplifies daily college commuting.',
    problem: 'College students often experience uncertainty and long wait times due to unpredictable campus bus schedules. The challenge was to create an easy-to-use mobile app UI that provides instant visibility into live bus locations, estimated arrival times, and route maps, wrapped in an engaging and accessible visual design.',
    solution: 'We designed a comprehensive mobile app UI featuring clean navigation, live interactive route maps, bus status cards, and real-time arrival notifications. Coupled with a vibrant logo combining bus geometry, signal waves, and navigation pins, the app offers students a seamless commuting experience.',
    designElements: [
      { icon: 'ri-smartphone-line', title: 'Mobile App UI/UX', desc: 'Designed intuitive user flows, bus tracking dashboard, route selection screens, and real-time notification overlays.' },
      { icon: 'ri-bus-fill', title: 'Bus Symbol & App Icon', desc: 'Represents the core service of campus transportation and makes the app\'s purpose instantly recognizable on home screens.' },
      { icon: 'ri-wifi-line', title: 'Live GPS Signal', desc: 'Communicates real-time connectivity, live bus tracking, and instant updates available through the application.' },
      { icon: 'ri-route-line', title: 'Interactive Route Maps', desc: 'Clean map interface showing bus positions, route stops, and estimated travel times between campus locations.' },
      { icon: 'ri-map-pin-2-fill', title: 'Location Pin & Tracking', desc: 'Enables students to set home stops, track incoming buses, and receive proximity alerts.' },
      { icon: 'ri-palette-line', title: 'Vibrant UI Palette', desc: 'Trustworthy blue tones paired with energetic yellow and red accents for high contrast and readability.' }
    ],
    metrics: [
      'Complete UX/UI mobile app design and interactive prototype created',
      'Streamlined college bus tracking with intuitive real-time map interface',
      'Designed responsive UI components using Figma, Adobe XD, Photoshop, and Illustrator',
      'High contrast design optimized for quick mobile viewing on the go',
      'Unified brand identity and digital UI system tailored for college students'
    ],
    quote: '"A seamless mobile UX/UI solution connecting campus transportation with smart, real-time mobility."'
  },
  'brew-hive-cup': {
    title: 'Brew Hive — Coffee Cup Packaging',
    category: 'Packaging Design & Brand Identity',
    client: 'Bala, Founder of Brew Hive',
    year: '2026',
    deliverables: 'Packaging Design, Coffee Cup Branding, Logo Application, Brand Identity, Product Mockup Presentation',
    img: './assets/images/brew-hive-cup.jpg',
    overview: 'This project focused on creating a branded coffee cup packaging design for Brew Hive, a modern coffee brand built around warmth, energy, and a welcoming café experience. The objective was to translate the Brew Hive visual identity onto a physical coffee cup, creating a packaging experience that feels premium, memorable, modern, and instantly recognisable. The custom BH monogram with the subtle steam element was applied prominently to the cup, creating a direct visual connection between the brand identity and the coffee experience.',
    problem: 'The main challenge was to adapt the Brew Hive logo into a physical packaging format while maintaining its visual impact. The packaging needed to remain simple and clean, allowing the logo to become the primary focus while ensuring that the design would look natural and premium when applied to an everyday coffee cup.',
    solution: 'The cup packaging was designed around Brew Hive\'s established black-and-golden brand identity. The custom BH monogram was positioned at the centre of the cup to create strong brand visibility. The integrated steam element reinforces the connection with freshly brewed coffee, warmth, aroma, and the café experience. The Brew Hive wordmark was placed beneath the symbol using clean typography, creating a balanced and minimal packaging composition. The kraft-paper texture of the cup naturally complements the coffee-inspired identity, giving the packaging a warm, authentic, and premium café feel.',
    designElements: [
      { icon: 'ri-cup-fill', title: 'BH Monogram', desc: 'The custom B + H symbol acts as the primary brand signature and creates a distinctive visual identity for Brew Hive.' },
      { icon: 'ri-fire-fill', title: 'Steam Element', desc: 'The flowing steam integrated into the monogram represents freshly brewed coffee, warmth, aroma, and energy, strengthening the connection between the logo and the product.' },
      { icon: 'ri-layout-grid-fill', title: 'Minimal Packaging Layout', desc: 'A clean and uncluttered composition allows the brand mark to remain the main visual focus while giving the cup a sophisticated appearance.' },
      { icon: 'ri-font-size-2', title: 'Brew Hive Wordmark', desc: 'The clean wordmark positioned beneath the monogram reinforces brand recognition and completes the packaging identity.' },
      { icon: 'ri-stack-fill', title: 'Kraft Cup Texture', desc: 'The natural kraft texture complements the coffee theme and creates a warm, handcrafted, and approachable feel.' },
      { icon: 'ri-shield-check-fill', title: 'Premium Brand Application', desc: 'The logo was designed and positioned to maintain strong visibility across the physical cup surface, ensuring the identity remains recognisable in real-world use.' }
    ],
    metrics: [
      'Created a premium coffee cup packaging concept for Brew Hive',
      'Applied the complete Brew Hive identity to a physical product',
      'Strengthened brand recognition through a prominent BH monogram',
      'Created a direct visual connection between the logo and coffee experience',
      'Maintained a minimal and sophisticated packaging aesthetic',
      'Combined brand identity with practical product application',
      'Created a warm and authentic café-oriented visual experience',
      'Demonstrated how the Brew Hive identity can translate from logo to physical packaging',
      'Presented the final packaging through a realistic product mockup'
    ],
    quote: '"From the first sip to the final impression — every detail of the packaging becomes part of the Brew Hive experience."'
  },
  'brew-hive-packaging': {
    title: 'Brew Hive — Coffee Powder Packaging',
    category: 'Packaging Design & Coffee Pouch Branding',
    client: 'Bala, Founder of Brew Hive',
    year: '2026',
    deliverables: 'Packaging Design, Coffee Pouch Branding, Logo Application, Brand Identity, Product Mockup Presentation',
    img: './assets/images/brew-hive-packaging.jpg',
    overview: 'This project focused on creating a premium coffee powder pouch packaging design for Brew Hive, a modern coffee brand built around warmth, freshness, energy, and an authentic café experience. The objective was to translate the Brew Hive brand identity into a physical coffee product package that feels premium, warm, memorable, and commercially appealing. The packaging combines a rich coffee-inspired colour palette, distinctive typography, the custom BH monogram, and coffee imagery to create a strong shelf presence while maintaining clear product communication.',
    problem: 'The key challenge was to design packaging that could communicate the quality and warmth of coffee while keeping the Brew Hive identity clearly recognisable. The pouch needed to balance branding, product information, visual appeal, and practical packaging requirements without making the overall composition feel crowded.',
    solution: 'The packaging was developed around a warm brown and golden coffee-inspired colour palette, creating an immediate connection with roasted coffee and café culture. The BH monogram was positioned prominently near the top of the pouch as the primary brand signature. The Brew Hive wordmark was given strong visual emphasis using a bold, friendly type style that adds personality to the packaging. A coffee cup visual, coffee beans, and subtle bean-pattern graphics were incorporated to strengthen the product story and communicate the coffee experience visually. Supporting information such as "COFFEE POWDER", "100% Pure" and "Net Wt: 250 gm" was arranged clearly to maintain product readability. The curved white panel at the bottom creates a visual break from the darker coffee tones while giving the package a clean and premium finishing touch.',
    designElements: [
      { icon: 'ri-cup-fill', title: 'BH Monogram', desc: 'The custom BH monogram acts as the primary brand identifier, creating a distinctive and recognisable signature for Brew Hive.' },
      { icon: 'ri-font-size-2', title: 'Brew Hive Wordmark', desc: 'The bold and friendly wordmark creates strong brand visibility while giving the packaging a warm and approachable personality.' },
      { icon: 'ri-palette-fill', title: 'Coffee-Inspired Colour Palette', desc: 'Rich brown and golden tones reflect roasted coffee, warmth, richness, and freshness for an authentic coffee feel.' },
      { icon: 'ri-cup-line', title: 'Coffee Cup Visual', desc: 'The coffee cup and latte presentation visually communicate the final coffee experience, making the product instantly appealing.' },
      { icon: 'ri-seedling-fill', title: 'Coffee Bean Graphics', desc: 'Coffee beans and subtle bean patterns reinforce the product category while adding visual depth and texture to the packaging.' },
      { icon: 'ri-layout-masonry-fill', title: 'Premium Pouch Layout', desc: 'Structured visual hierarchy allowing brand name, product name, coffee visual, and key details to remain clear.' },
      { icon: 'ri-information-fill', title: 'Product Information', desc: 'Details such as "100% Pure" and "Net Wt: 250 gm" were integrated seamlessly into the design.' },
      { icon: 'ri-store-2-fill', title: 'Realistic Product Mockup', desc: 'Presented through a realistic café-style product mockup demonstrating retail shelf appeal.' }
    ],
    metrics: [
      'Created a premium coffee powder packaging concept for Brew Hive',
      'Translated the Brew Hive identity into a physical product',
      'Strengthened brand recognition through the BH monogram',
      'Created a strong visual connection with coffee and café culture',
      'Established a warm and premium packaging aesthetic',
      'Balanced branding with essential product information',
      'Improved product visibility through strong typography and imagery',
      'Created a distinctive pouch design suitable for a modern coffee brand',
      'Demonstrated the packaging through a realistic product mockup',
      'Built a consistent visual connection between Brew Hive\'s brand identity and its product experience'
    ],
    quote: '"A warm and authentic coffee pouch design crafted to connect Brew Hive\'s visual identity with a premium retail product experience."'
  },
  'brew-hive': {
    title: 'Brew Hive — Logo & Brand Identity',
    category: 'Logo & Brand Identity',
    client: 'Bala, Founder of Brew Hive',
    year: '2026',
    deliverables: 'Logo Design, Brand Mark, Visual Identity, Mockup Presentation',
    img: './assets/images/brew-hive.jpg',
    overview: 'Brew Hive is a modern coffee brand built around the idea of coffee, warmth, energy, and a welcoming café experience. The goal was to create a bold and memorable logo that could represent the brand\'s coffee identity while maintaining a premium, modern, and approachable visual style. The logo combines a custom "BH" monogram with a subtle steam element, creating a visual connection between the brand name and the experience of enjoying a freshly brewed cup of coffee.',
    problem: 'Brew Hive needed a visual identity that could stand out in a competitive café environment while remaining simple, recognizable, and versatile. The challenge was to combine the initials of Brew Hive with a coffee-related visual element without making the logo look overly complicated or generic.',
    solution: 'We developed a bold black-and-golden identity centered around three key ideas: the custom "BH" Monogram combining the initials B and H, the flowing Steam element representing freshly brewed coffee and warmth, and the Circular Badge composition creating a strong café-style identity.',
    designElements: [
      { icon: 'ri-cup-fill', title: 'BH Monogram', desc: 'The B + H combination forms the core of the logo and creates a distinctive visual signature for Brew Hive.' },
      { icon: 'ri-fire-fill', title: 'Steam Element', desc: 'Represents fresh coffee, warmth, aroma, and the energy of a freshly brewed experience, strengthening the café connection.' },
      { icon: 'ri-sun-fill', title: 'Golden Accent', desc: 'The warm golden tone represents coffee richness, warmth, premium quality, and welcoming energy.' },
      { icon: 'ri-contrast-2-fill', title: 'Black Background', desc: 'The black base creates a premium, bold, and modern appearance, allowing the golden logo mark to stand out strongly.' },
      { icon: 'ri-checkbox-blank-circle-line', title: 'Circular Badge', desc: 'Gives the identity a classic café-signage feel while keeping the logo compact, balanced, and highly recognizable.' },
      { icon: 'ri-font-size-2', title: 'Clean Typography', desc: 'The clean Brew Hive wordmark complements the custom symbol and maintains a modern, approachable brand personality.' }
    ],
    metrics: [
      'Strong and memorable café visual identity created',
      'Direct visual connection between Brew + Hive',
      'Clear visual association with coffee and freshly brewed beverages',
      'Premium black-and-golden visual language for retail & digital',
      'Flexible for signage, packaging, cups, menus, merchandise, & social media'
    ],
    quote: '"A visual identity inspired by the warmth of coffee and the energy of a place where people come together."'
  },
  'unnarvu': {
    title: 'Unnarvu — Logo & Brand Identity',
    category: 'Logo & Brand Identity',
    client: 'Darwin',
    year: '2025',
    deliverables: 'Logo Design, Brand Mark, Visual Identity, Mockup Presentation',
    img: './assets/images/unnarvu.jpg',
    overview: 'Unnarvu is a creative brand built around the idea of emotion, connection, and meaningful design. The objective was to create a minimal and elegant visual identity that feels human, warm, expressive, and memorable, while maintaining a premium and contemporary appearance. The logo was developed as a refined wordmark with distinctive curved letterforms and the tagline "DESIGN THAT FEELS."',
    problem: 'Unnarvu needed an identity that could communicate the idea of feeling through design without depending on complicated symbols or visual elements. The challenge was to create a logo that felt simple yet emotionally expressive, allowing the typography, spacing, and visual details to carry the personality of the brand.',
    solution: 'We developed a minimalist typography-led identity focused on three key ideas: "Unnarvu" representing emotion and connection, Expressive Typography creating human character and flowing forms, and "Design That Feels" communicating the core brand philosophy.',
    designElements: [
      { icon: 'ri-font-size-2', title: 'Typography-Led Wordmark', desc: 'Designed as the primary visual element with elegant letterforms creating identity without heavy graphic symbols.' },
      { icon: 'ri-sparkles-line', title: 'Expressive Letterforms', desc: 'Curved and flowing forms give the typography a soft, artistic, and emotional personality that feels human.' },
      { icon: 'ri-checkbox-blank-circle-fill', title: 'Subtle Dot Detail', desc: 'Distinctive dot above the final letter adds a visual signature and additional point of recognition.' },
      { icon: 'ri-palette-fill', title: 'Warm Earthy Red', desc: 'Represents emotion, warmth, creativity, passion, and human connection in a refined terracotta tone.' },
      { icon: 'ri-heart-pulse-fill', title: '“DESIGN THAT FEELS”', desc: 'Tagline reinforcing the brand philosophy that design should look good and connect emotionally.' }
    ],
    metrics: [
      'Minimal and memorable visual identity created',
      'Strong emotional connection established through typography',
      'Clear communication of "Design That Feels" brand positioning',
      'Premium and contemporary minimalist appearance',
      'Flexible identity for digital, print, & luxury stationery packaging'
    ],
    quote: '"A visual identity designed not just to be seen, but to be felt."'
  },
  'riits-metal-craft': {
    title: 'RIITS Metal Craft — Logo & Brand Identity',
    category: 'Logo & Brand Identity',
    client: 'Sithiq S., Proprietor of RIITS Metal Craft',
    year: '2026',
    deliverables: 'Logo Design, Brand Mark, Visual Identity, Mockup Presentation',
    img: './assets/images/riits-metal-craft.jpg',
    overview: 'RIITS Metal Craft is a metal craftsmanship and fabrication brand based in Trichy, Tamil Nadu, focused on delivering reliable and precision-driven metal solutions. The goal was to create a strong, premium, and industrial visual identity that reflects the brand\'s expertise in metal craftsmanship while making the identity memorable and professional.',
    problem: 'RIITS Metal Craft needed a visual identity that could communicate strength, engineering, precision, and reliability while maintaining a clean and professional appearance. The challenge was to combine the brand\'s initial with meaningful industrial elements into one powerful and recognizable mark, without making the logo overly complex.',
    solution: 'We developed a bold copper-and-metallic-silver identity centered around three key ideas: the "R" monogram representing RIITS, an industrial Gear representing engineering and machinery, and a protective Shield representing durability and strength. Together, these elements form a unified badge-style industrial symbol.',
    designElements: [
      { icon: 'ri-settings-4-fill', title: 'Gear Symbol', desc: 'Represents engineering, machinery, precision, and industrial expertise established in metal fabrication.' },
      { icon: 'ri-font-size-2', title: 'R Monogram', desc: 'Integrated within the gear to represent RIITS, giving the logo a unique brand signature.' },
      { icon: 'ri-shield-fill', title: 'Shield Emblem', desc: 'Represents strength, durability, protection, and reliability, reinforcing the trustworthy nature of the brand.' },
      { icon: 'ri-palette-fill', title: 'Copper & Silver Palette', desc: 'Copper represents craftsmanship & metalwork, while metallic silver represents precision engineering & quality.' },
      { icon: 'ri-text', title: 'Metallic Typography', desc: 'Bold metallic RIITS wordmark creates a commanding industrial presence for signage and marketing.' },
      { icon: 'ri-badge-fill', title: 'Industrial Badge Form', desc: 'Combines shield and gear into a powerful badge identity suitable for machinery, equipment & digital media.' }
    ],
    metrics: [
      'Strong and memorable industrial brand identity created',
      'Direct visual connection between RIITS + Metal Crafting',
      'Communicates strength, engineering, & precision solutions',
      'Premium copper & silver metallic appearance for industrial scale',
      'Flexible performance across machinery, signage, & digital branding'
    ],
    quote: '"A brand mark where strength, engineering, and craftsmanship come together in one powerful visual identity."'
  },
  'ramya-audios': {
    title: 'Ramya Audios — Logo & Brand Identity',
    category: 'Logo & Brand Identity',
    client: 'Rajadurai, Founder of Ramya Audios',
    year: '2025',
    deliverables: 'Logo Design, Brand Mark, Visual Identity, Mockup Presentation',
    img: './assets/images/ramya-audios.jpg',
    overview: 'Ramya Audios is a local audio and sound system service brand based in Arasalur, providing mic sets and sound system setups for functions, events, celebrations, and public gatherings. The goal was to create a bold and memorable logo that clearly represents the brand while having a meaningful connection to its name and service.',
    problem: 'Ramya Audios needed a strong visual identity that could be easily recognized by local customers and instantly communicate its connection to microphone and sound system services. The challenge was to bring the brand name and its core service together in a single, simple logo without making the design visually complicated.',
    solution: 'We developed a bold red-and-white logo centered around two key ideas from the brand: the letter "R" from Ramya merged with a microphone symbol representing the audio and mic-set service. Audio waveform elements were added around the microphone to strengthen the visual connection with sound, music, and audio, while the circular emblem gives the logo a strong and recognizable presence.',
    designElements: [
      { icon: 'ri-mic-fill', title: 'Microphone Symbol', desc: 'Represents Ramya Audios\' core service — mic sets and sound system solutions for events and functions.' },
      { icon: 'ri-font-size-2', title: 'R Monogram', desc: 'Derived from the first letter of Ramya, giving the logo a personal connection to the brand name.' },
      { icon: 'ri-sound-wave-fill', title: 'Audio Waveforms', desc: 'Represent sound, audio, music, and the energy of live events and celebrations.' },
      { icon: 'ri-palette-fill', title: 'Red & White Palette', desc: 'Creates a bold, energetic, and highly visible identity for digital and physical applications.' },
      { icon: 'ri-checkbox-blank-circle-line', title: 'Circular Emblem', desc: 'Creates a strong badge-style identity for equipment, signboards, social media, and stickers.' }
    ],
    metrics: [
      'Strong and memorable brand identity created',
      'Direct connection: Ramya ("R") + Audio Service (Microphone)',
      'Clearly communicates microphone & sound-system business',
      'Suitable for both digital and physical branding collateral',
      'Easy to recognize across events, equipment, signage & social media'
    ],
    quote: '"A brand mark where the name and the service come together in one simple visual identity."'
  },
  'campus-bus-logo': {
    title: 'CampusBus — Logo & Brand Identity',
    category: 'Logo & Brand Identity',
    client: 'Karthik',
    year: '2026',
    deliverables: 'Logo Design, Brand Mark, Visual Identity, Vector Iconography, App Icon Design',
    img: './assets/images/campus-bus-logo.png',
    behanceUrl: 'https://www.behance.net/gallery/252197485/Campus-Bus-college-Bus-tracking-app-UXUI-Case-Study',
    overview: 'CampusBus is a smart college bus tracking platform designed to simplify daily campus commuting for students. The logo combines a clean blue bus silhouette, GPS signal waves, a yellow route line, and a red location pin to create an instantly recognizable and modern brand mark.',
    problem: 'CampusBus required a memorable, modern logo that could clearly convey real-time bus tracking, GPS connectivity, and campus transportation across mobile app icons, digital screens, and promotional media.',
    solution: 'We engineered a vibrant visual mark combining four key metaphors: the blue bus body representing campus transit, signal waves representing live GPS tracking, the yellow fluid road representing campus navigation, and the red pin representing arrival locations.',
    designElements: [
      { icon: 'ri-bus-fill', title: 'Bus Geometry', desc: 'The solid blue bus silhouette forms the core identity, establishing immediate recognition for campus transit.' },
      { icon: 'ri-wifi-line', title: 'GPS Signal Waves', desc: 'Radiating signal waves above the bus communicate real-time connectivity and live tracking capabilities.' },
      { icon: 'ri-route-line', title: 'Yellow Route Line', desc: 'The curved yellow path beneath represents bus routes, road journeys, and smooth travel.' },
      { icon: 'ri-map-pin-2-fill', title: 'Red Location Pin', desc: 'The vibrant red pin pinpoints destination stops, arrival tracking, and user location services.' }
    ],
    metrics: [
      'Vibrant logo design combining bus silhouette, signal waves, route line, & location pin',
      'High-contrast color hierarchy tailored for mobile app icons & splash screens',
      'Unified brand mark for real-time college bus tracking platform',
      'Scalable vector design for digital screens & print collateral'
    ],
    quote: '"A clean and vibrant logo bringing smart mobility, real-time tracking, and campus transit together in one recognizable mark."'
  },
  'aetheria': {
    title: 'Aetheria Luxury Perfume',
    category: 'Branding & Packaging',
    client: 'Aetheria Parfums Paris',
    year: '2026',
    deliverables: 'Brand Identity, Bottle Design, 3D Visuals, Packaging System',
    img: './assets/images/branding.png',
    overview: 'Aetheria is a Paris-based haute couture fragrance house. We crafted a flagship visual identity, bespoke 3D glass bottle packaging, and digital branding collateral engineered to command market prestige and elite brand equity.',
    problem: 'Standing out in the crowded European luxury perfume market required departing from legacy floral tropes and establishing a sleek, minimalist dark aesthetic that appeals to modern luxury collectors.',
    solution: 'We engineered a dark minimalist visual architecture paired with obsidian glass gradients, metallic magenta foil stamping, bespoke typography, and high-impact 3D render collateral for retail stores and global e-commerce.',
    metrics: ['+340% E-Commerce Sales Growth', '2.8M Global Social Impressions', 'Winner - European Luxury Design Award 2026', 'Featured in Vogue & Wallpaper* Magazine'],
    quote: '"DK Designs Studio transformed our fragrance line into an internationally recognized luxury icon. Their mastery of typography and dark aesthetics is unmatched."'
  },
  'neobank': {
    title: 'FinTech NeoBank Mobile App',
    category: 'UI/UX Design',
    client: 'NeoBank Technologies',
    year: '2026',
    deliverables: 'Mobile App Design, Interactive Prototype, Design System',
    img: './assets/images/uiux.png',
    overview: 'NeoBank is a next-generation crypto & fiat banking platform. We designed an intuitive end-to-end mobile application interface, micro-interactive design system, and multi-currency dashboard.',
    problem: 'Traditional banking interfaces are notoriously cluttered, slow, and confusing. Users struggled with multi-currency transfers, portfolio tracking, and real-time yield analytics.',
    solution: 'We architected a futuristic dark-mode UI with glowing glassmorphic cards, real-time neon charts, one-tap instant transfers, and customizable dashboard widgets that streamline complex financial transactions.',
    metrics: ['4.9★ App Store & Play Store Rating', '1.2M+ Active Monthly Users', '94% User Retention Rate', '2.5x Increase in Daily Transactions'],
    quote: '"The UI/UX design delivered by DK Studio set a new benchmark in digital banking apps. Our conversion rates doubled within 30 days of launch."'
  },
  'cybernetic': {
    title: 'Cybernetic Horizons Exhibition',
    category: 'Poster & 3D Design',
    client: 'Metropolis Digital Museum',
    year: '2025',
    deliverables: '3D Art Direction, Exhibition Poster System, Motion Assets',
    img: './assets/images/posters.png',
    overview: 'An international 3D digital art exhibition hosted at Metropolis Museum. We produced key art visuals, 3D artwork, print poster systems, and animated digital billboard motion graphics.',
    problem: 'Metropolis Museum needed an eye-catching, viral poster campaign to drive ticket pre-sales among Gen-Z tech enthusiasts and digital art collectors.',
    solution: 'We developed abstract fluid geometric 3D artwork suspended in glass space, utilizing intense purple and neon magenta color palettes paired with bold futuristic typography.',
    metrics: ['Sold-Out Pre-Sale Tickets in 48 Hours', '50,000+ Exhibition Visitors', 'Featured on Awwwards & Behance Gallery', '100k+ Digital Shares'],
    quote: '"The poster artwork became a viral masterpiece across Instagram and Behance, filling every seat at our digital exhibition."'
  },
  'apex': {
    title: 'Apex Performance Gear',
    category: 'Social Media Campaign',
    client: 'Apex Global Athletic',
    year: '2025',
    deliverables: 'Social Media Strategy, Ad Creatives, Motion Graphics Kit',
    img: './assets/images/social.png',
    overview: 'Apex is an elite athletic apparel brand. We created a high-converting social media marketing kit, performance video ad creatives, and dynamic ad banners for Instagram, YouTube, & TikTok.',
    problem: 'Apex needed to cut through saturated digital advertising channels with visual layouts that immediately grabbed viewer attention within the first 3 seconds of scrolling.',
    solution: 'We built a high-energy visual system featuring bold typography overlays, high-contrast athlete imagery, animated neon motion frames, and strategic call-to-action placement.',
    metrics: ['+410% Return on Ad Spend (ROAS)', '8.5M Targeted Audience Reach', '45% Increase in Ad Click-Through-Rate', '$1.8M Campaign Revenue'],
    quote: '"DK Designs Studio designed our highest converting ad campaign in company history. They understand visual psychology perfectly."'
  },
  'nexus': {
    title: 'Nexus AI Systems',
    category: 'Logo & Brand Identity',
    client: 'Nexus Intelligence Corp',
    year: '2026',
    deliverables: 'Geometric Logo, Monogram Mark, Brand Guidelines',
    img: './assets/images/logos.png',
    overview: 'Nexus AI is an enterprise neural network platform. We designed their corporate logo, geometric brand mark, color hierarchy, brand guidelines, and executive presentation pitch decks.',
    problem: 'An emerging AI enterprise needed an iconic, futuristic brand mark that conveyed artificial intelligence, technical precision, and enterprise scale to Silicon Valley venture capitalists.',
    solution: 'We created an overlapping geometric monogram emblem depicting interconnected neural nodes glowing with electric purple and magenta gradient energy.',
    metrics: ['$15M Series A Funding Raised', '100% Brand Recognition Rating', 'Adopted Across 50+ Global Enterprise Clients', 'Winner - Brand Identity Award'],
    quote: '"Our new logo instantly gave us enterprise credibility with Silicon Valley investors during our funding round."'
  },
  'solaris': {
    title: 'Solaris Roasters Packaging',
    category: 'Packaging Design',
    client: 'Solaris Artisanal Coffee',
    year: '2025',
    deliverables: 'Custom Coffee Pouch Design, Metallic Labels, Box Unboxing',
    img: './assets/images/packaging.png',
    overview: 'Solaris is an artisanal coffee roastery. We designed matte pouch packaging, metallic foil roast labels, and custom unboxing collateral for their specialty single-origin collection.',
    problem: 'Specialty coffee shelves are crowded; Solaris needed packaging that created a tactile luxury unboxing experience to justify premium pricing.',
    solution: 'We designed matte dark soft-touch pouches featuring metallic magenta constellation artwork, coffee flavor profile rings, and custom roasted bean origin cards.',
    metrics: ['+260% Retail Placement', '10,000+ Monthly Coffee Subscriptions', 'Gold Winner - International Packaging Expo', '98% Positive Customer Feedback'],
    quote: '"Customers buy our coffee for the taste, but they fall in love with the packaging first! Masterpiece design."'
  },
  'lumina': {
    title: 'Lumina Smart Home Dashboard',
    category: 'UI/UX & Web App',
    client: 'Lumina IoT Corp',
    year: '2026',
    deliverables: 'Web App Interface, IoT Control Panel, Mobile Design System',
    img: './assets/images/uiux.png',
    overview: 'Lumina is an IoT smart home ecosystem. We built a futuristic real-time web dashboard and mobile interface for controlling smart lights, HVAC, security cameras, and energy analytics.',
    problem: 'Smart home apps are often fragmented, forcing users to switch between multiple disconnected screens to control basic home parameters.',
    solution: 'We engineered a unified glassmorphic dashboard with dynamic ambient lighting controls, interactive floorplan widgets, and single-swipe automation macros.',
    metrics: ['+190% Daily Active Engagement', '350k+ Connected Smart Homes', 'Winner - Webby Best IoT Design 2026', '99.2% User Satisfaction'],
    quote: '"Lumina dashboard feels futuristic, smooth, and lightning fast. Our users love the intuitive gesture controls."'
  },
  'kintsugi': {
    title: 'Kintsugi Teahouse Branding',
    category: 'Brand Identity & Logo',
    client: 'Kintsugi Hospitality Group',
    year: '2025',
    deliverables: 'Brand Architecture, Logo Mark, Menu Design, Tea Canister Packaging',
    img: './assets/images/branding.png',
    overview: 'Kintsugi is an artisan matcha & zen teahouse chain inspired by traditional Japanese gold-repair craft. We created an organic minimal visual identity and packaging suite.',
    problem: 'Translating traditional Japanese zen aesthetics into a contemporary global luxury brand required delicate balance between heritage and modernity.',
    solution: 'We crafted a refined minimalist monogram logo featuring metallic gold foil line art, paired with textured handmade paper menus and bespoke brass canister packaging.',
    metrics: ['Opened 8 Flagship Locations', '+280% Brand Loyalty Signups', 'Featured in Architectural Digest', '100k Instagram Followers'],
    quote: '"The brand identity captures the soul of Japanese tea ritual perfectly. DK Studio delivered poetry in design."'
  },
  'chrono': {
    title: 'Chrono Synthwave Festival',
    category: 'Poster & Event Visuals',
    client: 'Chrono Entertainment',
    year: '2025',
    deliverables: 'Event Poster Series, 3D Motion Posters, Stage Projection Visuals',
    img: './assets/images/posters.png',
    overview: 'A retro-futuristic synthwave music festival. We developed neon 3D poster art, animated venue screens, apparel merch graphics, and social media promos.',
    problem: 'The festival needed key art that captured 80s nostalgia while feeling hyper-modern, metallic, and high-tech.',
    solution: 'We crafted 3D chrome grid landscapes, glowing neon grids, custom typography, and animated motion posters that reacted to music beats.',
    metrics: ['25,000 Tickets Sold Out', '3.5M Impressions on TikTok', 'Featured on Awwwards Poster Showcase', '$850k Merch Revenue'],
    quote: '"The poster art defined the whole identity of our festival. Incredible energy and artistic vision."'
  },
  'zenith': {
    title: 'Zenith Audio Headphones',
    category: 'Luxury Packaging',
    client: 'Zenith Sound Labs',
    year: '2026',
    deliverables: 'Unboxing Packaging, Premium Hard Case, Product Photography Guidelines',
    img: './assets/images/packaging.png',
    overview: 'Zenith creates audiophile wireless headphones. We engineered a luxury rigid unboxing sleeve with magnetic clasp, metallic accents, and eco-friendly molded pulp interior.',
    problem: 'High-end audio buyers expect an exceptional unboxing experience comparable to luxury watchmakers.',
    solution: 'We designed a matte black textured box featuring embossed electric purple foil branding and soft magnetic opening mechanisms.',
    metrics: ['+310% Pre-Orders', 'Gold Winner - Packaging Design Awards', '100% Recyclable Materials', '5.0 Rating from Tech Reviewers'],
    quote: '"Unboxing Zenith headphones feels like opening a piece of fine jewelry. Exceptional craftsmanship."'
  },
  'ecovibe': {
    title: 'EcoVibe Sustainability Campaign',
    category: 'Social Media Campaign',
    client: 'EcoVibe Global NGO',
    year: '2025',
    deliverables: 'Social Media Kit, Infographic Posters, Motion Graphics Ads',
    img: './assets/images/social.png',
    overview: 'EcoVibe is a global environmental action initiative. We created a vibrant social media campaign, interactive story graphics, and motion infographics.',
    problem: 'Environmental campaigns often look dreary or overly academic, failing to inspire viral sharing among younger audiences.',
    solution: 'We developed bright, high-contrast visual infographics with bold neon typography, micro-animated data visualizations, and actionable call-to-action cards.',
    metrics: ['12M+ Global Social Reach', '500k Campaign Signatures', 'Featured by UN Youth Environment', '+450% Engagement Rate'],
    quote: '"DK Designs Studio made climate action visual, urgent, and viral. Our highest reach campaign ever."'
  },
  'cipher': {
    title: 'Cipher Crypto Exchange',
    category: 'Logo & Monogram',
    client: 'Cipher Protocol Inc',
    year: '2026',
    deliverables: 'Crypto Logo Emblem, Dynamic Vector Monogram, UI Iconography',
    img: './assets/images/logos.png',
    overview: 'Cipher is a decentralized crypto exchange. We designed a cryptographic geometric logo, brand mark, dark-mode color scheme, and app icon system.',
    problem: 'Cryptocurrency logos often look derivative or overly complex. Cipher needed a clean mark that scales cleanly down to 16px favicon sizes.',
    solution: 'We designed an impossible-geometry cube monogram symbolizing blockchain security, glowing with electric cyan and neon magenta gradients.',
    metrics: ['$20M Platform Volume in Month 1', 'Featured on CoinMarketCap & TechCrunch', '100% Favorite Favicon Rating', 'Winner - Crypto Design Award'],
    quote: '"Our logo is recognized instantly across web3. DK Studio delivered pure design perfection."'
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');

  if (!modalBackdrop || !modalClose) return;

  function openModal(id) {
    const data = caseStudyData[id];
    if (!data) return;

    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalClient = document.getElementById('modal-client');
    const modalYear = document.getElementById('modal-year');
    const modalDeliverables = document.getElementById('modal-deliverables');
    const modalImg = document.getElementById('modal-img');
    const modalOverview = document.getElementById('modal-overview');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalQuote = document.getElementById('modal-quote');
    const metricsList = document.getElementById('modal-metrics');

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalClient) modalClient.textContent = data.client;
    if (modalYear) modalYear.textContent = data.year;
    if (modalDeliverables) modalDeliverables.textContent = data.deliverables;
    if (modalImg) modalImg.src = data.img;
    if (modalOverview) modalOverview.textContent = data.overview;
    if (modalProblem) modalProblem.textContent = data.problem;
    if (modalSolution) modalSolution.textContent = data.solution;
    if (modalQuote) modalQuote.textContent = data.quote;

    // PDF Guidelines Viewer Card
    let pdfContainer = document.getElementById('modal-pdf-container');
    if (!pdfContainer) {
      const modalBody = modalBackdrop.querySelector('.modal-body');
      if (modalBody) {
        pdfContainer = document.createElement('div');
        pdfContainer.id = 'modal-pdf-container';
        pdfContainer.className = 'modal-section-card pdf-viewer-card';
        pdfContainer.style.marginBottom = '24px';
        modalBody.insertBefore(pdfContainer, modalBody.firstChild);
      }
    }

    if (pdfContainer) {
      if (data.pdfUrl) {
        pdfContainer.style.display = 'block';
        pdfContainer.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
            <h4 style="margin:0;"><i class="ri-file-pdf-2-fill" style="color:var(--accent-magenta); font-size:1.3rem;"></i> Official Brand Guidelines PDF</h4>
            <a href="${data.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 8px 18px; font-size: 0.88rem; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              <span>Open PDF Fullscreen</span>
              <i class="ri-external-link-line"></i>
            </a>
          </div>
          <div style="border-radius:12px; overflow:hidden; border:1px solid rgba(124,58,237,0.35); background:rgba(0,0,0,0.25);">
            <iframe src="${data.pdfUrl}#toolbar=1&navpanes=0" width="100%" height="650px" style="border:none; display:block;" title="Brand Guidelines PDF"></iframe>
          </div>
        `;
      } else {
        pdfContainer.style.display = 'none';
        pdfContainer.innerHTML = '';
      }
    }

    if (metricsList && data.metrics) {
      metricsList.innerHTML = data.metrics.map(m => `
        <li style="display:flex; align-items:center; gap:10px; margin-bottom:10px; color:#D946EF; font-weight:700; font-size:0.95rem;">
          <i class="ri-checkbox-circle-fill" style="font-size:1.15rem;"></i> ${m}
        </li>
      `).join('');
    }

    const designElementsCard = document.getElementById('modal-design-elements-card');
    const designElementsList = document.getElementById('modal-design-elements');
    if (designElementsList && data.designElements && data.designElements.length > 0) {
      if (designElementsCard) designElementsCard.style.display = 'block';
      designElementsList.innerHTML = data.designElements.map(de => `
        <div class="design-element-pill">
          <div class="de-icon-box"><i class="${de.icon}"></i></div>
          <div class="de-info">
            <h5>${de.title}</h5>
            <p>${de.desc}</p>
          </div>
        </div>
      `).join('');
    } else if (designElementsCard) {
      designElementsCard.style.display = 'none';
    }

    const modalContent = modalBackdrop.querySelector('.modal-content');
    if (modalContent) modalContent.scrollTop = 0;

    modalBackdrop.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (portfolioGrid) {
    portfolioGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;

      const cardUrl = card.getAttribute('data-url');
      if (cardUrl) {
        window.open(cardUrl, '_blank');
        return;
      }

      const pdfUrl = card.getAttribute('data-pdf');
      if (pdfUrl) {
        window.open(pdfUrl, '_blank');
        return;
      }

      const id = card.getAttribute('data-id');
      if (id && caseStudyData[id]) {
        openModal(id);
      }
    });
  }

  const modalCta = document.getElementById('modal-cta');
  if (modalCta) {
    modalCta.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const navbar = document.querySelector('.navbar');
          const navHeight = navbar ? navbar.offsetHeight : 80;
          const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
    });
  }

  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   9. SKILLS CIRCULAR SVG PROGRESS ANIMATION
   -------------------------------------------------------------------------- */
function initSkills() {
  const skillRings = document.querySelectorAll('.skill-progress-ring');
  if (!skillRings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = parseInt(ring.getAttribute('data-percent'));
        const circumference = 376;
        const offset = circumference - (percent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.4 });

  skillRings.forEach(ring => observer.observe(ring));
}

/* --------------------------------------------------------------------------
   10. ANIMATED COUNTERS
   -------------------------------------------------------------------------- */
function initCounters() {
  const statNumbers = document.querySelectorAll('[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const startTime = performance.now();
        const duration = 1800;

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeProgress * target);

          el.textContent = currentCount + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(updateCounter);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --------------------------------------------------------------------------
   11. CONTACT FORM INTERACTION & WHATSAPP
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  const serviceSelect = document.getElementById('service');
  const otherServiceGroup = document.getElementById('other-service-group');
  const otherServiceInput = document.getElementById('other-service');

  if (!form) return;

  if (serviceSelect && otherServiceGroup && otherServiceInput) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value === 'others') {
        otherServiceGroup.style.display = 'block';
        otherServiceInput.required = true;
        otherServiceInput.focus();
      } else {
        otherServiceGroup.style.display = 'none';
        otherServiceInput.required = false;
        otherServiceInput.value = '';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const nameVal = document.getElementById('name')?.value.trim() || '';
    const emailVal = document.getElementById('email')?.value.trim() || '';

    let serviceVal = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex]?.text || serviceSelect.value : '';
    if (serviceSelect && serviceSelect.value === 'others') {
      const customVal = otherServiceInput?.value.trim();
      serviceVal = customVal ? `Others (${customVal})` : 'Custom Service';
    }

    const messageVal = document.getElementById('message')?.value.trim() || '';

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Preparing Message...`;

    const formattedMessage = `Hello Dinesh Kumar,

I would like to inquire about a project:

📌 Name: ${nameVal}
✉️ Email: ${emailVal}
🛠️ Service Required: ${serviceVal}
💬 Project Brief: ${messageVal}`;

    const waUrl = `https://api.whatsapp.com/send?phone=917708533260&text=${encodeURIComponent(formattedMessage)}`;
    const mailtoUrl = `mailto:hello@dkdesigns.studio?subject=${encodeURIComponent('Project Inquiry - ' + serviceVal + ' (' + nameVal + ')')}&body=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="ri-check-double-line"></i> Inquiry Prepared!`;
      submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.innerHTML = `
          <div style="padding:20px; border-radius:18px; background:rgba(16,185,129,0.12); border:1px solid #10B981; color:var(--text-main); margin-top:20px;">
            <div style="font-size:1.05rem; font-weight:700; color:#10B981; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
              <i class="ri-checkbox-circle-fill" style="font-size:1.3rem;"></i> Message Ready to Send!
            </div>
            <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:16px;">
              Your project inquiry details have been saved. Choose your preferred channel below to send your message directly to Dinesh:
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:12px;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:10px 18px; font-size:0.88rem; background:linear-gradient(135deg, #25D366, #128C7E); border-color:#25D366; text-decoration:none;">
                <i class="ri-whatsapp-line"></i> Send via WhatsApp
              </a>
              <a href="${mailtoUrl}" class="btn-secondary" style="padding:10px 18px; font-size:0.88rem; text-decoration:none;">
                <i class="ri-mail-line"></i> Send via Email
              </a>
            </div>
          </div>
        `;
      }

      form.reset();
      if (otherServiceGroup) {
        otherServiceGroup.style.display = 'none';
        if (otherServiceInput) otherServiceInput.required = false;
      }

      // Automatically open WhatsApp direct link in new tab for seamless conversion
      window.open(waUrl, '_blank');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 6000);
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   12. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          backBtn.classList.add('visible');
        } else {
          backBtn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   13. 3D SCROLL PERSPECTIVE REVEAL ENGINE
   -------------------------------------------------------------------------- */
function init3DScrollReveal() {
  const revealElements = document.querySelectorAll('.glass-card, .service-card, .project-card, .timeline-item, .skill-card, .testimonial-card, .stat-card, .about-text, .section-tag');

  revealElements.forEach(el => {
    el.classList.add('reveal-3d');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   14. CLIENT ENDORSEMENTS HORIZONTAL TRACK CAROUSEL SLIDER
   -------------------------------------------------------------------------- */
function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  const cards = document.querySelectorAll('.endorsement-card');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('#testimonial-dots .dot');

  if (!track || !cards.length) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentIndex = parseInt(e.currentTarget.getAttribute('data-index')) || 0;
      updateCarousel();
    });
  });

  // Touch and Mouse Drag Swipe Support
  const wrapper = document.getElementById('testimonials-wrapper');
  if (wrapper) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      if (!isDragging) return;
      const diffX = startX - currentX;
      if (Math.abs(diffX) > 40 && currentX !== 0) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
    });

    wrapper.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
    });

    wrapper.addEventListener('mouseup', () => {
      if (!isDragging) return;
      const diffX = startX - currentX;
      if (Math.abs(diffX) > 50 && currentX !== 0) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
    });

    wrapper.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  }

  updateCarousel();
}
