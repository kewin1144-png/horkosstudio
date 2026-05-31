/* -----------------------------------------------------------------------------
   HORKOS STUDIO - ADVANCED INTERACTIVE EXPERIENCE SYSTEM (LESSE SYSTEM)
   ----------------------------------------------------------------------------- */

const initHorkosApp = () => {
  
  // ---------------------------------------------------------------------------
  // 1. STATE & CORE COORDINATES
  // ---------------------------------------------------------------------------
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const cursorGlow = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  let isMobile = window.innerWidth < 768;
  
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 768;
    resizeCanvas();
  });

  // ---------------------------------------------------------------------------
  // 2. SMOOTH trailing DUAL-CURSOR ENGINE & MAGNETISM (LIGHT CONTRAST)
  // ---------------------------------------------------------------------------
  const cursorDotEl = document.getElementById('custom-cursor');
  const cursorGlowEl = document.getElementById('custom-cursor-glow');
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function updateCustomCursor() {
    cursor.x += (mouse.x - cursor.x) * 0.28;
    cursor.y += (mouse.y - cursor.y) * 0.28;

    cursorGlow.x += (mouse.x - cursorGlow.x) * 0.12;
    cursorGlow.y += (mouse.y - cursorGlow.y) * 0.12;

    if (cursorDotEl && cursorGlowEl && !isMobile) {
      cursorDotEl.style.left = `${cursor.x}px`;
      cursorDotEl.style.top = `${cursor.y}px`;
      cursorGlowEl.style.left = `${cursorGlow.x}px`;
      cursorGlowEl.style.top = `${cursorGlow.y}px`;
    }

    requestAnimationFrame(updateCustomCursor);
  }
  requestAnimationFrame(updateCustomCursor);

  // Magnetic elements logic
  const magneticEls = document.querySelectorAll('.hover-magnetic');
  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      el.style.transform = `translate3d(${dx * 0.22}px, ${dy * 0.22}px, 0)`;
      
      if (cursorGlowEl) {
        cursorGlowEl.firstElementChild.style.width = '60px';
        cursorGlowEl.firstElementChild.style.height = '60px';
        cursorGlowEl.firstElementChild.style.borderColor = 'var(--brand-black)';
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      if (cursorGlowEl) {
        cursorGlowEl.firstElementChild.style.width = '48px';
        cursorGlowEl.firstElementChild.style.height = '48px';
        cursorGlowEl.firstElementChild.style.borderColor = 'rgba(13, 76, 140, 0.55)';
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 3. ULTRA-MINIMALIST PREMIUM PRELOADER SEQUENCE
  // ---------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-progress-bar');
  const percentageText = document.getElementById('preloader-percentage');

  let currentProgress = 0;
  
  // iOS/Safari-safe reload detection (performance.navigation is deprecated and crashes on modern WebKit)
  let isReload = false;
  try {
    const navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (navEntry) {
      isReload = navEntry.type === 'reload';
    } else if (performance.navigation) {
      isReload = performance.navigation.type === 1;
    }
  } catch (e) {
    isReload = false;
  }
  const hasLoadedThisSession = sessionStorage.getItem('horkos_loaded') === 'true';
  let _skipPreloader = hasLoadedThisSession && !isReload;

  // iOS detection for strict autoplay policies
  const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  function initPreloader() {
    if (!progressBar || !percentageText) return;

    const timer = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 4) + 1;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(endPreloader, 500);
      }
      
      progressBar.style.width = `${currentProgress}%`;
      percentageText.textContent = `${currentProgress}%`;
    }, 35);
  }
  
  if (preloader && !_skipPreloader) {
    preloader.style.display = 'flex';
    initPreloader();
  } else {
    _skipPreloader = true;
    if (preloader) {
      preloader.style.display = 'none';
    }
  }

  function endPreloader() {
    if (!preloader) return;
    
    // Injects the cinematic dimensional zoom-in transition
    preloader.classList.add('preloader-hidden');
    
    // Set session storage flag that we successfully finished preloader once
    sessionStorage.setItem('horkos_loaded', 'true');
    
    // Auto play sound on 50% when preloader fades out
    // iOS Safari blocks unmuted autoplay entirely — skip auto-unmute on iOS
    if (heroVideo) {
      if (!isIOSDevice) {
        heroVideo.muted = false;
        isVideoMuted = false;
        heroVideo.volume = 0.5;
        if (typeof updateVolumeUI === 'function') {
          updateVolumeUI(false);
        }
      }
      heroVideo.play().catch(() => {
        // Fallback to muted autoplay if browser blocks sound
        heroVideo.muted = true;
        isVideoMuted = true;
        if (typeof updateVolumeUI === 'function') {
          updateVolumeUI(true);
        }
        heroVideo.play().catch(() => {});
      });
    }
    
    setTimeout(() => {
      preloader.style.display = 'none';
      startHeroSlider();
      initScrollAnimations();
    }, 1200); // perfectly synced to the 1.2s CSS transition curve
  }

  // ---------------------------------------------------------------------------
  // 4. VERTICAL AUTOMATIC HERO SLIDER & PROGRESS FILL
  // ---------------------------------------------------------------------------
  const slides = document.querySelectorAll('.hero-slide');
  const progressFills = document.querySelectorAll('.progress-fill');
  let activeSlideIndex = 0;
  const slideDuration = 6500;
  let sliderTimer;
  let animFrameId;
  let fillStartTime;

  function startHeroSlider() {
    if (slides.length === 0) return;
    activeSlideIndex = 0;
    showSlide(0);
  }

  function showSlide(index) {
    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.remove('opacity-0');
        slide.classList.add('opacity-100', 'active');
      } else {
        slide.classList.remove('opacity-100', 'active');
        slide.classList.add('opacity-0');
      }
    });

    progressFills.forEach((fill) => {
      fill.style.width = '0%';
    });

    fillStartTime = performance.now();
    animateProgressFill();

    clearTimeout(sliderTimer);
    sliderTimer = setTimeout(() => {
      activeSlideIndex = (activeSlideIndex + 1) % slides.length;
      showSlide(activeSlideIndex);
    }, slideDuration);
  }

  function animateProgressFill() {
    const elapsed = performance.now() - fillStartTime;
    const progressPercent = Math.min((elapsed / slideDuration) * 100, 100);
    
    const activeFill = document.getElementById(`fill-${activeSlideIndex}`);
    if (activeFill) {
      activeFill.style.width = `${progressPercent}%`;
    }

    if (progressPercent < 100) {
      animFrameId = requestAnimationFrame(animateProgressFill);
    }
  }
  // ---------------------------------------------------------------------------
  // 5. HERO BACKGROUND VIDEO SCROLL & VOLUME CONTROLLER
  // ---------------------------------------------------------------------------
  const heroVideo = document.getElementById('hero-bg-video');
  const volumeBtn = document.getElementById('hero-volume-btn');
  const volumeIcon = document.getElementById('volume-icon');
  
  let isVideoMuted = true;
  
  function updateVolumeUI(muted) {
    if (!volumeIcon) return;
    
    if (muted) {
      volumeIcon.className = 'fa-solid fa-volume-xmark text-sm';
      if (volumeBtn) {
        volumeBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        volumeBtn.style.color = '#ffffff';
        volumeBtn.style.background = 'rgba(17, 16, 17, 0.3)';
      }
    } else {
      volumeIcon.className = 'fa-solid fa-volume-high text-sm';
      if (volumeBtn) {
        volumeBtn.style.borderColor = 'var(--brand-blue)';
        volumeBtn.style.color = 'var(--brand-blue)';
        volumeBtn.style.background = 'rgba(13, 76, 140, 0.1)';
      }
    }
  }

  if (heroVideo) {
    // Initial configuration: 50% volume but start muted to allow guaranteed autoplay
    heroVideo.volume = 0.5;
    heroVideo.muted = true;
    isVideoMuted = true;
    
    // Ensure the video loops correctly
    heroVideo.loop = true;

    // Autoplay attempt
    heroVideo.play().catch(() => {
      // Secondary fallback autoplay to ensure video absolutely plays
      heroVideo.muted = true;
      isVideoMuted = true;
      heroVideo.play().catch(() => {});
    });

    if (volumeBtn) {
      volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling to parent hero click listener
        isVideoMuted = !isVideoMuted;
        heroVideo.muted = isVideoMuted;
        
        // Force the video play state just in case
        if (heroVideo.paused) {
          heroVideo.play().catch(() => {});
        }
        
        updateVolumeUI(isVideoMuted);
      });
    }

    // Stop/toggle audio when clicking anywhere inside the hero video section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('click', (e) => {
        // Exclude direct clicks on the volume button to prevent double toggling
        if (volumeBtn && (e.target === volumeBtn || volumeBtn.contains(e.target))) {
          return;
        }
        
        isVideoMuted = !isVideoMuted;
        heroVideo.muted = isVideoMuted;
        
        if (heroVideo.paused) {
          heroVideo.play().catch(() => {});
        }
        
        updateVolumeUI(isVideoMuted);
      });
      
      // Add cursor pointer style to signal clickability of the showreel sound toggle
      heroSection.classList.add('cursor-pointer');
    }

    // Consolidated High-Performance Scroll Interaction
    const headerBacking = document.getElementById('header-backing');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 1. Pause video when completely offscreen to conserve CPU/GPU resources
      if (scrollY > windowHeight) {
        if (!heroVideo.paused) {
          heroVideo.pause();
        }
      } else {
        if (heroVideo.paused) {
          heroVideo.play().catch(() => {});
        }
      }

      // 2. Fade out fixed header carbon backing strip when scrolled away from Hero section
      if (headerBacking) {
        if (scrollY > 50) {
          headerBacking.classList.add('opacity-0');
          headerBacking.classList.remove('opacity-100');
        } else {
          headerBacking.classList.add('opacity-100');
          headerBacking.classList.remove('opacity-0');
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 5b. DEFERRED INITIALIZATION FOR RETURN VISITS (after all vars are declared)
  // ---------------------------------------------------------------------------
  if (_skipPreloader) {
    // Sync video mute state and volume UI on returning visits
    if (heroVideo) {
      heroVideo.muted = true;
      isVideoMuted = true;
      updateVolumeUI(true);
      heroVideo.play().catch(() => {});
    }

    startHeroSlider();

    // Defer scroll animations to ensure DOM layout settles, avoiding blank images
    setTimeout(() => {
      initScrollAnimations();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 150);
  }

  // ---------------------------------------------------------------------------
  // 6. CARD RADIAL GLOW & 3D PERSPECTIVE TILT MECHANICAL ENGINE (DESKTOP + MOBILE ORIENTATION)
  // ---------------------------------------------------------------------------
  const cards = document.querySelectorAll('.service-slide-card, .project-card, .expand-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      // Bypass tilt if card is expanded/active to keep layouts stable
      if (card.classList.contains('active')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Apply advanced 3D perspective tilt (Desktop mousemove only)
      if ((card.classList.contains('service-slide-card') || card.classList.contains('expand-card') || card.classList.contains('project-card')) && !isMobile) {
        // Calculate normalized coordinates (-0.5 to 0.5)
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Tilt degrees maximum bounds
        const maxRotateX = -normY * 12; // tilt up to 12 degrees on X
        const maxRotateY = normX * 12; // tilt up to 12 degrees on Y
        
        if (card.classList.contains('expand-card')) {
          card.style.transform = `perspective(1000px) rotateX(${maxRotateX}deg) rotateY(${maxRotateY}deg) scale(1.005)`;
        } else if (card.classList.contains('project-card')) {
          card.style.transform = `perspective(1000px) rotateX(${maxRotateX * 1.2}deg) rotateY(${maxRotateY * 1.2}deg) translateY(-4px) scale(1.01)`;
        } else {
          card.style.transform = `perspective(1000px) rotateX(${maxRotateX * 1.5}deg) rotateY(${maxRotateY * 1.5}deg) translateY(-8px)`;
        }
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('service-slide-card') || card.classList.contains('expand-card') || card.classList.contains('project-card')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      }
    });
  });

  // 6b. PHYSICAL DEVICE ORIENTATION TILT ENGINE FOR MOBILE & TABLET (TILT, SHAKE, BEND EFFECTS)
  let baseOrientation = null;
  let targetDeviceRotX = 0;
  let targetDeviceRotY = 0;
  let currentDeviceRotX = 0;
  let currentDeviceRotY = 0;

  function handleOrientation(event) {
    const beta = event.beta; // front-back pitch (-180 to 180)
    const gamma = event.gamma; // left-right roll (-90 to 90)

    if (beta === null || gamma === null) return;

    if (!baseOrientation) {
      baseOrientation = { beta, gamma };
      return;
    }

    // Relative angle changes
    let deltaBeta = beta - baseOrientation.beta;
    let deltaGamma = gamma - baseOrientation.gamma;

    // Clamp delta pitch & roll angles
    deltaBeta = Math.max(-25, Math.min(25, deltaBeta));
    deltaGamma = Math.max(-25, Math.min(25, deltaGamma));

    // Map delta tilt to rotation degrees (tilt up to 10 degrees on mobile/tablet)
    targetDeviceRotX = -(deltaBeta / 25) * 10;
    targetDeviceRotY = (deltaGamma / 25) * 10;
  }

  function updateDeviceTilt() {
    // Smooth physical transition calculations (Butter-smooth LERP)
    currentDeviceRotX += (targetDeviceRotX - currentDeviceRotX) * 0.12;
    currentDeviceRotY += (targetDeviceRotY - currentDeviceRotY) * 0.12;

    const isMobileOrTablet = window.innerWidth < 1024;
    if (isMobileOrTablet) {
      const mobileCards = document.querySelectorAll('.service-slide-card, .project-card, .expand-card');
      mobileCards.forEach((card) => {
        if (card.classList.contains('active')) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
          return;
        }

        if (card.classList.contains('expand-card')) {
          card.style.transform = `perspective(1000px) rotateX(${currentDeviceRotX}deg) rotateY(${currentDeviceRotY}deg) scale(1.002)`;
        } else if (card.classList.contains('project-card')) {
          card.style.transform = `perspective(1000px) rotateX(${currentDeviceRotX * 1.1}deg) rotateY(${currentDeviceRotY * 1.1}deg) translateY(-2px) scale(1.005)`;
        } else {
          card.style.transform = `perspective(1000px) rotateX(${currentDeviceRotX * 1.3}deg) rotateY(${currentDeviceRotY * 1.3}deg) translateY(-4px)`;
        }
      });
    }

    requestAnimationFrame(updateDeviceTilt);
  }

  if (window.DeviceOrientationEvent) {
    // Prevent double-request on iOS (both click and touchstart fire on single tap)
    let orientationPermissionRequested = false;
    const requestDeviceOrientationPermission = () => {
      if (orientationPermissionRequested) return;
      orientationPermissionRequested = true;

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(() => { /* Silently handle permission denial on iOS */ });
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
      
      window.removeEventListener('click', requestDeviceOrientationPermission);
      window.removeEventListener('touchstart', requestDeviceOrientationPermission);
    };

    window.addEventListener('click', requestDeviceOrientationPermission, { passive: true });
    window.addEventListener('touchstart', requestDeviceOrientationPermission, { passive: true });

    // Non-iOS browsers: attach directly without permission request
    if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    requestAnimationFrame(updateDeviceTilt);
  }

  // ---------------------------------------------------------------------------
  // 7. MATHEMATICAL SINE BACKGROUND CANVAS
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas?.getContext('2d');
  let time = 0;
  let canvasAnimId;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  const waveLayers = [
    { amp: 40, freq: 0.002, speed: 0.015, color: 'rgba(13, 76, 140, 0.14)', width: 1.5 },
    { amp: 25, freq: 0.004, speed: -0.01, color: 'rgba(13, 76, 140, 0.07)', width: 1.0 },
    { amp: 55, freq: 0.001, speed: 0.02, color: 'rgba(17, 16, 17, 0.015)', width: 0.8 }
  ];

  function drawSineWaves() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    time += 0.5;

    waveLayers.forEach((wave) => {
      ctx.beginPath();
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = wave.width;

      for (let x = 0; x < canvas.width; x += 15) {
        const baseAngle = x * wave.freq + (time * wave.speed);
        let y = Math.sin(baseAngle) * wave.amp + (canvas.height / 2);

        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250 && !isMobile) {
          const influence = (1 - distance / 250);
          const push = Math.sin(mouse.y * 0.008 + baseAngle) * 55;
          y += push * influence;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    canvasAnimId = requestAnimationFrame(drawSineWaves);
  }
  if (canvas) drawSineWaves();

  // ---------------------------------------------------------------------------
  // 8. GSAP SCROLL REVEALS
  // ---------------------------------------------------------------------------
  function initScrollAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Vanilla IntersectionObserver for image reveals - 100% robust on back-forward cache re-entries
    if ('IntersectionObserver' in window) {
      const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('.image-reveal-img');
            if (img) {
              img.classList.add('active');
            }
            observer.unobserve(entry.target);
          }
        });
      };
      
      const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      projectCards.forEach(card => revealObserver.observe(card));
    } else {
      // Direct absolute fallback if IntersectionObserver is unsupported
      projectCards.forEach(card => {
        const img = card.querySelector('.image-reveal-img');
        if (img) img.classList.add('active');
      });
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    const headings = document.querySelectorAll('#services, #about, #portfolio');
    headings.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 9. CASE STUDY MODAL ENGINE & COORDINATED ACTION LINKS
  // ---------------------------------------------------------------------------
  const modal = document.getElementById('case-study-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  const studyDatabase = {
    aurora: {
      title: 'AURORA COSMETICS',
      category: 'BRANDING // UI/UX flagship',
      desc: 'Aurora Cosmetics wanted to completely break the mold of minimal sterile beauty layouts. We engineered a gorgeous cinematic spatial lookbook site focusing on dynamic gradients, transparent product visual sheets, and elegant scrolling micro-animations.',
      client: 'Aurora Cosmetics Co.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      sub1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      sub2: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      year: '© 2026',
      val: '9.82 (Awwwards Nominee)'
    },
    aether: {
      title: 'AETHER LABS',
      category: 'MOTION DESIGN // IDENTITY',
      desc: 'Aether Labs creates high-frequency scientific data interfaces. Our strategy aligned their identity with state-of-the-art procedural physics loops. We built a visual environment featuring elegant dark grid structures, floating magnetic cards, and abstract interactive wave arrays.',
      client: 'Aether Technologies',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      sub1: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      sub2: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      year: '© 2025',
      val: '9.75 (CSS Design Winner)'
    },
    hologram: {
      title: 'HOLOGRAM CORP',
      category: 'WEBSITE // WEB3 PLATFORM',
      desc: 'A futuristic digital interface designed for Hologram’s decentralized Web3 visual workspace. The website serves as a canvas-first layout using bespoke modular grids, high frame-rate interactive states, custom cursor magnetism, and smooth transitions.',
      client: 'Hologram Inc.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
      sub1: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
      sub2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      year: '© 2026',
      val: '9.91 (Awwwards Studio Winner)'
    },
    chronos: {
      title: 'CHRONOS ARCHITECTS',
      category: 'VISUAL IDENTITY // MOTION',
      desc: 'For Chronos, an award-winning cinematic architecture firm, we created an architectural brand lookbook. We paired strict spacing structures with high-contrast text reveal masks, massive editorial split-screens, and custom kinetic logo frameworks.',
      client: 'Chronos Group',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      sub1: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      sub2: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
      year: '© 2026',
      val: '9.80 (Red Dot Luxury Curation)'
    }
  };

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project');
      const data = studyDatabase[pid];
      if (!data || !modal) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-desc').textContent = data.desc;
      document.getElementById('modal-client').textContent = data.client;
      document.getElementById('modal-year').textContent = data.year;
      document.getElementById('modal-hero-image').style.backgroundImage = `url('${data.image}')`;
      document.getElementById('modal-subimage-1').src = data.sub1;
      document.getElementById('modal-subimage-2').src = data.sub2;

      modal.classList.remove('translate-y-full', 'opacity-0');
      modal.classList.add('translate-y-0', 'opacity-100');
      modal.style.pointerEvents = 'all';
      
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('translate-y-0', 'opacity-100');
      modal.classList.add('translate-y-full', 'opacity-0');
      modal.style.pointerEvents = 'none';
      
      document.body.style.overflow = 'auto';
    });
  }

  // Coordinated click linking for frosted-glass sub-service tags
  const subServiceTags = document.querySelectorAll('.sub-service-tag');
  const projectScopeTextarea = document.getElementById('message');
  subServiceTags.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click opening modal
      
      const cardContainer = tag.closest('.service-slide-card');
      const cardTitle = cardContainer ? cardContainer.querySelector('h3').textContent : 'your services';
      const subServiceName = tag.textContent;
      
      if (projectScopeTextarea) {
        projectScopeTextarea.value = `Hi Horkos Studio, I would like to inquire about your "${cardTitle}" services, specifically regarding "${subServiceName}". Let's connect and build something spectacular!`;
        
        // Smooth scroll to contact briefing form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Focus name input for direct conversion
        const clientNameInput = document.getElementById('name');
        if (clientNameInput) {
          setTimeout(() => clientNameInput.focus(), 800);
        }
      }
    });
  });

  // -----------------------------------------------------------
  // 10. PHILOSOPHY STATS COUNTING
  // ---------------------------------------------------------------------------
  const statsSection = document.getElementById('about');
  const statYears = document.getElementById('stat-years');
  const statClients = document.getElementById('stat-clients');
  const statProjects = document.getElementById('stat-projects');
  let statsTriggered = false;

  function countStats(el, limit, postfix = '') {
    if (!el) return;
    let currentCount = 0;
    const speed = limit / 30;
    const timer = setInterval(() => {
      currentCount += Math.ceil(speed);
      if (currentCount >= limit) {
        currentCount = limit;
        clearInterval(timer);
      }
      el.textContent = currentCount + postfix;
    }, 20);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        countStats(statYears, 12, '+');
        countStats(statClients, 48, '');
        countStats(statProjects, 120, '+');
      }
    });
  }, { threshold: 0.2 });

  if (statsSection) statObserver.observe(statsSection);

  // ---------------------------------------------------------------------------
  // 11. INFINITE REVIEWS SLIDE COPYING
  // ---------------------------------------------------------------------------
  const reviewTrack = document.getElementById('testimonial-track-1');
  if (reviewTrack) {
    const cards = Array.from(reviewTrack.children);
    cards.forEach((card) => {
      const copy = card.cloneNode(true);
      reviewTrack.appendChild(copy);
    });
  }

  // ---------------------------------------------------------------------------
  // 12. Connect BRIEF FORM TRANSMITTER
  // ---------------------------------------------------------------------------
  const briefForm = document.getElementById('premium-contact-form');
  const successOverlay = document.getElementById('form-success-overlay');
  const resetFormBtn = document.getElementById('reset-form-btn');

  if (briefForm && successOverlay) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const scope = document.getElementById('message')?.value || '';
      
      const subject = encodeURIComponent(`New Project Inquiry — ${name}`);
      const body = encodeURIComponent(
        `Hi Horkos Studio Team,\n\n` +
        `I would like to start a project with you. Below are my coordinates and project parameters:\n\n` +
        `CLIENT DETAILS:\n` +
        `- Name: ${name}\n` +
        `- Email: ${email}\n\n` +
        `PROJECT BRIEF / SCOPE:\n` +
        `${scope}\n\n` +
        `Please let me know your availability for an onboarding call.\n\n` +
        `Best regards,\n` +
        `${name}`
      );
      
      const mailtoLink = `mailto:horkosstudio@gmail.com?subject=${subject}&body=${body}`;
      
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 800);
      
      successOverlay.classList.remove('translate-y-full', 'opacity-0');
      successOverlay.classList.add('translate-y-0', 'opacity-100');
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        briefForm.reset();
        successOverlay.classList.remove('translate-y-0', 'opacity-100');
        successOverlay.classList.add('translate-y-full', 'opacity-0');
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 13. FULLSCREEN OVERLAY MENU
  // ---------------------------------------------------------------------------
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuDrawer = document.getElementById('mobile-menu');
  let isMenuToggled = false;

  if (menuBtn && menuDrawer) {
    menuBtn.addEventListener('click', () => {
      isMenuToggled = !isMenuToggled;
      toggleMenuDrawer();
    });

    const links = document.querySelectorAll('.mobile-nav-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        isMenuToggled = false;
        toggleMenuDrawer();
      });
    });
  }

  function toggleMenuDrawer() {
    if (!menuDrawer) return;
    if (isMenuToggled) {
      menuDrawer.style.transform = 'translateY(0)';
      if (menuBtn) {
        menuBtn.classList.add('menu-active');
      }
    } else {
      menuDrawer.style.transform = 'translateY(-100%)';
      if (menuBtn) {
        menuBtn.classList.remove('menu-active');
      }
    }
  }


  // ===========================================================================
  // MULTI-PAGE ADDITIONS (RESTORED LIGHT-THEME SYSTEMS)
  // ===========================================================================
  
  // 1. Horizontal Expandable Services Accordion Engine
  function initServicesHorizontalAccordion() {
    const wrapper = document.querySelector('.expand-container-wrapper');
    const expandCards = document.querySelectorAll('.expand-container-wrapper .expand-card');
    if (expandCards.length === 0) return;

    expandCards.forEach((c) => {
      c.classList.remove('active');
    });

    expandCards.forEach((card) => {
      // Hover event: Expand this card and collapse all others (desktop only)
      card.addEventListener('mouseenter', () => {
        if (window.innerWidth < 1024) return;
        expandCards.forEach((c) => {
          c.classList.remove('active');
          c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
        card.classList.add('active');
      });

      // Click event: Toggle active state (useful for mobile/tablet & fallback)
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('sub-service-tag')) return;

        const isActive = card.classList.contains('active');
        expandCards.forEach((c) => {
          c.classList.remove('active');
          c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });

        if (!isActive) {
          card.classList.add('active');
          setTimeout(() => {
            try { card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
            catch (e) { card.scrollIntoView(false); }
          }, 120);
        }
      });
    });

    // Leave the accordion section: Collapse all cards back to closed mode
    if (wrapper) {
      wrapper.addEventListener('mouseleave', () => {
        expandCards.forEach((c) => {
          c.classList.remove('active');
          c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
      });
    }
  }
  initServicesHorizontalAccordion();

  // 1b. Home Page Service Card Click-to-Expand Toggle
  function initHomeServiceCardToggle() {
    const homeServiceCards = document.querySelectorAll('#services-scroller .service-slide-card');
    if (homeServiceCards.length === 0) return;

    homeServiceCards.forEach((card) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // Bypass if clicked on sub-service tags
        if (e.target.classList.contains('sub-service-tag')) return;

        if (card.classList.contains('active')) {
          // Collapse: remove active state
          card.classList.remove('active');
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
          return;
        }

        // Close any other open cards first
        homeServiceCards.forEach((c) => {
          c.classList.remove('active');
          c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });

        // Expand this card
        card.classList.add('active');

        setTimeout(() => {
          try { card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
          catch (e) { card.scrollIntoView(false); }
        }, 120);
      });
    });
  }
  initHomeServiceCardToggle();

  // 2. Rolling Horizontal Gallery Slider System
  let currentSlideOffset = 0;
  function initRollingGalleries() {
    const prevArrow = document.getElementById('prev-gallery');
    const nextArrow = document.getElementById('next-gallery');
    const galleryTrack = document.querySelector('.rolling-gallery');
    const slides = document.querySelectorAll('.gallery-slide');
    
    if (!galleryTrack || slides.length === 0) return;

    let maxOffset = 0;
    function calculateMaxOffset() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const slideMargin = parseFloat(window.getComputedStyle(slides[0]).marginRight) || 0;
      const totalWidth = (slideWidth + slideMargin) * slides.length - slideMargin;
      const visibleWidth = galleryTrack.parentElement.getBoundingClientRect().width;
      maxOffset = Math.max(0, totalWidth - visibleWidth);
    }
    
    calculateMaxOffset();
    window.addEventListener('resize', calculateMaxOffset);

    if (nextArrow) {
      nextArrow.addEventListener('click', () => {
        const slideWidth = slides[0].getBoundingClientRect().width + (parseFloat(window.getComputedStyle(slides[0]).marginRight) || 0);
        currentSlideOffset += slideWidth;
        if (currentSlideOffset > maxOffset) {
          currentSlideOffset = maxOffset;
        }
        galleryTrack.style.transform = `translateX(-${currentSlideOffset}px)`;
      });
    }

    if (prevArrow) {
      prevArrow.addEventListener('click', () => {
        const slideWidth = slides[0].getBoundingClientRect().width + (parseFloat(window.getComputedStyle(slides[0]).marginRight) || 0);
        currentSlideOffset -= slideWidth;
        if (currentSlideOffset < 0) {
          currentSlideOffset = 0;
        }
        galleryTrack.style.transform = `translateX(-${currentSlideOffset}px)`;
      });
    }
  }

  // 3. Dynamic Copy-to-Clipboard Prompt Triggers
  const copyBlocks = document.querySelectorAll('.prompt-code-container');
  copyBlocks.forEach((block) => {
    block.addEventListener('click', () => {
      const codeText = block.querySelector('code')?.textContent || '';
      const badge = block.querySelector('.prompt-copy-badge');
      
      navigator.clipboard.writeText(codeText).then(() => {
        if (badge) {
          badge.textContent = 'COPIED!';
          badge.style.background = 'rgba(13, 76, 140, 0.2)';
          setTimeout(() => {
            badge.textContent = 'COPY CODE';
            badge.style.background = 'rgba(13, 76, 140, 0.1)';
          }, 2000);
        }
      });
    });
  });

  // Redundant statistics counter removed to resolve SyntaxError

  // 5. Dynamic Case Study Q-Param Parsing Database
  const projectDatabase = {
    asitiute: {
      title: 'ASTUTE SKINS',
      category: 'BRANDING // DYNAMIC BRAND IDENTITY',
      year: '© 2026',
      score: '9.91 (Curation Gold)',
      desc1: 'Astute Skins wanted to conceptualize a bold and luxurious design strategy. We handcrafted a visual identity and high-contrast styling guides focusing on micro-textures and editorial spacing systems.',
      desc2: 'By utilizing advanced brochure typography, geometric layouts, and physical texture imagery, we engineered a brand system that feels timeless, authentic, and premium.',
      client: 'Astute Curation Co.',
      slides: [
        'images/projects-works/asitiute/3x3-100.jpg',
        'images/projects-works/asitiute/Artboard-1-100.jpg',
        'images/projects-works/asitiute/Artboard-18@2x-100.jpg',
        'images/projects-works/asitiute/Artboard-19@2x-100.jpg',
        'images/projects-works/asitiute/Artboard-20@2x-100.jpg',
        'images/projects-works/asitiute/Artboard-21@2x-100.jpg',
        'images/projects-works/asitiute/Artboard-22@2x-100.jpg',
        'images/projects-works/asitiute/Artboard-23@2x-100.jpg'
      ]
    },
    bld: {
      title: 'BLD ARCHITECTS',
      category: 'BRANDING // KINETIC PORTFOLIO',
      year: '© 2026',
      score: '9.95 (Awwwards Curation Winner)',
      desc1: 'BLD Architects creates custom luxury concrete structures. We developed a kinetic brand portfolio and visual interface aligning their architectural principles with modular design guidelines.',
      desc2: 'Engineering high-contrast canvas frameworks, heavy typography weights, and clean editorial structures, we aligned their digital portfolio with physical, touchable concrete materials.',
      client: 'BLD Studio',
      slides: [
        'images/projects-works/bld/1Artboard-1@2x.png',
        'images/projects-works/bld/1Artboard-2@2x.png',
        'images/projects-works/bld/1Artboard-3@2x.png',
        'images/projects-works/bld/1Artboard-4@2x.png',
        'images/projects-works/bld/1Artboard-5@2x.png',
        'images/projects-works/bld/2Artboard-1@2x.png',
        'images/projects-works/bld/2Artboard-2@2x.png',
        'images/projects-works/bld/2Artboard-3@2x.png'
      ]
    }
  };

  function parseProjectDetailQuery() {
    const detailTitle = document.getElementById('project-detail-title');
    const detailCategory = document.getElementById('project-detail-category');
    const detailYear = document.getElementById('project-detail-year');
    const detailScore = document.getElementById('project-detail-score');
    const detailDesc1 = document.getElementById('project-detail-desc-1');
    const detailDesc2 = document.getElementById('project-detail-desc-2');
    const detailClient = document.getElementById('project-detail-client');
    const galleryContainer = document.getElementById('project-detail-gallery');

    if (!detailTitle) return; // Not on the project detail page

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || 'asitiute';
    const data = projectDatabase[projectId];

    if (!data) return;

    detailTitle.textContent = data.title;
    detailCategory.textContent = data.category;
    detailYear.textContent = data.year;
    detailScore.textContent = data.score;
    detailDesc1.textContent = data.desc1;
    detailDesc2.textContent = data.desc2;
    detailClient.textContent = data.client;

    if (galleryContainer && data.slides) {
      galleryContainer.innerHTML = '';
      data.slides.forEach((slideSrc) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'w-full rounded-2xl overflow-hidden border border-brandBlack/5 shadow-md hover:shadow-lg transition-shadow duration-300';
        const img = document.createElement('img');
        img.src = slideSrc;
        img.alt = data.title;
        img.className = 'w-full h-auto object-cover block';
        imgDiv.appendChild(img);
        galleryContainer.appendChild(imgDiv);
      });
    }
  }

  // 6. Staggered Process Timeline Scroll Reveal Animation Engine
    function initTimelineAnimations() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
      
      gsap.registerPlugin(ScrollTrigger);

      const timelineRows = document.querySelectorAll('.timeline-row');
      if (timelineRows.length === 0) return;

      timelineRows.forEach((row, i) => {
        const content = row.children[0];
        const bullet = row.querySelector('.absolute');
        const isMobile = window.innerWidth < 768;
        
        // Calculate responsive entry direction offset
        const xOffset = isMobile ? 30 : (i % 2 === 0 ? -60 : 60);

        if (content) {
          gsap.from(content, {
            opacity: 0,
            x: xOffset,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          });
        }

        if (bullet) {
          gsap.from(bullet, {
            scale: 0,
            duration: 0.8,
            ease: 'back.out(2.2)',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          });
        }
      });
    }
    initTimelineAnimations();

    parseProjectDetailQuery();
  };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHorkosApp);
} else {
  initHorkosApp();
}

// Handle Back-Forward Cache (bfcache) restore reloads for absolute functional consistency
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

// Clipboard functionality for Prompts & Design Spec pages
window.copyToClipboard = function(elementId, btnElement) {
  const codeEl = document.getElementById(elementId);
  if (!codeEl) return;
  const text = codeEl.textContent || codeEl.innerText;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    btnElement.classList.add('bg-brandBlue', 'text-brandWhite');
    
    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.classList.remove('bg-brandBlue', 'text-brandWhite');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};


// Floating Button Footer Collision Logic
document.addEventListener('DOMContentLoaded', () => {
  const floatingBtn = document.getElementById('floating-start-btn');
  const footer = document.querySelector('footer');
  if (floatingBtn && footer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          floatingBtn.classList.add('translate-y-24', 'opacity-0');
          floatingBtn.firstElementChild.classList.remove('pointer-events-auto');
          floatingBtn.firstElementChild.classList.add('pointer-events-none');
        } else {
          floatingBtn.classList.remove('translate-y-24', 'opacity-0');
          floatingBtn.firstElementChild.classList.remove('pointer-events-none');
          floatingBtn.firstElementChild.classList.add('pointer-events-auto');
        }
      });
    }, {
      root: null,
      threshold: 0,
      rootMargin: '50px'
    });
    observer.observe(footer);
  }
});
