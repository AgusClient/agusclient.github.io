/**
 * AClient In-Game Menu Simulator // Interactive Logic
 * Handles real-time tabs, sliders, engines, toggles, commands search and sound.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio feedback using Web Audio API
  let audioCtx = null;
  function playClickSound(freq = 600, duration = 0.05) {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or supported, silent fallback
    }
  }

  // 2. Toast Notification System
  const toast = document.getElementById('menu-toast');
  let toastTimer = null;
  function showToast(message, icon = '⚡') {
    if (!toast) return;
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 3. Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
      playClickSound(800, 0.04);
    });
  });

  // 4. Interactive Checkboxes
  const checkRows = document.querySelectorAll('.checkbox-row');
  checkRows.forEach(row => {
    row.addEventListener('click', (e) => {
      const box = row.querySelector('.cbox-custom');
      if (box) {
        box.classList.toggle('checked');
        const isChecked = box.classList.contains('checked');
        const title = row.querySelector('.checkbox-title')?.textContent.trim() || 'Ajuste';
        playClickSound(isChecked ? 750 : 450, 0.05);
      }
    });
  });

  // 5. Interactive Sliders
  const sliders = document.querySelectorAll('.client-slider');
  sliders.forEach(slider => {
    const valDisplay = slider.parentElement.querySelector('.slider-val');
    const unit = slider.getAttribute('data-unit') || '';
    const prefix = slider.getAttribute('data-prefix') || '';

    slider.addEventListener('input', () => {
      if (valDisplay) {
        valDisplay.textContent = `${prefix}${slider.value}${unit}`;
      }
    });
  });

  // 6. Fast Input Engine Switcher
  const engineBtns = document.querySelectorAll('.engine-btn');
  const engineDesc = document.getElementById('engine-desc');
  const engineOffsetGroup = document.getElementById('engine-offset-group');

  const engineDescriptions = {
    'Off': 'Predicción de entrada estándar de Teeworlds / DDNet vanilla sin aceleración.',
    'aX30': 'Motor exclusivo AClient v2.7: Predicción asíncrona sub-milisegundo con compensación adaptativa de jitter y clamp de bordes para hooks de precisión extrema.',
    'Fast': 'Motor de baja latencia agresivo optimizado para jugadores con conexiones de alto ancho de banda y bajo jitter.',
    'Mejor': 'Balance híbrido entre predicción y suavizado para conexiones intermedias (30-70ms).',
    'Saiko': 'Algoritmo ajustado para mapas Brutal con micro-saltos en esquinas congeladas.',
    'Delta': 'Cálculo de delta-tiempo continuo en microsegundos para monitores de 240Hz+.',
    'F': 'Modo de respuesta ultra-reactivo enfocado en velocidad de martillo.',
    'Cloud': 'Predicción compensada mediante buffers elásticos para servidores intercontinentales.'
  };

  engineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      engineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const engineName = btn.getAttribute('data-engine');
      if (engineDesc && engineDescriptions[engineName]) {
        engineDesc.textContent = engineDescriptions[engineName];
      }
      if (engineOffsetGroup) {
        engineOffsetGroup.style.display = (engineName === 'Off') ? 'none' : 'flex';
      }
      playClickSound(950, 0.06);
      showToast(`Motor Fast Input cambiado a: ${engineName}`, '🚀');
    });
  });

  // 7. Pill Selectors (Interpolation & Keystroke styles)
  const pillGroups = document.querySelectorAll('.pill-group');
  pillGroups.forEach(group => {
    const pills = group.querySelectorAll('.pill-opt');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        playClickSound(700, 0.04);
      });
    });
  });

  // 8. Commands Search Filter
  const searchInput = document.getElementById('cmd-search');
  const commandRows = document.querySelectorAll('.command-row');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      commandRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // 9. Copy to Clipboard for Commands
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-copy');
      if (!code) return;

      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ ¡Copiado!';
        btn.classList.add('copied');
        playClickSound(1100, 0.08);
        showToast(`Comando copiado: "${code}"`, '📋');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 1800);
      }).catch(() => {
        showToast(`Copia manual: ${code}`, 'ℹ️');
      });
    });
  });

  // 10. Map Category Filters in Profiles
  const catBtns = document.querySelectorAll('.cat-btn');
  const mapCards = document.querySelectorAll('.map-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');

      mapCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      playClickSound(650, 0.04);
    });
  });

  // 11. Mod Actions Simulation
  const modBtns = document.querySelectorAll('.mod-act-btn');
  const targetSelect = document.getElementById('mod-target-player');
  const reasonSelect = document.getElementById('mod-reason');

  modBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const target = targetSelect ? targetSelect.value : 'Jugador';
      const reason = reasonSelect ? reasonSelect.value : 'Infracción';

      playClickSound(350, 0.12);
      showToast(`[AClient Mod] ${action} aplicado a "${target}" (Razón: ${reason})`, '🛡️');
    });
  });

  // 12. Race Stats Actions (Reset, Export)
  const resetStatsBtn = document.getElementById('btn-reset-stats');
  const exportStatsBtn = document.getElementById('btn-export-stats');
  const copyDiscordStatsBtn = document.getElementById('btn-copy-stats');

  if (resetStatsBtn) {
    resetStatsBtn.addEventListener('click', () => {
      showToast('Estadísticas de carrera reiniciadas a cero', '🔄');
      playClickSound(500, 0.06);
    });
  }

  if (exportStatsBtn) {
    exportStatsBtn.addEventListener('click', () => {
      showToast('Captura exportada a DDNet/screenshots/stats_kobra4.png', '📸');
      playClickSound(850, 0.08);
    });
  }

  if (copyDiscordStatsBtn) {
    copyDiscordStatsBtn.addEventListener('click', () => {
      const summary = '🏆 AClient Race Stats // Kobra 4 (Brutal ★★★★☆)\n1. Agus (Tú) - 04:18.42 | Freezes: 2 | Hammer Saves: 14 | Eficiencia: 94.2%\n2. Kurosaki - 04:19.05 | Freezes: 3 | Hammer Saves: 11 | Eficiencia: 89.5%';
      navigator.clipboard.writeText(summary).then(() => {
        showToast('Resumen de carrera copiado para Discord', '📋');
        playClickSound(1000, 0.08);
      });
    });
  }
});
