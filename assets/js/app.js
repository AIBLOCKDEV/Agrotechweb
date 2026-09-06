/**
 * AGRO TECH · Core Interactive Architecture (2026)
 * Potenciado por Corral X Core · E-Ink Interface Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCalculator();
  initTelemetryHUD();
  initAuditForm();
  initAudioFeedback();
  initBlueprintMenu();
  initGrassEngine();
  initFAQAccordion();
  initAIAssistant();
  initDossierModal();
});

/* ==========================================================================
   1. E-Ink Screen Refresh & Dual Theme Toggle (Papel / Carbón)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const badgePaper = document.getElementById('badgePaper');
  const badgeCarbon = document.getElementById('badgeCarbon');
  const currentTheme = localStorage.getItem('agrotech_theme') || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButtonUI(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      playTactileClick();
      // Genuine E-Ink particle flash
      document.body.classList.add('e-ink-refreshing');
      setTimeout(() => {
        document.body.classList.remove('e-ink-refreshing');
      }, 400);

      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('agrotech_theme', newTheme);
      updateThemeButtonUI(newTheme);
    });
  }

  function updateThemeButtonUI(theme) {
    if (badgePaper && badgeCarbon) {
      if (theme === 'dark') {
        badgeCarbon.classList.add('active');
        badgePaper.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-checked', 'true');
      } else {
        badgePaper.classList.add('active');
        badgeCarbon.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-checked', 'false');
      }
    }
  }
}

/* ==========================================================================
   2. Web Audio API Tactile Mechanical Feedback
   ========================================================================== */
let audioCtx = null;
function initAudioFeedback() {
  // Lazily activate on first user touch/click
  const enableAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    window.removeEventListener('click', enableAudio);
  };
  window.addEventListener('click', enableAudio, { once: true });
}

function playTactileClick() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (audioCtx) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    }
  } catch (e) {
    // Audio optional fallback
  }
}

/**
 * Easter Egg Sound: Melodic chirp and rotor harmonic flutter ("Drones como pajaritos")
 */
function playBirdDroneChirp() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    // Ascending bird-drone chirps (pip-peep-trill!)
    const notes = [
      { start: 1150, peak: 2400, end: 1950, t: 0, d: 0.08 },
      { start: 1350, peak: 2850, end: 2200, t: 0.11, d: 0.09 },
      { start: 1750, peak: 3400, end: 2600, t: 0.23, d: 0.13 }
    ];

    notes.forEach(n => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.start, now + n.t);
      osc.frequency.exponentialRampToValueAtTime(n.peak, now + n.t + n.d * 0.55);
      osc.frequency.exponentialRampToValueAtTime(n.end, now + n.t + n.d);

      gain.gain.setValueAtTime(0.001, now + n.t);
      gain.gain.linearRampToValueAtTime(0.08, now + n.t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });

    // Whirring harmonic micro-rotor buzz
    const buzz = audioCtx.createOscillator();
    const buzzGain = audioCtx.createGain();
    buzz.type = 'triangle';
    buzz.frequency.setValueAtTime(170, now);
    buzz.frequency.linearRampToValueAtTime(320, now + 0.45);
    buzzGain.gain.setValueAtTime(0.035, now);
    buzzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    buzz.connect(buzzGain);
    buzzGain.connect(audioCtx.destination);
    buzz.start(now);
    buzz.stop(now + 0.5);
  } catch (e) {
    // Audio optional fallback
  }
}

/* ==========================================================================
   3. Calculadora de Vulnerabilidad de Relevo y Automatización
   ========================================================================== */
function initCalculator() {
  const hectareasInput = document.getElementById('calcHectareas');
  const edadInput = document.getElementById('calcEdad');
  const obrerosInput = document.getElementById('calcObreros');

  const valHectareas = document.getElementById('valHectareas');
  const valEdad = document.getElementById('valEdad');
  const valObreros = document.getElementById('valObreros');

  const vulnScoreBadge = document.getElementById('vulnScoreBadge');
  const vulnLabel = document.getElementById('vulnLabel');
  const horasAhorradasDisplay = document.getElementById('horasAhorradas');
  const ahorroCombustibleDisplay = document.getElementById('ahorroCombustible');
  const ahorroDolaresDisplay = document.getElementById('ahorroDolares');
  const paybackMesesDisplay = document.getElementById('paybackMeses');
  const continuidadDisplay = document.getElementById('continuidadDisplay');

  function calculate() {
    const ha = parseInt(hectareasInput.value, 10) || 100;
    const edad = parseInt(edadInput.value, 10) || 55;
    const obreros = parseInt(obrerosInput.value, 10) || 5;

    // Display updates
    valHectareas.textContent = `${ha.toLocaleString()} Ha`;
    valEdad.textContent = `${edad} AÑOS`;
    valObreros.textContent = `${obreros} TRABAJADORES`;

    // 1. Vulnerability Calculation (Base 0 - 100)
    // Factores: edad avanzada (>55 acelera riesgo), dependencia manual de obreros
    let ageRisk = Math.max(0, (edad - 45) * 2.2);
    let laborRisk = Math.min(45, obreros * 3.5);
    let totalVuln = Math.min(98, Math.round(ageRisk + laborRisk + 12));

    let riskCategory = 'MODERADO';
    let badgeBg = '#EBF2EA';
    let badgeColor = '#345C33';

    if (totalVuln >= 75) {
      riskCategory = 'CRÍTICO · ALERTA ROJA';
      badgeBg = '#FDF2F2';
      badgeColor = '#B52B27';
    } else if (totalVuln >= 50) {
      riskCategory = 'ALTO RIESGO DE DESERCIÓN';
      badgeBg = '#FFF8E6';
      badgeColor = '#B8740A';
    }

    vulnScoreBadge.textContent = `${totalVuln}% [${riskCategory}]`;
    vulnScoreBadge.style.backgroundColor = badgeBg;
    vulnScoreBadge.style.color = badgeColor;
    vulnLabel.textContent = `Índice de Vulnerabilidad de Continuidad sin Relevo`;

    // 2. Horas de trabajo forzoso erradicadas con agentes y drones
    const horasSustituibles = Math.round(obreros * 2200 * 0.78);
    horasAhorradasDisplay.textContent = `${horasSustituibles.toLocaleString()} HRS/AÑO`;

    // 3. Ahorro de combustible y agua optimizado por IA
    const litrosDiesel = Math.round(ha * 32);
    ahorroCombustibleDisplay.textContent = `~${litrosDiesel.toLocaleString()} LTRS/DIÉSEL`;

    // 4. Ahorro Financiero Operativo USD / Año
    // $45/Ha en desperdicio de agroquímicos y agua + $1,450/obrero en horas extras y pérdidas operativas
    const ahorroUSD = Math.round(ha * 45 + obreros * 1450);
    if (ahorroDolaresDisplay) {
      ahorroDolaresDisplay.textContent = `$${ahorroUSD.toLocaleString()} USD/AÑO`;
    }

    // 5. Retorno de Inversión (Payback estimado en meses)
    const payback = Math.max(5.2, Math.min(14.0, (18.0 - (ha * 0.006) - (obreros * 0.25)))).toFixed(1);
    if (paybackMesesDisplay) {
      paybackMesesDisplay.textContent = `~${payback} MESES`;
    }

    // 6. Continuidad generacional
    continuidadDisplay.textContent = `GARANTIZADA (+20 AÑOS)`;
  }

  [hectareasInput, edadInput, obrerosInput].forEach(input => {
    input.addEventListener('input', () => {
      playTactileClick();
      calculate();
    });
  });

  calculate();
}

/* ==========================================================================
   4. Live Telemetry HUD: Corral X Autonomous Fleet Simulation
   ========================================================================== */
function initTelemetryHUD() {
  const feedContainer = document.getElementById('hudFeedBody');
  if (!feedContainer) return;

  const mockEvents = [
    { source: 'DRON-01 [PORTUGUESA]', type: 'success', msg: 'Escaneo multiespectral de 240 Ha completado en Turén. Cero estrés hídrico detectado.' },
    { source: 'RIEGO-AUT-04 [GUÁRICO]', type: 'info', msg: 'Calabozo: Microcontrolador solar activó bombeo por déficit de humedad volumétrica (-18%).' },
    { source: 'CORRAL-X CORE [BARINAS]', type: 'success', msg: 'Telemetría pecuaria lote 44: Ganancia ponderada +1.15 kg/día. Dispersión óptima.' },
    { source: 'TRACTOR-ROBOT-02 [ANZOÁTEGUI]', type: 'info', msg: 'Surcado autónomo nocturno completado. 38 Ha labradas con 0 intervención humana.' },
    { source: 'DRON-FUMIG-08 [ZULIA]', type: 'alert', msg: 'Foco de insectos localizado en cuadrante Sur-3. Aplicación de biológico ultra-preciso en curso.' },
    { source: 'CORRAL-X APP', type: 'success', msg: 'Trato P2P cerrado: 120 novillos comercializados directo de ganadero a ganadero con precio óptimo proyectado por IA.' },
    { source: 'CENTRO DE CONTROL', type: 'info', msg: 'Red agéntica nacional operando al 99.98% de disponibilidad solar.' }
  ];

  let eventIndex = 0;

  function addLogEvent() {
    const ev = mockEvents[eventIndex % mockEvents.length];
    eventIndex++;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(Math.floor(now.getMilliseconds() / 100));

    const row = document.createElement('div');
    row.className = `hud-log-row ${ev.type}`;
    row.innerHTML = `
      <span class="hud-time">[${timeStr}]</span>
      <span class="hud-source">${ev.source}</span>
      <span class="hud-msg">${ev.msg}</span>
    `;

    feedContainer.appendChild(row);

    // Keep log max length
    while (feedContainer.children.length > 25) {
      feedContainer.removeChild(feedContainer.firstChild);
    }

    // Auto-scroll
    feedContainer.scrollTop = feedContainer.scrollHeight;
  }

  // Initial populate
  for (let i = 0; i < 4; i++) {
    addLogEvent();
  }

  // Interval for continuous live feed
  setInterval(() => {
    addLogEvent();
  }, 4500);
}

/* ==========================================================================
   5. Formulario de Auditoría y Enlace Directo a WhatsApp
   ========================================================================== */
function initAuditForm() {
  const form = document.getElementById('auditForm');
  const whatsappBtn = document.getElementById('whatsappDirectBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      playTactileClick();

      const nombre = document.getElementById('auditNombre').value.trim();
      const finca = document.getElementById('auditFinca').value.trim();
      const estado = document.getElementById('auditEstado').value;
      const ha = document.getElementById('auditHa').value.trim();
      const rubro = document.getElementById('auditRubro').value;
      const email = document.getElementById('auditEmail') ? document.getElementById('auditEmail').value.trim() : '';
      const telefono = document.getElementById('auditTelefono').value.trim();

      const mensaje = `Hola AGRO TECH / QUANTUN NEXUS. Solicito Auditoría Tecnológica para mi unidad de producción.%0A%0A` +
        `*Productor/Contacto:* ${encodeURIComponent(nombre)}%0A` +
        `*Finca / Empresa:* ${encodeURIComponent(finca)}%0A` +
        `*Ubicación:* ${encodeURIComponent(estado)}, Venezuela%0A` +
        `*Extensión:* ${encodeURIComponent(ha)} Hectáreas%0A` +
        `*Rubro:* ${encodeURIComponent(rubro)}%0A` +
        `*Correo:* ${encodeURIComponent(email)}%0A` +
        `*Teléfono:* ${encodeURIComponent(telefono)}%0A%0A` +
        `Deseo erradicar el trabajo forzoso y automatizar mi producción con Corral X.`;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `ENVIANDO A INFOCORRALX@GMAIL.COM...`;
      submitBtn.disabled = true;

      // Send structured data directly to official mailbox: infocorralx@gmail.com
      const payload = {
        _subject: `Nueva Auditoría de Finca: ${finca} (${estado}) - ${nombre}`,
        nombre,
        finca,
        estado,
        hectareas: ha,
        rubro,
        email,
        telefono,
        _template: "table"
      };

      fetch("https://formsubmit.co/ajax/infocorralx@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .catch(err => {
        console.warn("Direct email delivery note:", err);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `✓ ENVIADO A INFOCORRALX@GMAIL.COM`;
        submitBtn.style.backgroundColor = 'var(--green-primary)';
        submitBtn.style.color = '#FFFFFF';

        // Also launch direct WhatsApp communication
        const waUrl = `https://api.whatsapp.com/send?phone=584227158087&text=${mensaje}`;
        window.open(waUrl, '_blank');

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
        }, 6000);
      });
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      playTactileClick();
    });
  }
}

/* ==========================================================================
   6. Blueprint Navigation Matrix & Tactical Menu Controller
   ========================================================================== */
function initBlueprintMenu() {
  const toggleBtn = document.getElementById('blueprintMenuToggle');
  const overlay = document.getElementById('blueprintMatrixOverlay');
  const closeBtn = document.getElementById('closeBlueprintBtn');
  const backdrop = document.getElementById('blueprintBackdrop');
  const matrixCtaBtn = document.getElementById('matrixCtaBtn');
  const label = document.getElementById('matrixBtnLabel');
  const openDossierCard = document.getElementById('openDossierFromMatrix');

  if (!toggleBtn || !overlay) return;

  const matrixCards = overlay.querySelectorAll('.matrix-card');

  function openMatrix() {
    playTactileClick();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('active');
    if (label) label.textContent = '✕ CERRAR';
    document.body.style.overflow = 'hidden';
  }

  function closeMatrix() {
    playTactileClick();
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('active');
    if (label) label.textContent = 'ÍNDICE';
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (overlay.classList.contains('open')) {
      closeMatrix();
    } else {
      openMatrix();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMatrix);
  if (backdrop) backdrop.addEventListener('click', closeMatrix);
  if (matrixCtaBtn) matrixCtaBtn.addEventListener('click', closeMatrix);

  matrixCards.forEach(card => {
    if (card.tagName.toLowerCase() === 'a') {
      card.addEventListener('click', () => {
        closeMatrix();
      });
    }
  });

  // Card 08: Open Dossier Modal
  if (openDossierCard) {
    const handleDossierClick = (e) => {
      e.preventDefault();
      closeMatrix();
      const openDesktopBtn = document.getElementById('openDossierBtn');
      if (openDesktopBtn) {
        openDesktopBtn.click();
      } else {
        const modal = document.getElementById('dossierModal');
        if (modal) {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
    };
    openDossierCard.addEventListener('click', handleDossierClick);
    openDossierCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleDossierClick(e);
      }
    });
  }

  // Keyboard accessibility: ESC closes, [M] toggles
  document.addEventListener('keydown', (e) => {
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    if (isTyping) return;

    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMatrix();
    } else if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (overlay.classList.contains('open')) {
        closeMatrix();
      } else {
        openMatrix();
      }
    }
  });
}

/* ==========================================================================
   7. Motor de Pasto E-Ink & Brisa Botánica Interactiva (Grass Engine 2026)
   ========================================================================== */
function initGrassEngine() {
  // Global cursor and wind tracking
  let mouse = { x: -1000, y: -1000, lastX: -1000, speed: 0 };
  let scrollDelta = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener('mousemove', (e) => {
    mouse.speed = Math.min(25, Math.abs(e.clientX - mouse.lastX));
    mouse.lastX = e.clientX;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.speed = 0;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollDelta = (currentScrollY - lastScrollY) * 0.15;
    lastScrollY = currentScrollY;
  }, { passive: true });

  // Palette selector based on E-Ink theme
  function getGrassColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      return {
        blades: ['#4E8A4B', '#63AA60', '#345C33', '#8FA88C'],
        spores: 'rgba(99, 170, 96, 0.45)',
        wheatHead: '#5E9E5B',
        windPrimary: 'rgba(99, 170, 96, 0.52)',
        windSecondary: 'rgba(180, 210, 175, 0.28)',
        leafPrimary: '#63AA60',
        leafSecondary: '#4E8A4B',
        leafVein: 'rgba(255, 255, 255, 0.75)'
      };
    } else {
      return {
        blades: ['#345C33', '#244122', '#181A18', '#456D43'],
        spores: 'rgba(52, 92, 51, 0.38)',
        wheatHead: '#2A4D29',
        windPrimary: 'rgba(52, 92, 51, 0.46)',
        windSecondary: 'rgba(32, 36, 32, 0.25)',
        leafPrimary: '#345C33',
        leafSecondary: '#477844',
        leafVein: 'rgba(255, 255, 255, 0.68)'
      };
    }
  }

  // --------------------------------------------------------------------------
  // A. Lienzo de Brisa y Pasto Flotante en Toda la Pantalla (Ambient Canvas)
  // --------------------------------------------------------------------------
  const ambientCanvas = document.getElementById('ambientGrassCanvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = ambientCanvas.width = window.innerWidth;
    let height = ambientCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    }, { passive: true });

    // Generate ~35 floating organic grass blades & airborne seeds
    const particleCount = Math.min(45, Math.max(20, Math.floor(window.innerWidth / 35)));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 12 + Math.random() * 26,
        curve: (Math.random() - 0.5) * 14,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.02,
        vx: 0.25 + Math.random() * 0.6,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: 0.2 + Math.random() * 0.45,
        type: Math.random() > 0.45 ? 'blade' : 'seed',
        phase: Math.random() * 10
      });
    }

    // ------------------------------------------------------------------------
    // Anime Wind Trails & Swirling Leaves System (Sutil Brisa Estilo Anime con Espiral)
    // ------------------------------------------------------------------------
    const windGusts = [];
    let nextGustTime = 800; // First gentle breeze shortly after load
    let lastGustTime = 0;

    /**
     * Generates a 2D parametric anime wind path across the screen.
     * Incorporates an authentic anime loop-the-loop / spiral vortex (trochoid curve)
     * where the wind enters, swoops into a 360° loop, and smoothly unrolls forward.
     */
    function generateAnimeWindPath(width, height, customY = null) {
      const baseY = customY !== null ? Math.max(80, Math.min(height - 80, customY)) : (0.2 + Math.random() * 0.6) * height;
      const waveAmp = 18 + Math.random() * 20;
      const waveFreq = 0.0035 + Math.random() * 0.002;
      const hasLoop = Math.random() > 0.15; // 85% chance of an anime loop-the-loop vortex

      // Position vortex between 32% and 68% of screen width
      const loopX = width * (0.32 + Math.random() * 0.36);
      const loopRadius = Math.min(width * 0.13, 40 + Math.random() * 22);
      const loopDir = Math.random() > 0.5 ? 1 : -1; // 1 = lifts up into the air, -1 = dips down

      const Rx = loopRadius * 0.65;
      const Dx = loopRadius * 1.55;
      const Dy = loopRadius * 1.15;

      const loopEntryX = loopX - Math.PI * Rx;
      const loopExitX = loopX + Math.PI * Rx;

      const rawPoints = [];
      const startX = -150;
      const endX = width + 150;

      if (!hasLoop) {
        // Pure undulating gentle breeze
        for (let x = startX; x <= endX; x += 6) {
          const y = baseY + waveAmp * Math.sin((x - startX) * waveFreq);
          rawPoints.push({ x, y });
        }
        return buildUniformPath(rawPoints, 4, false, 0, 0);
      }

      // 1. Approach phase (left edge up to loop entry)
      for (let x = startX; x <= loopEntryX; x += 6) {
        // Smooth ease-out on the wave as it joins the loop entry tangentially
        const distFromLoop = Math.max(0, loopEntryX - x);
        const waveEase = Math.min(1, distFromLoop / 120);
        const y = baseY + waveAmp * Math.sin((x - startX) * waveFreq) * waveEase;
        rawPoints.push({ x, y });
      }

      const loopIdxStart = rawPoints.length;

      // 2. Trochoid Loop phase (theta from -PI to +PI)
      // Produces an authentic self-intersecting 360° anime loop-the-loop!
      const loopSteps = 64;
      for (let i = 0; i <= loopSteps; i++) {
        const theta = -Math.PI + (i / loopSteps) * (Math.PI * 2);
        const px = loopX + Rx * theta - Dx * Math.sin(theta);
        const py = baseY - loopDir * Dy * (1 + Math.cos(theta));
        rawPoints.push({ x: px, y: py });
      }

      const loopIdxEnd = rawPoints.length - 1;

      // 3. Exit phase (from loop exit to right edge of screen)
      for (let x = loopExitX; x <= endX; x += 6) {
        const distPastLoop = Math.max(0, x - loopExitX);
        const waveEase = Math.min(1, distPastLoop / 120);
        const y = baseY + waveAmp * Math.sin((x - startX) * waveFreq) * waveEase;
        rawPoints.push({ x, y });
      }

      return buildUniformPath(rawPoints, 4, true, loopIdxStart, loopIdxEnd);
    }

    /**
     * Resamples raw points into uniform arc-length intervals with precomputed normals and angles.
     */
    function buildUniformPath(rawPoints, stepSize = 4, hasLoop = false, loopIdxStart = 0, loopIdxEnd = 0) {
      if (rawPoints.length === 0) return { points: [], totalLength: 0, stepSize, hasLoop };

      // Compute cumulative raw distances
      let cumDist = 0;
      rawPoints[0].dist = 0;
      for (let i = 1; i < rawPoints.length; i++) {
        const dx = rawPoints[i].x - rawPoints[i - 1].x;
        const dy = rawPoints[i].y - rawPoints[i - 1].y;
        cumDist += Math.hypot(dx, dy);
        rawPoints[i].dist = cumDist;
      }
      const totalLength = cumDist;
      const loopDistStart = hasLoop && loopIdxStart < rawPoints.length ? rawPoints[loopIdxStart].dist : 0;
      const loopDistEnd = hasLoop && loopIdxEnd < rawPoints.length ? rawPoints[loopIdxEnd].dist : 0;

      const points = [];
      let rawIdx = 0;
      for (let d = 0; d <= totalLength; d += stepSize) {
        while (rawIdx < rawPoints.length - 2 && rawPoints[rawIdx + 1].dist < d) {
          rawIdx++;
        }
        const p1 = rawPoints[rawIdx];
        const p2 = rawPoints[rawIdx + 1] || p1;
        const segLen = (p2.dist - p1.dist) || 1;
        const t = Math.max(0, Math.min(1, (d - p1.dist) / segLen));

        const x = p1.x + (p2.x - p1.x) * t;
        const y = p1.y + (p2.y - p1.y) * t;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.hypot(dx, dy) || 1;
        const angle = Math.atan2(dy, dx);
        // Unit normal vector perpendicular to direction of flight
        const nx = -dy / len;
        const ny = dx / len;

        points.push({ x, y, nx, ny, angle, dist: d });
      }

      return {
        points,
        totalLength,
        stepSize,
        hasLoop,
        loopDistStart,
        loopDistEnd
      };
    }

    /**
     * Interpolates point position, tangent direction, and normal at distance d with lateral offset.
     */
    function getPathPoint(pathData, d, lateralOffset = 0) {
      const { points, totalLength, stepSize } = pathData;
      if (!points || points.length === 0) return { x: 0, y: 0, angle: 0 };

      if (d <= 0) {
        const p = points[0];
        return { x: p.x + p.nx * lateralOffset, y: p.y + p.ny * lateralOffset, angle: p.angle };
      }
      if (d >= totalLength) {
        const p = points[points.length - 1];
        return { x: p.x + p.nx * lateralOffset, y: p.y + p.ny * lateralOffset, angle: p.angle };
      }

      const idx = Math.floor(d / stepSize);
      const frac = (d - idx * stepSize) / stepSize;
      const p1 = points[idx];
      const p2 = points[Math.min(points.length - 1, idx + 1)];

      const x = p1.x + (p2.x - p1.x) * frac;
      const y = p1.y + (p2.y - p1.y) * frac;
      const nx = p1.nx + (p2.nx - p1.nx) * frac;
      const ny = p1.ny + (p2.ny - p1.ny) * frac;

      // Handle angular interpolation cleanly around +/-PI
      let diff = p2.angle - p1.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      const angle = p1.angle + diff * frac;

      return {
        x: x + nx * lateralOffset,
        y: y + ny * lateralOffset,
        angle
      };
    }

    function spawnWindGust(customY = null) {
      const path = generateAnimeWindPath(width, height, customY);
      const speed = 4.4 + Math.random() * 2.2;
      const gustLength = Math.min(width * 0.72, 340 + Math.random() * 200);

      // 3 anime streamline trails with parallel lateral offsets
      const trails = [
        { lateralOffset: 0, delay: 0, width: 1.8, isPrimary: true },
        { lateralOffset: (Math.random() > 0.5 ? 1 : -1) * (9 + Math.random() * 8), delay: 18, width: 1.1, isPrimary: false },
        { lateralOffset: (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 10), delay: 34, width: 0.8, isPrimary: false }
      ];

      // 3 to 5 little fluttering leaves riding the breeze
      const leafCount = 3 + Math.floor(Math.random() * 3);
      const leaves = [];
      for (let i = 0; i < leafCount; i++) {
        leaves.push({
          relPos: 0.12 + (i / leafCount) * 0.72 + (Math.random() - 0.5) * 0.1,
          lateralOffset: (Math.random() - 0.5) * 22,
          size: 11 + Math.random() * 7,
          rotOffset: (Math.random() - 0.5) * 0.5,
          spinSpeed: 0.05 + Math.random() * 0.06,
          flutterPhase: Math.random() * Math.PI * 2,
          flipSpeed: 0.08 + Math.random() * 0.08,
          isTwinSprout: i % 2 === 0
        });
      }

      windGusts.push({
        path,
        headDist: 0,
        speed,
        length: gustLength,
        trails,
        leaves
      });
    }

    function renderAmbient(time) {
      ctx.clearRect(0, 0, width, height);
      const colors = getGrassColors();

      // 1. Draw ambient floating particles
      particles.forEach(p => {
        p.x += p.vx + (mouse.speed > 2 ? (mouse.x > p.x ? 0.3 : -0.3) : 0);
        p.y += p.vy + Math.sin(time * 0.0015 + p.phase) * 0.35 - scrollDelta * 0.1;
        p.angle += p.vAngle;

        if (p.x > width + 40) p.x = -40;
        if (p.x < -40) p.x = width + 40;
        if (p.y > height + 40) p.y = -40;
        if (p.y < -40) p.y = height + 40;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'blade') {
          ctx.beginPath();
          ctx.moveTo(0, -p.length / 2);
          ctx.quadraticCurveTo(p.curve, 0, 0, p.length / 2);
          ctx.strokeStyle = colors.blades[Math.floor(p.phase) % colors.blades.length];
          ctx.lineWidth = 1.4;
          ctx.lineCap = 'round';
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.ellipse(0, 0, 3.5, 1.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = colors.spores;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.length * 0.7, -p.curve * 0.5);
          ctx.strokeStyle = colors.blades[0];
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      });

      // 2. Draw & update Anime Wind Streamlines & Swirling Leaves
      windGusts.forEach(gust => {
        gust.headDist += gust.speed;

        // Draw flowing anime streamlines
        gust.trails.forEach(tr => {
          const leadDist = gust.headDist - tr.delay;
          const tailDist = leadDist - gust.length;

          if (leadDist > 0 && tailDist < gust.path.totalLength) {
            const dStart = Math.max(0, tailDist);
            const dEnd = Math.min(gust.path.totalLength, leadDist);

            if (dEnd > dStart + 10) {
              ctx.save();
              ctx.beginPath();
              let isFirst = true;
              const stepDraw = Math.max(6, gust.path.stepSize * 2);

              for (let d = dStart; d <= dEnd; d += stepDraw) {
                const pt = getPathPoint(gust.path, d, tr.lateralOffset);
                if (isFirst) {
                  ctx.moveTo(pt.x, pt.y);
                  isFirst = false;
                } else {
                  ctx.lineTo(pt.x, pt.y);
                }
              }
              const tip = getPathPoint(gust.path, dEnd, tr.lateralOffset);
              ctx.lineTo(tip.x, tip.y);

              // Tapered gradient: soft at tail, crisp at head
              const tailPt = getPathPoint(gust.path, dStart, tr.lateralOffset);
              const col = tr.isPrimary ? colors.windPrimary : colors.windSecondary;
              const dist = Math.hypot(tip.x - tailPt.x, tip.y - tailPt.y);

              if (dist > 30) {
                const grad = ctx.createLinearGradient(tailPt.x, tailPt.y, tip.x, tip.y);
                grad.addColorStop(0, 'rgba(0,0,0,0)');
                grad.addColorStop(0.2, col);
                grad.addColorStop(0.85, col);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.strokeStyle = grad;
              } else {
                ctx.strokeStyle = col;
              }

              ctx.lineWidth = tr.width;
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              ctx.stroke();
              ctx.restore();
            }
          }
        });

        // Draw fluttering leaves riding along the wind gust and swirling in the spiral
        gust.leaves.forEach(lf => {
          const leafDist = gust.headDist - (gust.length * lf.relPos);

          if (leafDist >= 0 && leafDist <= gust.path.totalLength) {
            const pt = getPathPoint(gust.path, leafDist, lf.lateralOffset);

            if (pt.x > -40 && pt.x < width + 40 && pt.y > -40 && pt.y < height + 40) {
              // Accelerate spin and 3D tumble when passing through the spiral vortex
              const inLoop = gust.path.hasLoop && leafDist >= gust.path.loopDistStart && leafDist <= gust.path.loopDistEnd;
              if (inLoop) {
                lf.rotOffset += lf.spinSpeed * 2.8;
                lf.flutterPhase += lf.flipSpeed * 2.4;
              } else {
                lf.rotOffset += lf.spinSpeed;
                lf.flutterPhase += lf.flipSpeed;
              }

              const totalAngle = pt.angle + lf.rotOffset;
              const flip = Math.sin(lf.flutterPhase);

              ctx.save();
              ctx.translate(pt.x, pt.y);
              ctx.rotate(totalAngle);
              ctx.scale(1, Math.max(0.18, Math.abs(flip)) * Math.sign(flip || 1));

              const leafSize = lf.size;
              ctx.fillStyle = lf.isTwinSprout ? colors.leafSecondary : colors.leafPrimary;

              // Organic pointed leaf shape (matching logo sprout)
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.bezierCurveTo(-leafSize * 0.48, -leafSize * 0.3, -leafSize * 0.38, -leafSize * 0.88, 0, -leafSize * 1.18);
              ctx.bezierCurveTo(leafSize * 0.38, -leafSize * 0.88, leafSize * 0.48, -leafSize * 0.3, 0, 0);
              ctx.fill();

              // Central delicate leaf vein
              ctx.beginPath();
              ctx.moveTo(0, -leafSize * 0.08);
              ctx.lineTo(0, -leafSize * 1.05);
              ctx.strokeStyle = colors.leafVein;
              ctx.lineWidth = 0.9;
              ctx.stroke();

              // If twin sprout, draw second smaller leaf branching off
              if (lf.isTwinSprout) {
                ctx.save();
                ctx.rotate(-0.58);
                ctx.scale(0.82, 0.82);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-leafSize * 0.45, -leafSize * 0.3, -leafSize * 0.35, -leafSize * 0.85, 0, -leafSize * 1.15);
                ctx.bezierCurveTo(leafSize * 0.35, -leafSize * 0.85, leafSize * 0.45, -leafSize * 0.3, 0, 0);
                ctx.fill();
                ctx.restore();
              }

              ctx.restore();
            }
          }
        });
      });

      // Cleanup finished gusts that passed beyond the path end
      for (let g = windGusts.length - 1; g >= 0; g--) {
        if (windGusts[g].headDist - windGusts[g].length > windGusts[g].path.totalLength + 50) {
          windGusts.splice(g, 1);
        }
      }

      // Periodic natural anime breeze spawn every 6 to 9 seconds
      if (time > nextGustTime) {
        spawnWindGust();
        nextGustTime = time + 6000 + Math.random() * 3000;
        lastGustTime = time;
      }

      // Mouse sweep wind trigger
      if (mouse.speed > 16 && (time - lastGustTime > 2800)) {
        spawnWindGust(mouse.y);
        lastGustTime = time;
      }

      // Decay scroll delta
      scrollDelta *= 0.92;
    }

    // ------------------------------------------------------------------------
    // B. Pradera Interactiva de Campo (Hero & Footer Ground Canvases)
    // ------------------------------------------------------------------------
    function createGroundGrass(canvasId, densityFactor = 10) {
      const gCanvas = document.getElementById(canvasId);
      if (!gCanvas) return null;

      const gCtx = gCanvas.getContext('2d');
      let gWidth = 0;
      let gHeight = 0;
      let blades = [];

      function setupBlades() {
        const rect = gCanvas.parentElement.getBoundingClientRect();
        gWidth = gCanvas.width = rect.width;
        gHeight = gCanvas.height = 85;
        blades = [];

        const count = Math.floor(gWidth / densityFactor);
        for (let i = 0; i < count; i++) {
          const x = (i / count) * gWidth + (Math.random() - 0.5) * (densityFactor * 0.7);
          const height = 40 + Math.random() * 42;
          const isWheat = Math.random() > 0.75; // 25% cereal/wheat heads
          blades.push({
            x,
            baseY: gHeight + 2,
            height,
            width: 1.8 + Math.random() * 1.5,
            naturalLean: (Math.random() - 0.5) * 16,
            currentLean: 0,
            targetLean: 0,
            velocity: 0,
            phase: Math.random() * Math.PI * 2,
            swayFreq: 0.0018 + Math.random() * 0.0012,
            swayAmp: 6 + Math.random() * 10,
            isWheat,
            colorIndex: Math.floor(Math.random() * 4)
          });
        }
      }

      setupBlades();
      window.addEventListener('resize', setupBlades, { passive: true });

      // Direct click interaction on grass divider
      gCanvas.addEventListener('click', (e) => {
        playTactileClick();
        registerGrassInteraction(e.clientX, e.clientY);
        const rect = gCanvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        blades.forEach(b => {
          const d = Math.abs(b.x - clickX);
          if (d < 140) {
            b.velocity += (b.x > clickX ? 1 : -1) * (1 - d / 140) * 35;
          }
        });
      });

      // Mouse scrubbing over grass divider
      gCanvas.addEventListener('mousemove', (e) => {
        if (mouse.speed > 2.0) {
          registerGrassInteraction(e.clientX, e.clientY);
        }
      }, { passive: true });

      // Touch interaction on mobile
      gCanvas.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          const t = e.touches[0];
          const rect = gCanvas.getBoundingClientRect();
          const touchX = t.clientX - rect.left;
          registerGrassInteraction(t.clientX, t.clientY);
          blades.forEach(b => {
            const d = Math.abs(b.x - touchX);
            if (d < 140) {
              b.velocity += (b.x > touchX ? 1 : -1) * (1 - d / 140) * 35;
            }
          });
        }
      }, { passive: true });

      gCanvas.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          const t = e.touches[0];
          mouse.x = t.clientX;
          mouse.y = t.clientY;
          mouse.speed = 12;
          registerGrassInteraction(t.clientX, t.clientY);
        }
      }, { passive: true });

      return {
        update: function(time) {
          if (!gCanvas.isConnected) return;
          const rect = gCanvas.getBoundingClientRect();

          // Only render if visible in viewport
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;

          gCtx.clearRect(0, 0, gWidth, gHeight);
          const colors = getGrassColors();

          // Global traveling breeze wave across the field
          const windGust = Math.sin(time * 0.0018) * 6 + Math.cos(time * 0.0006) * 4;

          blades.forEach(b => {
            // Wind force
            const ambientSway = Math.sin(time * b.swayFreq + b.phase) * b.swayAmp + windGust;

            // Cursor proximity interaction
            let cursorPush = 0;
            const screenTipX = rect.left + b.x + b.currentLean;
            const screenTipY = rect.top + (b.baseY - b.height);
            const dx = screenTipX - mouse.x;
            const dy = screenTipY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const pushFactor = (1 - dist / 110);
              cursorPush = (dx > 0 ? 1 : -1) * pushFactor * 32;

              // Detect vigorous back-and-forth rustling of grass blades
              if (mouse.speed > 4.5) {
                const currentDir = dx > 0 ? 1 : -1;
                if (b._lastDir && b._lastDir !== currentDir) {
                  registerGrassInteraction(screenTipX, screenTipY);
                }
                b._lastDir = currentDir;
              }
            }

            // Target lean with spring physics
            b.targetLean = b.naturalLean + ambientSway + cursorPush;
            const spring = 0.14;
            const damping = 0.84;
            b.velocity += (b.targetLean - b.currentLean) * spring;
            b.velocity *= damping;
            b.currentLean += b.velocity;

            // Draw grass blade
            const tipX = b.x + b.currentLean;
            const tipY = b.baseY - b.height;
            const controlX = b.x + b.currentLean * 0.45;
            const controlY = b.baseY - b.height * 0.55;

            gCtx.beginPath();
            gCtx.moveTo(b.x - b.width / 2, b.baseY);
            gCtx.quadraticCurveTo(controlX - b.width / 4, controlY, tipX, tipY);
            gCtx.quadraticCurveTo(controlX + b.width / 4, controlY, b.x + b.width / 2, b.baseY);
            gCtx.fillStyle = colors.blades[b.colorIndex % colors.blades.length];
            gCtx.fill();

            // Draw wheat / sorghum seed spike if applicable
            if (b.isWheat) {
              gCtx.save();
              gCtx.translate(tipX, tipY);
              const angle = Math.atan2(tipY - controlY, tipX - controlX);
              gCtx.rotate(angle);

              gCtx.fillStyle = colors.wheatHead;
              for (let s = 0; s < 5; s++) {
                const stepY = -s * 4;
                // Left grain
                gCtx.beginPath();
                gCtx.ellipse(-2.5, stepY, 2.2, 1.2, -0.4, 0, Math.PI * 2);
                gCtx.fill();
                // Right grain
                gCtx.beginPath();
                gCtx.ellipse(2.5, stepY, 2.2, 1.2, 0.4, 0, Math.PI * 2);
                gCtx.fill();
              }
              // Top whisker
              gCtx.beginPath();
              gCtx.moveTo(0, -20);
              gCtx.lineTo(0, -28);
              gCtx.strokeStyle = colors.wheatHead;
              gCtx.lineWidth = 0.8;
              gCtx.stroke();

              gCtx.restore();
            }
          });
        }
      };
    }

    const heroGround = createGroundGrass('heroGrassCanvas', 9);
    const footerGround = createGroundGrass('footerGrassCanvas', 10);

    // ------------------------------------------------------------------------
    // C. Easter Egg: Bandada de Drones Pajaritos ("Drones como Pajaritos")
    // Requiere agitar/interactuar continuamente con las ramas por MÁS DE 20 SEGUNDOS.
    // ------------------------------------------------------------------------
    const droneCanvas = document.getElementById('droneFlockCanvas');
    const droneToast = document.getElementById('droneFlockToast');
    let droneCtx = null;
    let activeDrones = [];
    let rustleSessionStartTime = 0;
    let lastRustleActionTime = 0;
    let accumulatedRustleTimeMs = 0;
    let lastEasterEggTime = 0;
    let toastTimeout = null;
    const REQUIRED_RUSTLE_DURATION_MS = 20000; // Estricto: más de 20 segundos continuos (20.0s)

    if (droneCanvas) {
      droneCtx = droneCanvas.getContext('2d');
      function resizeDroneCanvas() {
        droneCanvas.width = window.innerWidth;
        droneCanvas.height = window.innerHeight;
      }
      resizeDroneCanvas();
      window.addEventListener('resize', resizeDroneCanvas, { passive: true });
    }

    /**
     * Interacción acumulativa con las ramitas (moviéndolas, frotándolas o tocándolas).
     * Exige agitar continuamente las ramas durante MÁS DE 20 SEGUNDOS (> 20,000 ms).
     * Si el usuario se detiene por más de 1.8 segundos, el temporizador se reinicia a 0.
     */
    function registerGrassInteraction(arg1, arg2, arg3) {
      let originX, originY;
      if (typeof arg3 === 'number') {
        originX = arg2;
        originY = arg3;
      } else if (typeof arg2 === 'number') {
        originX = arg1;
        originY = arg2;
      } else {
        originX = window.innerWidth / 2;
        originY = window.innerHeight * 0.75;
      }

      const now = performance.now();

      // Enfriamiento de 8s tras el despegue para no solapar bandadas
      if (now - lastEasterEggTime < 8000) {
        return;
      }

      if (lastRustleActionTime > 0) {
        const gap = now - lastRustleActionTime;
        if (gap > 1800) {
          // Pausa mayor a 1.8s: se interrumpió la agitación y se reinicia el contador de 20s
          rustleSessionStartTime = now;
          accumulatedRustleTimeMs = 0;
        } else if (gap > 0) {
          accumulatedRustleTimeMs += Math.min(gap, 250);
        }
      } else {
        rustleSessionStartTime = now;
        accumulatedRustleTimeMs = 0;
      }

      lastRustleActionTime = now;
      const sessionDuration = now - rustleSessionStartTime;

      // El Easter Egg SOLO se activa si la interacción continua supera los 20 segundos
      if (sessionDuration >= REQUIRED_RUSTLE_DURATION_MS && accumulatedRustleTimeMs >= (REQUIRED_RUSTLE_DURATION_MS * 0.70)) {
        accumulatedRustleTimeMs = 0;
        rustleSessionStartTime = 0;
        lastRustleActionTime = 0;
        lastEasterEggTime = now;

        spawnDroneFlock(originX || window.innerWidth / 2, originY || window.innerHeight * 0.75);
      }
    }

    /**
     * Clase BirdDrone: Micro-dron bio-inspirado con física y aleteo de pájaro
     */
    class BirdDrone {
      constructor(x, y, delay, flockDir, idx, total) {
        this.x = x + (Math.random() - 0.5) * 80;
        this.y = y + (Math.random() - 0.5) * 30;
        this.delay = delay;
        this.active = false;
        this.age = 0;
        this.size = 13 + Math.random() * 6; // Tamaño compacto tipo colibrí/pajarito (13-19px)
        this.flockDir = flockDir;

        // Impulso inicial explosivo ascendente (aves asustadas en el pasto)
        this.vx = (flockDir * (2.8 + Math.random() * 3.4)) + (Math.random() - 0.5) * 2.6;
        this.vy = -(8.2 + Math.random() * 6.5);

        // Dinámica de vuelo ondulante (bird bounding flight)
        this.waveFreq = 0.0032 + Math.random() * 0.002;
        this.waveAmp = 1.6 + Math.random() * 1.8;
        this.flapPhase = Math.random() * Math.PI * 2;
        this.flapFreq = 0.024 + Math.random() * 0.008;
        this.rotorSpin = Math.random() * 10;
        this.angle = 0;
        this.targetAngle = 0;

        // LED estroboscópico de navegación (verde/rojo)
        this.ledPhase = Math.random() * Math.PI * 2;
        this.ledColor = Math.random() > 0.35 ? '#4ADE80' : '#FF4444';

        // Estela aerodinámica
        this.trail = [];
      }

      update(dt, time) {
        if (this.delay > 0) {
          this.delay -= dt;
          return true;
        }
        this.active = true;
        this.age += dt;

        // Ondulación tipo vuelo de ave: seno sobre aceleración vertical
        const liftWave = Math.sin(this.age * this.waveFreq);
        this.vy += liftWave * 0.22 - 0.04;
        this.vx += this.flockDir * 0.038;

        // Resistencia aerodinámica
        this.vx *= 0.992;
        this.vy *= 0.988;

        this.x += this.vx;
        this.y += this.vy;

        // Rotación de hélices y aleteo de brazos
        this.rotorSpin += 0.85;
        this.flapPhase += this.flapFreq * dt;

        // Inclinación bancada que sigue suavemente el vector de vuelo
        this.targetAngle = Math.atan2(this.vy, this.vx) + Math.PI / 2;
        let diff = this.targetAngle - this.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.angle += diff * 0.14;

        // Estela de vórtice
        if (this.age % 3 < 1) {
          this.trail.push({ x: this.x, y: this.y, alpha: 0.7 });
          if (this.trail.length > 8) this.trail.shift();
        }
        for (let i = 0; i < this.trail.length; i++) {
          this.trail[i].alpha *= 0.92;
        }

        // Límite fuera de pantalla (arriba y laterales)
        if (this.y < -130 || this.x < -180 || this.x > window.innerWidth + 180) {
          return false;
        }
        return true;
      }

      draw(ctx, isDark) {
        if (!this.active) return;

        // 1. Estela de vapor aerodinámico
        if (this.trail.length > 1) {
          ctx.save();
          for (let i = 1; i < this.trail.length; i++) {
            const p1 = this.trail[i - 1];
            const p2 = this.trail[i];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark 
              ? `rgba(130, 205, 125, ${p2.alpha * 0.45})` 
              : `rgba(52, 92, 51, ${p2.alpha * 0.4})`;
            ctx.lineWidth = (i / this.trail.length) * 2.2;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
          ctx.restore();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const flap = Math.sin(this.flapPhase);
        const s = this.size;
        const wingX = s * 0.65;
        const wingY = s * 0.45;
        const wingFlapOffset = flap * 4.2; // Aleteo vertical orgánico

        const frameColor = isDark ? '#F4F3EE' : '#121312';
        const bodyColor = isDark ? '#4ADE80' : '#345C33';
        const rotorColor = isDark ? 'rgba(163, 230, 53, 0.7)' : 'rgba(52, 92, 51, 0.6)';

        // 2. Brazos en cruz 'X' con aleteo oscilante
        ctx.strokeStyle = frameColor;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(-wingX, -wingY + wingFlapOffset);
        ctx.lineTo(wingX, wingY - wingFlapOffset);
        ctx.moveTo(wingX, -wingY + wingFlapOffset);
        ctx.lineTo(-wingX, wingY - wingFlapOffset);
        ctx.stroke();

        // 3. Cuatro micro-rotores giratorios con difuminado
        const rotorR = s * 0.36;
        const rotors = [
          { x: -wingX, y: -wingY + wingFlapOffset },
          { x: wingX, y: -wingY + wingFlapOffset },
          { x: -wingX, y: wingY - wingFlapOffset },
          { x: wingX, y: wingY - wingFlapOffset }
        ];

        rotors.forEach((r, idx) => {
          ctx.fillStyle = rotorColor;
          ctx.beginPath();
          const spinAngle = this.rotorSpin + idx * (Math.PI / 2);
          ctx.ellipse(r.x, r.y, rotorR, rotorR * 0.35, spinAngle, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = frameColor;
          ctx.beginPath();
          ctx.arc(r.x, r.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        });

        // 4. Fuselaje aerodinámico central en forma de gota (cuerpo de ave)
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.65); // Pico
        ctx.bezierCurveTo(s * 0.38, -s * 0.2, s * 0.32, s * 0.4, 0, s * 0.65); // Cola
        ctx.bezierCurveTo(-s * 0.32, s * 0.4, -s * 0.38, -s * 0.2, 0, -s * 0.65);
        ctx.fill();
        ctx.strokeStyle = frameColor;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // 5. Sensor óptico / ojo del dron
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, -s * 0.38, 2.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isDark ? '#121312' : '#22C55E';
        ctx.beginPath();
        ctx.arc(0, -s * 0.38, 1.1, 0, Math.PI * 2);
        ctx.fill();

        // 6. Faro LED estroboscópico en la cola
        if (Math.sin(this.age * 0.02 + this.ledPhase) > 0.1) {
          ctx.fillStyle = this.ledColor;
          ctx.shadowColor = this.ledColor;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, s * 0.58, 2.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      }
    }

    /**
     * Dispara el enjambre de 18-22 micro-drones despegando como aves silvestres
     */
    function spawnDroneFlock(originX, originY) {
      playBirdDroneChirp();

      // Dirección general de la bandada: hacia el lado con más cielo despejado
      const flockDir = originX < window.innerWidth * 0.5 ? 1 : -1;
      const droneCount = 18 + Math.floor(Math.random() * 5);

      for (let i = 0; i < droneCount; i++) {
        // Despegues escalonados rápidos (flurry de pájaros asustados)
        const delay = i * 26 + Math.random() * 32;
        activeDrones.push(new BirdDrone(originX, originY, delay, flockDir, i, droneCount));
      }

      // Notificación HUD elegante
      if (droneToast) {
        droneToast.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          droneToast.classList.remove('show');
        }, 3800);
      }
    }

    function updateDroneFlock(time) {
      if (!droneCtx || activeDrones.length === 0) return;

      droneCtx.clearRect(0, 0, droneCanvas.width, droneCanvas.height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const dt = 16.6;

      for (let i = activeDrones.length - 1; i >= 0; i--) {
        const alive = activeDrones[i].update(dt, time);
        if (alive) {
          activeDrones[i].draw(droneCtx, isDark);
        } else {
          activeDrones.splice(i, 1);
        }
      }

      if (activeDrones.length === 0) {
        droneCtx.clearRect(0, 0, droneCanvas.width, droneCanvas.height);
      }
    }

    // Interacción táctil en ramitas SVG del logotipo y de las tarjetas
    document.querySelectorAll('.brand-sprout, .corner-grass').forEach(ramita => {
      ramita.addEventListener('click', () => {
        playTactileClick();
        ramita.classList.remove('ramita-jiggling');
        void ramita.offsetWidth;
        ramita.classList.add('ramita-jiggling');
        const r = ramita.getBoundingClientRect();
        registerGrassInteraction(r.left + r.width / 2, r.top + r.height / 2);
      });

      ramita.addEventListener('mouseenter', () => {
        ramita.classList.remove('ramita-jiggling');
        void ramita.offsetWidth;
        ramita.classList.add('ramita-jiggling');
        const r = ramita.getBoundingClientRect();
        registerGrassInteraction(r.left + r.width / 2, r.top + r.height / 2);
      });

      ramita.addEventListener('mousemove', () => {
        if (mouse.speed > 2.0) {
          ramita.classList.add('ramita-jiggling');
          const r = ramita.getBoundingClientRect();
          registerGrassInteraction(r.left + r.width / 2, r.top + r.height / 2);
        }
      });

      ramita.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          const t = e.touches[0];
          ramita.classList.add('ramita-jiggling');
          registerGrassInteraction(t.clientX, t.clientY);
        }
      }, { passive: true });
    });

    // ------------------------------------------------------------------------
    // Master Animation Loop (Efficient 60FPS with Tab Sleep)
    // ------------------------------------------------------------------------
    let animationId = null;
    function masterLoop(time) {
      if (!document.hidden) {
        renderAmbient(time);
        if (heroGround) heroGround.update(time);
        if (footerGround) footerGround.update(time);
        updateDroneFlock(time);
      }
      animationId = requestAnimationFrame(masterLoop);
    }

    animationId = requestAnimationFrame(masterLoop);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      } else if (!document.hidden && !animationId) {
        animationId = requestAnimationFrame(masterLoop);
      }
    });
  }
}

/* ==========================================================================
   8. Preguntas Frecuentes Técnicas (FAQ Accordion)
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      playTactileClick();
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   10. Floating AI Assistant (Corral X Copilot)
   ========================================================================== */
function initAIAssistant() {
  const fabBtn = document.getElementById('aiFabBtn');
  const closeBtn = document.getElementById('aiCloseBtn');
  const chatDrawer = document.getElementById('aiChatDrawer');
  const chatForm = document.getElementById('aiChatForm');
  const chatInput = document.getElementById('aiChatInput');
  const chatMessages = document.getElementById('aiChatMessages');
  const chips = document.querySelectorAll('.ai-chip');

  if (!chatDrawer || !fabBtn) return;

  function toggleChat(open) {
    playTactileClick();
    const shouldOpen = open !== undefined ? open : !chatDrawer.classList.contains('open');
    if (shouldOpen) {
      chatDrawer.classList.add('open');
      chatDrawer.setAttribute('aria-hidden', 'false');
      fabBtn.setAttribute('aria-expanded', 'true');
      setTimeout(() => chatInput && chatInput.focus(), 250);
    } else {
      chatDrawer.classList.remove('open');
      chatDrawer.setAttribute('aria-hidden', 'true');
      fabBtn.setAttribute('aria-expanded', 'false');
    }
  }

  fabBtn.addEventListener('click', () => toggleChat());
  if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        if (!chatDrawer.classList.contains('open')) {
          toggleChat(true);
        }
        submitMessage(query);
      }
    });
  });

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      submitMessage(text);
    });
  }

  function appendMessage(sender, htmlContent) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar';
    avatar.textContent = sender === 'bot' ? 'IA' : 'TÚ';

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    bubble.innerHTML = htmlContent;

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendTypingIndicator() {
    if (!chatMessages) return null;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-msg ai-msg-bot';
    typingDiv.id = 'aiTypingIndicator';

    const avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar';
    avatar.textContent = 'IA';

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    bubble.innerHTML = `
      <div class="ai-typing-indicator">
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
      </div>
    `;

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(bubble);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('aiTypingIndicator');
    if (el) el.remove();
  }

  function submitMessage(text) {
    appendMessage('user', escapeHtml(text));
    const typingEl = appendTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const answer = generateResponse(text);
      appendMessage('bot', answer);
    }, 600 + Math.random() * 400);
  }

  function escapeHtml(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  function generateResponse(input) {
    const q = input.toLowerCase();

    // 1. Internet / Cobertura / Señal
    if (q.includes('internet') || q.includes('señal') || q.includes('starlink') || q.includes('lora') || q.includes('cobertura') || q.includes('comunicaci')) {
      return `<strong>No dependes de cobertura celular ni cables telefónicos.</strong><br><br>
        En AGRO TECH desplegamos una <strong>red mallada LoRaWAN</strong> de hasta 15 km de alcance punto a punto conectada a un terminal satelital Starlink instalado en el casco de tu finca.<br><br>
        Tus drones, tractores, válvulas de riego y aretes de ganado envían datos en tiempo real de forma 100% autónoma.`;
    }

    // 2. Combustible / Diésel / Gasolina / Luz / Electricidad
    if (q.includes('combustible') || q.includes('diesel') || q.includes('diésel') || q.includes('luz') || q.includes('electricidad') || q.includes('gasolina') || q.includes('bater')) {
      return `<strong>Cero dependencia del tendido eléctrico tradicional.</strong><br><br>
        Todas las cuadrillas operan con <strong>Estaciones Solares Híbridas Móviles</strong> con baterías LiFePO4 de carga rápida.<br><br>
        • El riego inteligente ahorra hasta un <strong>42% de diésel</strong> en bombas al irrigar solo por humedad del suelo.<br>
        • Los drones pulverizan con motores eléctricos brushless, eliminando el gasto de diésel de tractores pesados para fumigación.`;
    }

    // 3. Ganado / Corral X / Precios / App / Vacas / Ganaderos
    if (q.includes('ganad') || q.includes('vaca') || q.includes('búfalo') || q.includes('bufalo') || q.includes('corral') || q.includes('arete') || q.includes('abigeato') || q.includes('app') || q.includes('pesaje') || (q.includes('precio') && (q.includes('ganado') || q.includes('vaca') || q.includes('kilo')))) {
      return `<strong>Corral X: La app que conecta ganaderos directamente (P2P):</strong><br><br>
        • <strong>Venta Ganadero a Ganadero:</strong> Compra y vende lotes directamente entre productores, sin intermediarios comisionistas ni deducciones abusivas.<br>
        • <strong>IA Predictiva de Precios:</strong> Algoritmos de Machine Learning que analizan los ciclos de mercado ganadero para predecir precios futuros y decirte exactamente cuándo y a qué precio es más conveniente vender.<br>
        • <strong>Pesaje Digital & Estimación por IA:</strong> Estimación biométrica precisa de kilos en pie para negociar con certidumbre y transparencia.<br>
        • <strong>Tratos Seguros desde tu Teléfono:</strong> Trazabilidad del lote, verificación sanitaria y acuerdos directos con divisa garantizada.`;
    }

    // 4. Repuestos / Soporte / Sede / Zulia / Venezuela / Garantía
    if (q.includes('repuesto') || q.includes('soporte') || q.includes('mantenimiento') || q.includes('garant') || q.includes('repar') || q.includes('taller') || q.includes('sede') || q.includes('zulia') || q.includes('donde') || q.includes('dónde') || q.includes('ubicaci')) {
      return `<strong>Sede Principal en el Estado Zulia & Despliegue Nacional:</strong><br><br>
        Nuestra <strong>Sede Principal y Base de Operaciones de QUANTUN NEXUS C.A.</strong> está ubicada en el <strong>Estado Zulia, Venezuela</strong>.<br><br>
        • <strong>Almacén Central:</strong> Inventario permanente de repuestos originales (motores brushless, rotores, bombas de alta presión, antenas LoRa y módulos RTK).<br>
        • <strong>Cobertura Nacional:</strong> Cuadrillas técnicas móviles e ingenieros de campo con atención directa en finca en todo el territorio venezolano.<br>
        • <strong>Garantía Oficial:</strong> Respaldo técnico continuo sin esperas de importación.`;
    }

    // 5. Capacitación / Juventud / Personal / Hijos
    if (q.includes('capacita') || q.includes('personal') || q.includes('hijo') || q.includes('joven') || q.includes('aprender') || q.includes('curso') || q.includes('manejo')) {
      return `<strong>Transformamos el trabajo forzoso en empleo tecnológico atractivo:</strong><br><br>
        Los hijos de productores y jóvenes de la zona se capacitan en menos de <strong>5 días hábiles</strong>. En lugar de empuñar un machete o cargar una mochila de 25 kg bajo el sol, aprenden a comandar enjambres de drones y tractores RTK desde una tablet con aire acondicionado.<br><br>
        ¡Esto frena la migración juvenil y garantiza el relevo de tu finca!`;
    }

    // 6. Auditoría / Precio / Cuánto cuesta / Contratar / Visita
    if (q.includes('auditor') || q.includes('precio') || q.includes('costo') || q.includes('cuanto') || q.includes('cuánto') || q.includes('visita') || q.includes('cotiza') || q.includes('contacto')) {
      return `<strong>Puedes solicitar tu Auditoría Técnica de Finca hoy mismo:</strong><br><br>
        Nuestro equipo de ingenieros realiza un sobrevuelo multiespectral NDVI, levantamiento topográfico y mapa de prioridades sin compromiso en los estados de cobertura.<br><br>
        👉 <a href="#contacto" style="text-decoration: underline; font-weight: bold; color: var(--green-primary);">Completa el formulario al final de la página</a> o escríbenos directamente a WhatsApp: <a href="https://wa.me/584227158087" target="_blank" style="text-decoration: underline; font-weight: bold;">+58 422 715 8087</a>.`;
    }

    // 7. Drones / Pulverización / Fumigación / Especificaciones
    if (q.includes('dron') || q.includes('fumig') || q.includes('pulveriz') || q.includes('hectarea') || q.includes('especifica')) {
      return `<strong>Especificaciones de nuestro AGRO-DRONE V4:</strong><br><br>
        • Capacidad: Tanque de 40 Litros con bomba dual de alta presión.<br>
        • Pulverización: 8 boquillas centrífugas rotativas con control de gota de 50 a 500 micras.<br>
        • Rendimiento: Hasta <strong>18 Hectáreas por hora</strong> (120+ Ha por jornada diaria).<br>
        • Navegación: Posicionamiento RTK milimétrico con radar omnidireccional antiobstáculos.`;
    }

    // Default Fallback
    return `Gracias por tu consulta sobre el futuro de tu unidad de producción.<br><br>
      En <strong>AGRO TECH (QUANTUN NEXUS C.A.)</strong>, con sede principal en el <strong>Estado Zulia</strong>, estamos listos para asesorarte con enjambres de drones, riego solar agéntico, maquinaria RTK y la app <strong>Corral X</strong> (conexión directa ganadero a ganadero con IA predictiva de precios).<br><br>
      💬 <strong>Canal Inmediato WhatsApp:</strong> <a href="https://wa.me/584227158087" target="_blank" style="text-decoration: underline; font-weight: 700;">+58 422 715 8087</a> (0422-7158087)<br>
      ✉️ <strong>Correo Central:</strong> <a href="mailto:infocorralx@gmail.com" style="text-decoration: underline; font-weight: 700;">infocorralx@gmail.com</a><br><br>
      <em>O déjanos tus datos en el formulario de auditoría técnica en la página.</em>`;
  }
}

/* ==========================================================================
   11. Executive Technical Dossier Modal
   ========================================================================== */
function initDossierModal() {
  const modal = document.getElementById('dossierModal');
  const openDesktopBtn = document.getElementById('openDossierBtn');
  const openMobileBtn = document.getElementById('openDossierMobileBtn');
  const closeBtn = document.getElementById('closeDossierBtn');
  const backdrop = document.getElementById('dossierBackdrop');
  const dossierCtaBtn = document.getElementById('dossierCtaBtn');

  if (!modal) return;

  function openModal() {
    playTactileClick();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    playTactileClick();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openDesktopBtn) openDesktopBtn.addEventListener('click', openModal);
  if (openMobileBtn) openMobileBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  if (dossierCtaBtn) {
    dossierCtaBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

