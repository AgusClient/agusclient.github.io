/**
 * Main Application Script for AClient Showcase
 * Handles i18n, Theme Switcher, Hotspots, Harmonic Waveform Canvas,
 * Conditional Pointer Effects, and Footer World Clock.
 */

document.addEventListener('DOMContentLoaded', () => {
  const i18n = new window.I18nManager();
  i18n.init();
  window.i18n = i18n;

  const audio = new window.LuxuryAudioEngine();
  const scene3D = new window.LuxurySceneManager();

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ==========================================================================
     1. CUSTOM MAGNETIC CURSOR & TILT (Fine pointer only, stops rAF when idle)
     ========================================================================== */
  if (isFinePointer) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const mouseSpotlight = document.querySelector('.mouse-spotlight');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let cursorRaf = null;

    function renderCursor() {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.18;
      ringY += dy * 0.18;

      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25) {
        ringX = mouseX;
        ringY = mouseY;
        cursorRaf = null;
        return;
      }
      cursorRaf = requestAnimationFrame(renderCursor);
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (mouseSpotlight) {
        mouseSpotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (cursorRaf === null) {
        cursorRaf = requestAnimationFrame(renderCursor);
      }
    }, { passive: true });

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
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /* ==========================================================================
     2. HEADER SCROLL STATE
     ========================================================================== */
  const header = document.querySelector('.site-header');
  if (header) {
    let isScrolled = false;
    window.addEventListener('scroll', () => {
      const next = window.scrollY > 50;
      if (next !== isScrolled) {
        isScrolled = next;
        header.classList.toggle('scrolled', next);
      }
    }, { passive: true });
  }

  /* ==========================================================================
     3. FINISH / COLOR THEME CUSTOMIZER
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

      scene3D.setTheme(theme);
    });
  });

  /* ==========================================================================
     4. INTERACTIVE ANATOMY HOTSPOTS
     ========================================================================== */
  const hotspots = document.querySelectorAll('.hotspot-pin');
  hotspots.forEach(pin => {
    const btn = pin.querySelector('.hotspot-button');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = pin.classList.contains('active');
      hotspots.forEach(p => {
        p.classList.remove('active');
        const b = p.querySelector('.hotspot-button');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        pin.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach(p => {
      p.classList.remove('active');
      const b = p.querySelector('.hotspot-button');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  /* ==========================================================================
     5. ACOUSTIC SOUND LAB (HARMONIC WAVE VISUALIZER)
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
    let waveRaf = null;

    const renderWaveFrame = () => {
      ctx.clearRect(0, 0, waveWidth, waveHeight);

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      const grad1 = ctx.createLinearGradient(0, 0, waveWidth, 0);
      grad1.addColorStop(0, '#8b5cf6');
      grad1.addColorStop(0.5, '#00f5d4');
      grad1.addColorStop(1, '#ec4899');
      ctx.strokeStyle = grad1;

      for (let x = 0; x < waveWidth; x += 2) {
        const y = waveHeight / 2 +
                  Math.sin(x * waveFreqMod + waveStep) * waveAmpMod +
                  Math.sin(x * (waveFreqMod * 0.5) + waveStep * 0.5) * (waveAmpMod * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      for (let x = 0; x < waveWidth; x += 2) {
        const y = waveHeight / 2 +
                  Math.cos(x * (waveFreqMod * 1.5) - waveStep * 1.2) * (waveAmpMod * 0.65);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      waveStep += 0.035;
    };

    const startWaveLoop = () => {
      if (waveRaf !== null) return;
      const drawWaves = () => {
        if (!waveVisible || document.hidden) {
          waveRaf = null;
          return;
        }
        waveRaf = requestAnimationFrame(drawWaves);
        renderWaveFrame();
      };
      waveRaf = requestAnimationFrame(drawWaves);
    };

    renderWaveFrame();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        waveVisible = en.isIntersecting;
        if (waveVisible) startWaveLoop();
      }).observe(waveCanvas);
    } else {
      waveVisible = true;
      startWaveLoop();
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && waveVisible) startWaveLoop();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        waveWidth = waveCanvas.width = Math.min(waveCanvas.offsetWidth || 800, 1400);
        waveHeight = waveCanvas.height = waveCanvas.offsetHeight || 240;
        renderWaveFrame();
      }, 120);
    }, { passive: true });

    if (isFinePointer) {
      waveCanvas.addEventListener('mousemove', (e) => {
        const rect = waveCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        waveFreqMod = 0.005 + (x / waveWidth) * 0.02;
        waveAmpMod = 20 + ((waveHeight - y) / waveHeight) * 60;
      }, { passive: true });
    }

    const toneButtons = document.querySelectorAll('.tone-button');
    toneButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const freq = parseFloat(btn.getAttribute('data-freq') || '432');
        toneButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        waveFreqMod = parseFloat(btn.getAttribute('data-wave') || '0.012');
        audio.playTone(freq, 1.2);
        renderWaveFrame();
      });
    });
  }

  /* ==========================================================================
     6. LIVE WORLD CLOCK IN FOOTER
     ========================================================================== */
  const timeEl = document.getElementById('live-time');
  function updateWorldClock() {
    if (timeEl && !document.hidden) {
      timeEl.textContent = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  }
  if (timeEl) {
    setInterval(updateWorldClock, 1000);
    updateWorldClock();
  }
});
