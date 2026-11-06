/**
 * Three.js 3D Interactive Scene for AETHER Showcase
 * Handles Hero 3D Artifact and Sandbox 3D Model with physically based rendering (PBR)
 */

class LuxurySceneManager {
  constructor() {
    this.heroCanvas = document.getElementById('webgl-canvas');
    this.sandboxCanvas = document.getElementById('sandbox-canvas');
    
    // Theme colors mapping for 3D lights and materials
    this.themeColors = {
      default: { primary: 0x8b5cf6, secondary: 0xec4899, metal: 0x1a1a24 },
      fuchsia: { primary: 0xf43f5e, secondary: 0xa855f7, metal: 0x22121b },
      azure:   { primary: 0x00f5d4, secondary: 0x00bbf9, metal: 0x0d1f2d },
      gold:    { primary: 0xfbbf24, secondary: 0xf59e0b, metal: 0x221a0d }
    };

    this.currentTheme = 'default';
    this.heroVisible = true;
    this.sandboxVisible = false;
    const watch = (el, key) => {
      if (!el || !('IntersectionObserver' in window)) return;
      new IntersectionObserver(([en]) => { this[key] = en.isIntersecting; }).observe(el);
    };
    watch(this.heroCanvas, 'heroVisible');
    watch(this.sandboxCanvas, 'sandboxVisible');
    this.initHeroScene();
    if (this.sandboxCanvas) {
      this.initSandboxScene();
    }
  }

  /* --- 1. HERO 3D EXPERIENCE --- */
  initHeroScene() {
    if (!this.heroCanvas) return;

    // 1. Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.heroCanvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // 2. Lighting Setup (Photographic Luxury Studio)
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    // Dynamic Colored Rim Lights
    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    this.keyLight.position.set(5, 6, 4);
    this.scene.add(this.keyLight);

    this.accentLight1 = new THREE.PointLight(this.themeColors.default.primary, 4.5, 20);
    this.accentLight1.position.set(-5, -2, 3);
    this.scene.add(this.accentLight1);

    this.accentLight2 = new THREE.PointLight(this.themeColors.default.secondary, 3.5, 20);
    this.accentLight2.position.set(4, -4, -2);
    this.scene.add(this.accentLight2);

    // 3. Flagship 3D Core Object (Acoustic Sculptural Form)
    this.artifactGroup = new THREE.Group();

    // Central Core: Precision Metallic Torus Knot
    const coreGeometry = new THREE.TorusKnotGeometry(1.6, 0.48, 120, 24, 2, 3);
    this.coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1c1e28,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      envMapIntensity: 2.0
    });
    this.coreMesh = new THREE.Mesh(coreGeometry, this.coreMaterial);
    this.artifactGroup.add(this.coreMesh);

    // Outer Gyroscope Rings (Titanium & Polished Glass Orbitals)
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.04, 32, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1
    });
    this.ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI / 3;
    this.artifactGroup.add(this.ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.025, 32, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x8892b0,
      metalness: 0.8,
      roughness: 0.2
    });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.y = Math.PI / 4;
    this.ring2.rotation.x = -Math.PI / 6;
    this.artifactGroup.add(this.ring2);

    // Micro Quantum Particle Cloud
    const particleCount = 280;
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
      color: this.themeColors.default.primary,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.particleCloud = new THREE.Points(particleGeo, this.particleMaterial);
    this.artifactGroup.add(this.particleCloud);

    // Center artifact slightly to the right for heroic layout balance on desktop
    if (window.innerWidth > 992) {
      this.artifactGroup.position.set(1.5, 0, 0);
    } else {
      this.artifactGroup.position.set(0, 0, 0);
    }

    this.scene.add(this.artifactGroup);

    // 4. Mouse Tracking & Drag Interaction
    this.targetRotationX = 0;
    this.targetRotationY = 0;
    this.mouse = { x: 0, y: 0 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    this.setupHeroEvents();
    this.animateHero();
  }

  setupHeroEvents() {
    window.addEventListener('resize', () => {
      if (!this.camera || !this.renderer) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      if (window.innerWidth > 992) {
        this.artifactGroup.position.x = 1.5;
      } else {
        this.artifactGroup.position.x = 0;
      }
    });

    // Mouse Move Parallax
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (!this.isDragging) {
        this.targetRotationY = this.mouse.x * 0.45;
        this.targetRotationX = -this.mouse.y * 0.35;
      }
    });

    // 3D Canvas Click & Drag Rotation
    const canvas = this.heroCanvas;
    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.artifactGroup.rotation.y += deltaX * 0.008;
      this.artifactGroup.rotation.x += deltaY * 0.008;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support for mobile 3D interaction
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.artifactGroup.rotation.y += deltaX * 0.008;
      this.artifactGroup.rotation.x += deltaY * 0.008;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  animateHero() {
    requestAnimationFrame(() => this.animateHero());
    if (!this.heroVisible || document.hidden) return;

    const time = performance.now() * 0.001;

    // Autonomous slow majestic floating rotation
    if (!this.isDragging) {
      this.artifactGroup.rotation.y += (this.targetRotationY - this.artifactGroup.rotation.y) * 0.05 + 0.0025;
      this.artifactGroup.rotation.x += (this.targetRotationX - this.artifactGroup.rotation.x) * 0.05;
    }

    // Secondary kinetic movements
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

    // Gentle vertical levitation oscillation
    this.artifactGroup.position.y = Math.sin(time * 1.5) * 0.12;

    this.renderer.render(this.scene, this.camera);
  }

  /* --- 2. SWITCH 3D FINISH & COLOR THEME --- */
  setTheme(themeName) {
    const config = this.themeColors[themeName] || this.themeColors.default;
    this.currentTheme = themeName;

    // Smooth transition of lights and materials
    if (window.gsap) {
      // Accent Light 1
      const col1 = new THREE.Color(config.primary);
      gsap.to(this.accentLight1.color, {
        r: col1.r, g: col1.g, b: col1.b, duration: 0.8
      });

      // Accent Light 2
      const col2 = new THREE.Color(config.secondary);
      gsap.to(this.accentLight2.color, {
        r: col2.r, g: col2.g, b: col2.b, duration: 0.8
      });

      // Particle Cloud color
      if (this.particleMaterial) {
        gsap.to(this.particleMaterial.color, {
          r: col1.r, g: col1.g, b: col1.b, duration: 0.8
        });
      }

      // Core Material color tint
      const metalCol = new THREE.Color(config.metal);
      gsap.to(this.coreMaterial.color, {
        r: metalCol.r, g: metalCol.g, b: metalCol.b, duration: 0.8
      });
    } else {
      this.accentLight1.color.setHex(config.primary);
      this.accentLight2.color.setHex(config.secondary);
      this.particleMaterial.color.setHex(config.primary);
      this.coreMaterial.color.setHex(config.metal);
    }
  }

  /* --- 3. SECONDARY 3D SANDBOX SCENE --- */
  initSandboxScene() {
    this.sandboxScene = new THREE.Scene();
    const rect = this.sandboxCanvas.getBoundingClientRect();
    const width = rect.width || 600;
    const height = rect.height || 480;

    this.sandboxCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.sandboxCamera.position.set(0, 0, 5.5);

    this.sandboxRenderer = new THREE.WebGLRenderer({
      canvas: this.sandboxCanvas,
      antialias: true,
      alpha: true
    });
    this.sandboxRenderer.setSize(width, height);
    this.sandboxRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    this.sandboxScene.add(amb);

    this.sandboxLight = new THREE.PointLight(0x8b5cf6, 3, 15);
    this.sandboxLight.position.set(3, 4, 3);
    this.sandboxScene.add(this.sandboxLight);

    // Sandbox Mesh (Morphable Icosahedron / Geodesic Sphere)
    const geo = new THREE.IcosahedronGeometry(1.8, 3);
    this.sandboxMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1e2e,
      wireframe: false,
      metalness: 0.85,
      roughness: 0.2
    });

    this.sandboxMesh = new THREE.Mesh(geo, this.sandboxMaterial);
    this.sandboxScene.add(this.sandboxMesh);

    this.sandboxSpeed = 0.01;
    this.animateSandbox();

    // Resize observer
    window.addEventListener('resize', () => {
      if (!this.sandboxCanvas) return;
      const r = this.sandboxCanvas.getBoundingClientRect();
      this.sandboxCamera.aspect = r.width / r.height;
      this.sandboxCamera.updateProjectionMatrix();
      this.sandboxRenderer.setSize(r.width, r.height);
    });
  }

  animateSandbox() {
    requestAnimationFrame(() => this.animateSandbox());
    if (!this.sandboxVisible || document.hidden) return;
    if (this.sandboxMesh) {
      this.sandboxMesh.rotation.y += this.sandboxSpeed;
      this.sandboxMesh.rotation.x += this.sandboxSpeed * 0.6;
    }
    this.sandboxRenderer.render(this.sandboxScene, this.sandboxCamera);
  }

  setSandboxWireframe(isWireframe) {
    if (this.sandboxMaterial) {
      this.sandboxMaterial.wireframe = isWireframe;
    }
  }

  setSandboxSpeed(val) {
    this.sandboxSpeed = parseFloat(val) * 0.02;
  }

  setSandboxIntensity(val) {
    if (this.sandboxLight) {
      this.sandboxLight.intensity = parseFloat(val);
    }
  }
}

window.LuxurySceneManager = LuxurySceneManager;
