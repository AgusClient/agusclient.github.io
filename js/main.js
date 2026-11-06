/**
 * Main Application Script for AETHER High-End Product Showcase
 * Handles Preloader, Custom Cursor, Finish Switcher, Canvas Waveform,
 * 3D Tilt Cards y GSAP.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize i18n, Audio & 3D Scene Managers
  const i18n = new window.I18nManager();
  i18n.init();
  window.i18n = i18n;

  const audio = new window.LuxuryAudioEngine();
  const scene3D = new window.LuxurySceneManager();

  /* ==========================================================================
     1. PRELOADER & HERO REVEAL
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const progressBar = document.getElementById('preloader-bar');
  let count = 0;

  const countInterval = setInterval(() => {
    count += Math.floor(Math.random() * 8) + 3;
    if (count > 100) count = 100;

    if (counterEl) {
      counterEl.textContent = count < 10 ? `0${count}` : count;
    }
    if (progressBar) {
      progressBar.style.width = `${count}%`;
    }

    if (count >= 100) {
      clearInterval(countInterval);
      setTimeout(() => {
        preloader.classList.add('completed');
        initHeroAnimations();
      }, 500);
    }
  }, 40);

  function initHeroAnimations() {
    // Reveal letters/lines in hero title
    const reveals = document.querySelectorAll('.char-reveal');
    reveals.forEach((el, index) => {
      setTimeout(() => {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      }, index * 120 + 200);
    });

    if (window.gsap) {
      gsap.from('.hero-meta-badge', { opacity: 0, y: -20, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-description', { opacity: 0, y: 30, duration: 1, delay: 0.5, ease: 'power3.out' });
      gsap.from('.hero-cta-group', { opacity: 0, y: 30, duration: 1, delay: 0.7, ease: 'power3.out' });
      gsap.from('.hero-hud-bar .hud-item', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        stagger: 0.15, 
        delay: 0.9, 
        ease: 'power3.out' 
      });
    }
  }

  /* ==========================================================================
     2. CUSTOM MAGNETIC CURSOR
     ========================================================================== */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const mouseSpotlight = document.querySelector('.mouse-spotlight');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    if (mouseSpotlight) {
      mouseSpotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
  }, { passive: true });

  // Smooth lerp loop for cursor ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  /* ==========================================================================
     3. HEADER
     ========================================================================== */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     4. FINISH / COLOR THEME CUSTOMIZER
     ========================================================================== */
  const swatches = document.querySelectorAll('.finish-swatch');
  const activeFinishName = document.querySelector('.active-name');

  const finishNames = {
    default: 'Violeta // 01',
    fuchsia: 'Fucsia // 02',
    azure:   'Cian // 03',
    gold:    'Dorado // 04'
  };

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const theme = swatch.getAttribute('data-finish');
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }

      if (activeFinishName) {
        if (window.i18n) {
          activeFinishName.textContent = window.i18n.getTranslation(`theme.${theme}`);
        } else {
          activeFinishName.textContent = finishNames[theme] || 'Custom';
        }
      }

      // Update 3D Scene lighting and materials
      scene3D.setTheme(theme);
    });
  });

  /* ==========================================================================
     5. INTERACTIVE ANATOMY HOTSPOTS
     ========================================================================== */
  const hotspots = document.querySelectorAll('.hotspot-pin');
  hotspots.forEach(pin => {
    const btn = pin.querySelector('.hotspot-button');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = pin.classList.contains('active');
      hotspots.forEach(p => p.classList.remove('active'));

      if (!isActive) {
        pin.classList.add('active');
      }
    });
  });

  // Close hotspots on clicking outside
  document.addEventListener('click', () => {
    hotspots.forEach(p => p.classList.remove('active'));
  });

  /* ==========================================================================
     6. 3D SANDBOX CONTROLS
     ========================================================================== */
  const wireframeBtn = document.getElementById('btn-wireframe');
  const solidBtn = document.getElementById('btn-solid');
  const speedSlider = document.getElementById('slider-speed');
  const lightSlider = document.getElementById('slider-light');

  if (wireframeBtn && solidBtn) {
    wireframeBtn.addEventListener('click', () => {
      wireframeBtn.classList.add('active');
      solidBtn.classList.remove('active');
      scene3D.setSandboxWireframe(true);
    });

    solidBtn.addEventListener('click', () => {
      solidBtn.classList.add('active');
      wireframeBtn.classList.remove('active');
      scene3D.setSandboxWireframe(false);
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      scene3D.setSandboxSpeed(e.target.value);
      const valLabel = document.getElementById('speed-val');
      if (valLabel) valLabel.textContent = `${e.target.value}x`;
    });
  }

  if (lightSlider) {
    lightSlider.addEventListener('input', (e) => {
      scene3D.setSandboxIntensity(e.target.value);
      const valLabel = document.getElementById('light-val');
      if (valLabel) valLabel.textContent = `${e.target.value}%`;
    });
  }

  /* ==========================================================================
     7. ACOUSTIC SOUND LAB (HARMONIC WAVE VISUALIZER)
     ========================================================================== */
  const waveCanvas = document.getElementById('waveCanvas');
  if (waveCanvas) {
    const ctx = waveCanvas.getContext('2d');
    let waveWidth = waveCanvas.width = Math.min(waveCanvas.offsetWidth || 800, 1400);
    let waveHeight = waveCanvas.height = waveCanvas.offsetHeight || 240;
    let waveStep = 0;
    let waveFreqMod = 0.012;
    let waveAmpMod = 45;
    let waveVisible = false;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        waveVisible = en.isIntersecting;
      }).observe(waveCanvas);
    } else {
      waveVisible = true;
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!waveCanvas) return;
        waveWidth = waveCanvas.width = Math.min(waveCanvas.offsetWidth || 800, 1400);
        waveHeight = waveCanvas.height = waveCanvas.offsetHeight || 240;
      }, 100);
    });

    waveCanvas.addEventListener('mousemove', (e) => {
      const rect = waveCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      waveFreqMod = 0.005 + (x / waveWidth) * 0.02;
      waveAmpMod = 20 + ((waveHeight - y) / waveHeight) * 60;
    });

    function drawWaves() {
      requestAnimationFrame(drawWaves);
      if (!waveVisible || document.hidden) return;
      ctx.clearRect(0, 0, waveWidth, waveHeight);

      // Wave 1: Primary Cyan/Violet gradient wave
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      const grad1 = ctx.createLinearGradient(0, 0, waveWidth, 0);
      grad1.addColorStop(0, '#8b5cf6');
      grad1.addColorStop(0.5, '#00f5d4');
      grad1.addColorStop(1, '#ec4899');
      ctx.strokeStyle = grad1;

      for (let x = 0; x < waveWidth; x++) {
        const y = waveHeight / 2 + 
                  Math.sin(x * waveFreqMod + waveStep) * waveAmpMod +
                  Math.sin(x * (waveFreqMod * 0.5) + waveStep * 0.5) * (waveAmpMod * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2: Sub-harmonic ghost wave
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      for (let x = 0; x < waveWidth; x++) {
        const y = waveHeight / 2 + 
                  Math.cos(x * (waveFreqMod * 1.5) - waveStep * 1.2) * (waveAmpMod * 0.65);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      waveStep += 0.035;
    }
    drawWaves();

    // Sound Lab Tone Buttons
    const toneButtons = document.querySelectorAll('.tone-button');
    toneButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const freq = parseFloat(btn.getAttribute('data-freq') || '432');
        toneButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        waveFreqMod = parseFloat(btn.getAttribute('data-wave') || '0.012');
        audio.playTone(freq, 1.2);
      });
    });
  }

  /* ==========================================================================
     8. 3D PERSPECTIVE TILT ON BENTO CARDS
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.bento-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ==========================================================================
     10. LIVE WORLD CLOCKS IN FOOTER
     ========================================================================== */
  function updateWorldClock() {
    const timeEl = document.getElementById('live-time');
    if (timeEl) {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString('es-ES', { 
        
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
    }
  }
  setInterval(updateWorldClock, 1000);
  updateWorldClock();
});


