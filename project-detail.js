// ======================= Project Details JS (fixed) =======================
// مالك البورتفوليو
const OWNER_NAME = 'Osama Alwaly';
const OWNER_EMAIL = 'osamagharib04@gmail.com';
const OWNER_WHATSAPP = '201210916041'; // بدون +

const DATA_PATH = resolveByPageDepth('data.json'); // عدّل المسار لو مختلف
const EXCLUDE_FROM_GALLERY = /home_page\.png$/i; // استبعاد صورة الهوم

document.addEventListener('DOMContentLoaded', () => {
  loadProjectData();
});

// =============== Utils ===============
function resolveByPageDepth(p) {
  // لو الصفحة داخل فولدر (زي /pages/...) نزود ../ للمسارات النسبية
  const path = window.location.pathname;
  const isNested = path.endsWith('.html') && path.split('/').length > 2;
  const prefix = isNested ? '../' : '';
  return /^https?:\/\//i.test(p) ? p : prefix + p.replace(/^\/+/, '');
}

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function slugify(s) {
  return (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function showError(message) {
  document.getElementById('loadingSpinner').style.display = 'none';
  document.getElementById('errorMessage').style.display = 'flex';
  document.getElementById('mainContent').style.display = 'none';
  console.warn(message);
}

// =============== Load Project ===============
async function loadProjectData() {
  try {
    const projectName = getUrlParameter('project');
    const projectId = getUrlParameter('id');
    if (!projectName && !projectId) {
      showError('No project specified');
      return;
    }

    const response = await fetch(DATA_PATH);
    if (!response.ok) throw new Error('Failed to load project data');
    const data = await response.json();

    const projects = Array.isArray(data.projects) ? data.projects : [];
    let project = null;

    if (projectId) {
      const idx = parseInt(projectId, 10);
      project = Number.isInteger(idx) ? projects[idx] : null;
    } else {
      const wanted = (projectName || '').toLowerCase();
      project =
        projects.find(p => slugify(p.name) === slugify(wanted)) ||
        projects.find(p => (p.name || '').toLowerCase() === wanted);
    }

    if (!project) {
      showError('Project not found');
      return;
    }

    populateProjectData(project);

    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';

    initializeFeatures();
  } catch (err) {
    console.error('Error loading project data:', err);
    showError('Failed to load project data');
  }
}

// =============== Populate UI ===============
function populateProjectData(project) {
  // Title
  document.getElementById('pageTitle').textContent = `${project.name} | ${OWNER_NAME}`;
  document.title = `${project.name} | ${OWNER_NAME}`;

  // Hero texts
  document.getElementById('projectTitle').textContent = project.name || 'Project';
  document.getElementById('projectSubtitle').textContent = project.short_description || '';
  document.getElementById('projectDescription').textContent = project.description || '';

  // Cover (حل للمسارات)
  const projectCover = document.getElementById('projectCover');
  if (project.cover_image) {
    projectCover.src = resolveByPageDepth(project.cover_image);
    projectCover.alt = `${project.name} Cover`;
    projectCover.onerror = () => console.warn('Cover not found:', projectCover.src);
  }

  // Links
  const linksContainer = document.getElementById('projectLinks');
  linksContainer.innerHTML = '';
  if (Array.isArray(project.links) && project.links.length) {
    project.links.forEach((link, index) => {
      const isPrimary = index === 0 ? 'primary' : '';
      const linkEl = document.createElement('a');
      linkEl.className = `project-link ${isPrimary}`;
      linkEl.href = link.url;
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
      linkEl.innerHTML = `
        <i class="${getLinkIcon(link.type)}"></i>
        <span>${link.type || 'Link'}</span>
      `;
      linksContainer.appendChild(linkEl);
    });
  }

  // Features
  const featuresGrid = document.getElementById('featuresGrid');
  featuresGrid.innerHTML = '';
  (project.features || []).forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.className = 'feature-card';
    featureCard.innerHTML = `
      <h3><i class="${getFeatureIcon(feature)}"></i>${feature}</h3>
      <p>Provides a better user experience and clear value.</p>
    `;
    featuresGrid.appendChild(featureCard);
  });

  // Technologies
  const techGrid = document.getElementById('techGrid');
  techGrid.innerHTML = '';
  (project.technologies_used || []).forEach(tech => {
    const techChip = document.createElement('div');
    techChip.className = 'tech-chip';
    techChip.textContent = tech;
    techGrid.appendChild(techChip);
  });

  // Gallery (media كـ مصفوفة مسارات) + استبعاد Home_Page.png
  const gallery = document.getElementById('projectGallery');
  gallery.innerHTML = '';
  const mediaArr = Array.isArray(project.media) ? project.media : [];

  const gallerySources = mediaArr
    .filter(Boolean)
    .filter(src => !EXCLUDE_FROM_GALLERY.test(src))
    .map(src => resolveByPageDepth(src));

  if (gallerySources.length) {
    gallerySources.forEach(src => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${src}" alt="${project.name} Screenshot" loading="lazy" />
        <div class="gallery-overlay"><div class="gallery-type">Screenshot</div></div>
      `;
      gallery.appendChild(item);
    });
  } else {
    // fallback: استخدم الكفر
    if (project.cover_image) {
      const src = resolveByPageDepth(project.cover_image);
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${src}" alt="${project.name} Cover" loading="lazy" />
        <div class="gallery-overlay"><div class="gallery-type">Cover</div></div>
      `;
      gallery.appendChild(item);
    }
  }
}

// =============== Icons Maps ===============
function getLinkIcon(type) {
  const icons = {
    'GitHub': 'ti ti-brand-github',
    'Google Play': 'ti ti-brand-google-play',
    'App Store': 'ti ti-brand-apple',
    'Google Drive': 'ti ti-brand-google-drive',
    'Live Demo': 'ti ti-external-link',
    'Website': 'ti ti-world',
    'Link': 'ti ti-external-link'
  };
  return icons[type] || 'ti ti-external-link';
}

function getFeatureIcon(feature) {
  const iconMap = {
    'video': 'ti ti-video',
    'auth': 'ti ti-shield-check',
    'stream': 'ti ti-player-play',
    'exam': 'ti ti-clipboard-check',
    'transaction': 'ti ti-credit-card',
    'favorite': 'ti ti-heart',
    'quran': 'ti ti-book-2',
    'hadith': 'ti ti-books',
    'azkar': 'ti ti-rosette',
    'qibla': 'ti ti-compass',
    'zakat': 'ti ti-calculator',
    'chatbot': 'ti ti-message-chatbot',
    'dark': 'ti ti-moon-stars',
    'speech': 'ti ti-microphone',
    'tts': 'ti ti-volume',
    'handwriting': 'ti ti-writing',
    'animation': 'ti ti-player-play',
    'cloud': 'ti ti-cloud',
    'ai': 'ti ti-brain',
    'game': 'ti ti-device-gamepad-2',
    'bilingual': 'ti ti-language',
    'disease': 'ti ti-search',
    'emergency': 'ti ti-medical-cross',
    'contact': 'ti ti-phone',
    'hospital': 'ti ti-map-pin',
    'tip': 'ti ti-bulb',
    'medication': 'ti ti-pill',
    'reminder': 'ti ti-calendar',
    'notification': 'ti ti-bell',
    'profile': 'ti ti-user',
    'analytics': 'ti ti-chart-line',
    'responsive': 'ti ti-device-mobile'
  };
  const k = Object.keys(iconMap).find(key => feature.toLowerCase().includes(key));
  return k ? iconMap[k] : 'ti ti-star';
}

// =============== Initialize All Features ===============
function initializeFeatures() {
  // AOS
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }

  // Theme
  initializeTheme();

  // Particles
  initializeParticles();

  // Cursor follower
  initializeCursorFollower();

  // Mobile nav
  initializeMobileNav();

  // Back to top
  initializeBackToTop();

  // Gallery modal
  initializeGallery();

  // Footer year + تظبيط وسائل التواصل
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const mailBtn = document.querySelector('a[href^="mailto:"]');
  if (mailBtn) mailBtn.setAttribute('href', `mailto:${OWNER_EMAIL}`);

  const waBtn = document.querySelector('a[href*="wa.me"]');
  if (waBtn) waBtn.setAttribute('href', `https://wa.me/${OWNER_WHATSAPP}`);
}

// =============== Theme ===============
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (icon) icon.className = theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon-stars';
}

// =============== Particles ===============
function initializeParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  function initParticles() {
    particles = [];
    const count = Math.min(50, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function updateParticles() {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#888';
    particles.forEach(p => {
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  animate();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
}

// =============== Cursor Follower ===============
function initializeCursorFollower() {
  const cursorFollower = document.getElementById('cursorFollower');
  if (!cursorFollower) return;

  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
  });

  function updateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(updateFollower);
  }
  updateFollower();

  const interactive = document.querySelectorAll('a, button, .gallery-item');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorFollower.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.opacity = '0.6';
    });
  });
}

// =============== Mobile Nav ===============
function initializeMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// =============== Back to Top ===============
function initializeBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =============== Gallery Modal ===============
function initializeGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('imageModalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');

  if (!imageModal || galleryItems.length === 0) return;

  let currentImageIndex = 0;
  const images = Array.from(galleryItems).filter(item =>
    item.querySelector('img') && !item.querySelector('video')
  );

  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      item.addEventListener('click', () => {
        currentImageIndex = images.indexOf(item);
        openImageModal(img.src, img.alt);
      });
    }
  });

  function openImageModal(src, alt) {
    modalImage.src = src;
    modalImage.alt = alt;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalPrev.style.display = currentImageIndex > 0 ? 'flex' : 'none';
    modalNext.style.display = currentImageIndex < images.length - 1 ? 'flex' : 'none';
  }

  function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      const img = images[currentImageIndex].querySelector('img');
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalPrev.style.display = currentImageIndex > 0 ? 'flex' : 'none';
      modalNext.style.display = 'flex';
    }
  }

  function showNextImage() {
    if (currentImageIndex < images.length - 1) {
      currentImageIndex++;
      const img = images[currentImageIndex].querySelector('img');
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalNext.style.display = currentImageIndex < images.length - 1 ? 'flex' : 'none';
      modalPrev.style.display = 'flex';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeImageModal);
  if (modalPrev) modalPrev.addEventListener('click', showPrevImage);
  if (modalNext) modalNext.addEventListener('click', showNextImage);

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target.classList.contains('image-modal__backdrop')) {
      closeImageModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!imageModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeImageModal();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  });
}
// ======================= /Project Details JS =======================
