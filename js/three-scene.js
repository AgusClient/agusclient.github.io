/**
 * Three.js 3D Interactive Scene for AClient Showcase
 * Deferred hardware-accelerated hero 3D artifact (skips mobile, reduced-motion,
 * save-data, and software rasterizers to keep main-thread TBT near zero).
 */

class LuxurySceneManager {
  constructor() {
    this.heroCanvas = document.getElementById('webgl-canvas');
    if (!this.heroCanvas) return;

    this.themeColors = {
      default: { primary: 0x8b5cf6, secondary: 0xec4899, metal: 0x1a1a24 },
      fuchsia: { primary: 0xf43f5e, secondary: 0xa855f7, metal: 0x22121b },
      azure:   { primary: 0x00f5d4, secondary: 0x00bbf9, metal: 0x0d1f2d },
      gold:    { primary: 0xfbbf24, secondary: 0xf59e0b, metal: 0x221a0d }
    };

    this.currentTheme = 'default';
    this.heroVisible = true;
    this.rafId = null;
    this.initialized = false;

    if (!this.shouldEnable3D()) {
      this.heroCanvas.style.display = 'none';
      return;
    }

    const scheduleInit = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => this.loadAndInit(), { timeout: 1200 });
      } else {
        setTimeout(() => this.loadAndInit(), 50);
      }
    };

    if (document.readyState === 'complete') {
      scheduleInit();
    } else {
      window.addEventListener('load', scheduleInit, { once: true });
    }
  }

  shouldEnable3D() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.matchMedia('(max-width: 991px), (pointer: coarse)').matches) return false;
    if (navigator.connection && navigator.connection.saveData) return false;

    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2') || probe.getContext('webgl');
      if (!gl) return false;

      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '') : '';
      const loseCtx = gl.getExtension('WEBGL_lose_context');
      if (loseCtx) loseCtx.loseContext();

      if (/swiftshader|llvmpipe|softpipe|software|microsoft basic render/i.test(renderer)) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  loadAndInit() {
    if (window.THREE) {
      this.initHeroScene();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => this.initHeroScene();
    script.onerror = () => {
      this.heroCanvas.style.display = 'none';
    };
    document.head.appendChild(script);
  }

  initHeroScene() {
    if (!this.heroCanvas || !window.THREE || this.initialized) return;
    this.initialized = true;

    this.scene = new THREE.Scene();
    const heroRect = this.heroCanvas.parentElement.getBoundingClientRect();
    const w = heroRect.width || window.innerWidth;
    const h = heroRect.height || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.heroCanvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    this.keyLight.position.set(5, 6, 4);
    this.scene.add(this.keyLight);

    const activeTheme = this.themeColors[this.currentTheme] || this.themeColors.default;

    this.accentLight1 = new THREE.PointLight(activeTheme.primary, 4.5, 20);
    this.accentLight1.position.set(-5, -2, 3);
    this.scene.add(this.accentLight1);

    this.accentLight2 = new THREE.PointLight(activeTheme.secondary, 3.5, 20);
    this.accentLight2.position.set(4, -4, -2);
    this.scene.add(this.accentLight2);

    this.artifactGroup = new THREE.Group();

    const coreGeometry = new THREE.TorusKnotGeometry(1.6, 0.48, 80, 16, 2, 3);
    this.coreMaterial = new THREE.MeshStandardMaterial({
      color: activeTheme.metal,
      metalness: 0.92,
      roughness: 0.18
    });
    this.coreMesh = new THREE.Mesh(coreGeometry, this.coreMaterial);
    this.artifactGroup.add(this.coreMesh);

    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.04, 10, 72);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.12
    });
    this.ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI / 3;
    this.artifactGroup.add(this.ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.025, 10, 72);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x8892b0,
      metalness: 0.8,
      roughness: 0.22
    });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.y = Math.PI / 4;
    this.ring2.rotation.x = -Math.PI / 6;
    this.artifactGroup.add(this.ring2);

    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePos[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    this.particleMaterial = new THREE.PointsMaterial({
      color: activeTheme.primary,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.particleCloud = new THREE.Points(particleGeo, this.particleMaterial);
    this.artifactGroup.add(this.particleCloud);

    this.artifactGroup.position.set(window.innerWidth > 992 ? 1.5 : 0, 0, 0);
    this.scene.add(this.artifactGroup);

    this.targetRotationX = 0;
    this.targetRotationY = 0;
    this.mouse = { x: 0, y: 0 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        this.heroVisible = en.isIntersecting;
        if (this.heroVisible) this.startLoop();
      }).observe(this.heroCanvas);
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.heroVisible) this.startLoop();
    });

    this.setupHeroEvents();
    this.renderer.render(this.scene, this.camera);
    this.heroCanvas.classList.add('ready');
    this.startLoop();
  }

  setupHeroEvents() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!this.camera || !this.renderer) return;
        const heroRect = this.heroCanvas.parentElement.getBoundingClientRect();
        const w = heroRect.width || window.innerWidth;
        const h = heroRect.height || window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h, false);
        this.artifactGroup.position.x = window.innerWidth > 992 ? 1.5 : 0;
      }, 120);
    }, { passive: true });

    const canvas = this.heroCanvas;

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;
        this.artifactGroup.rotation.y += deltaX * 0.008;
        this.artifactGroup.rotation.x += deltaY * 0.008;
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        this.targetRotationY = this.mouse.x * 0.45;
        this.targetRotationX = -this.mouse.y * 0.35;
      }
    }, { passive: true });

    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  startLoop() {
    if (this.rafId !== null) return;
    const tick = () => {
      if (!this.heroVisible || document.hidden) {
        this.rafId = null;
        return;
      }
      this.rafId = requestAnimationFrame(tick);

      const time = performance.now() * 0.001;
      if (!this.isDragging) {
        this.artifactGroup.rotation.y += (this.targetRotationY - this.artifactGroup.rotation.y) * 0.05 + 0.0025;
        this.artifactGroup.rotation.x += (this.targetRotationX - this.artifactGroup.rotation.x) * 0.05;
      }

      if (this.ring1) {
        this.ring1.rotation.z += 0.006;
        this.ring1.rotation.x += 0.004;
      }
      if (this.ring2) {
        this.ring2.rotation.y -= 0.005;
        this.ring2.rotation.z -= 0.003;
      }
      if (this.particleCloud) {
        this.particleCloud.rotation.y += 0.0015;
      }

      this.artifactGroup.position.y = Math.sin(time * 1.5) * 0.12;
      this.renderer.render(this.scene, this.camera);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    if (!this.initialized || !window.THREE) return;

    const config = this.themeColors[themeName] || this.themeColors.default;
    const targets = [
      [this.accentLight1.color, new THREE.Color(config.primary)],
      [this.accentLight2.color, new THREE.Color(config.secondary)],
      [this.particleMaterial.color, new THREE.Color(config.primary)],
      [this.coreMaterial.color, new THREE.Color(config.metal)]
    ];

    const starts = targets.map(([cur]) => cur.clone());
    const startTime = performance.now();
    const duration = 650;

    const stepColor = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      for (let i = 0; i < targets.length; i++) {
        targets[i][0].copy(starts[i]).lerp(targets[i][1], ease);
      }
      if (t < 1) requestAnimationFrame(stepColor);
    };
    requestAnimationFrame(stepColor);
  }
}

window.LuxurySceneManager = LuxurySceneManager;
