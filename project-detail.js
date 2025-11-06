// ======================= Project Details JS (stable) =======================
// مالك البورتفوليو
const OWNER_NAME = 'Osama Alwaly';
const OWNER_EMAIL = 'osamagharib04@gmail.com';
const OWNER_WHATSAPP = '201210916041'; // بدون +

const DATA_URL = new URL('data.json', document.baseURI).href;
const EXCLUDE_FROM_GALLERY = /home_page\.png$/i; // استبعاد صورة الهوم

document.addEventListener('DOMContentLoaded', loadProjectData);

// =============== Utils ===============
function resolveByPageDepth(p) {
  if (!p) return '';
  return new URL(p, document.baseURI).href;
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
function showErrorUI() {
  const loading = document.getElementById('loadingSpinner');
  const main = document.getElementById('mainContent');
  const errBox = document.getElementById('errorMessage');
  if (loading) loading.style.display = 'none';
  if (main) main.style.display = 'none';
  if (errBox) errBox.style.display = 'flex';
}
function showMainUI() {
  const loading = document.getElementById('loadingSpinner');
  const main = document.getElementById('mainContent');
  const errBox = document.getElementById('errorMessage');
  if (loading) loading.style.display = 'none';
  if (errBox) errBox.style.display = 'none';
  if (main) main.style.display = 'block';
}

// =============== Load Project ===============
async function loadProjectData() {
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP_${res.status}`);
    const data = await res.json();

    const projects = Array.isArray(data.projects) ? data.projects : [];
    const qName = (getUrlParameter('project') || '').toLowerCase().trim();
    const qId = getUrlParameter('id');

    let project = null;

    // by id (آمن)
    if (qId !== null) {
      const idx = parseInt(qId, 10);
      if (!Number.isNaN(idx) && idx >= 0 && idx < projects.length) {
        project = projects[idx];
      }
    }
    // by slug/name
    if (!project && qName) {
      const norm = s => (s || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      project =
        projects.find(p => norm(p.name) === norm(qName)) ||
        projects.find(p => (p.name || '').toLowerCase() === qName);
    }
    // fallback: أول مشروع
    if (!project && projects.length) project = projects[0];
    if (!project) throw new Error('PROJECT_NOT_FOUND');

    populateProjectData(project);
    showMainUI();

    // AOS
    if (window.AOS) {
      AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 100 });
      AOS.refresh();
    } else {
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }

    // مميزات الواجهة (لو موجودة في نفس الملف)
    if (typeof initializeFeatures === 'function') {
      try { initializeFeatures(); } catch {}
    }
  } catch (e) {
    console.error('loadProjectData error:', e);
    const msgEl = document.querySelector('#errorMessage .error-content p');
    if (msgEl) {
      const map = {
        HTTP_404: 'ملف data.json مش متلاقي. اتأكد من الاسم والمسار (وحالة الحروف).',
        INVALID_JSON: 'صيغة data.json فيها خطأ.',
        PROJECT_NOT_FOUND: 'مافيش مشروع مطابق للعنوان/المعرّف.',
      };
      msgEl.textContent = map[e.message] || 'حصل خطأ أثناء تحميل البيانات.';
    }
    showErrorUI();
  }
}

// =============== Populate UI ===============
function populateProjectData(project) {
  // Title
  const titleEl = document.getElementById('pageTitle');
  if (titleEl) titleEl.textContent = `${project.name} | ${OWNER_NAME}`;
  document.title = `${project.name} | ${OWNER_NAME}`;

  // Hero texts
  document.getElementById('projectTitle').textContent = project.name || 'Project';
  document.getElementById('projectSubtitle').textContent = project.short_description || '';
  document.getElementById('projectDescription').textContent = project.description || '';

  // Cover
  const projectCover = document.getElementById('projectCover');
  if (projectCover && project.cover_image) {
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

  // Gallery (media) مع استبعاد home_page.png
  const gallery = document.getElementById('projectGallery');
  gallery.innerHTML = '';

  const gallerySources = (Array.isArray(project.media) ? project.media : [])
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
  } else if (project.cover_image) {
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
  const k = Object.keys(iconMap).find(key => String(feature).toLowerCase().includes(key));
  return k ? iconMap[k] : 'ti ti-star';
}

// =============== (اختصار) ميزات/مظهر إن حبيت تستخدمها ===============
function initializeFeatures() {
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

// … باقي دوال UI عندك شغالة زي ما هي (initializeTheme/Particles/…)
// ======================= /Project Details JS =======================
