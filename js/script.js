// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ==========================================
// THROTTLE HELPER
// ==========================================
function throttle(func, limit) {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ==========================================
// NAVBAR + ACTIVE NAV — single throttled listener
// ==========================================
const handleScroll = throttle(function () {
  const navbar = document.querySelector('.navbar');

  // Navbar background
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255,255,255,0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.background = 'rgba(255,255,255,0.95)';
    navbar.style.boxShadow = 'none';
  }

  // Active nav highlight
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.clientHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, 16);

window.addEventListener('scroll', handleScroll);

// ==========================================
// SCROLL-TO-TOP BUTTON
// ==========================================
function createScrollToTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', throttle(function () {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  }, 100));

  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

createScrollToTopButton();

// ==========================================
// FADE-IN ON SCROLL — covers every element type consistently
// ==========================================
const fadeInObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', function () {
  const fadeSelectors = [
    '.content-section',
    '.video-item',
    '.step',
    '.author-card',
    '.contact-card',
    '.ds-card',
    '.stat-card',
  ];
  document.querySelectorAll(fadeSelectors.join(',')).forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
  });
});

// Fallback for browsers without IntersectionObserver
if (!window.IntersectionObserver) {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

// ==========================================
// CODE BLOCK COPY BUTTONS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.code-block').forEach(codeBlock => {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.className = 'copy-button';
    Object.assign(copyButton.style, {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: '#3182ce',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      opacity: '0.9',
    });

    copyButton.addEventListener('mouseenter', () => { copyButton.style.opacity = '1'; copyButton.style.background = '#2c5282'; });
    copyButton.addEventListener('mouseleave', () => { copyButton.style.opacity = '0.9'; copyButton.style.background = '#3182ce'; });

    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);

    copyButton.addEventListener('click', function () {
      const code = codeBlock.querySelector('code') || codeBlock;
      const text = code.textContent || code.innerText;

      const done = () => {
        copyButton.textContent = 'Copied!';
        copyButton.style.background = '#38a169';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.style.background = '#3182ce';
        }, 2000);
      };

      navigator.clipboard.writeText(text).then(done).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        done();
      });
    });
  });
});

// ==========================================
// MOBILE MENU
// ==========================================
function createMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');

  const btn = document.createElement('button');
  btn.innerHTML = '☰';
  btn.className = 'mobile-menu-btn';
  btn.setAttribute('aria-label', 'Toggle navigation');
  navContainer.appendChild(btn);

  btn.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) navLinks.classList.remove('mobile-open');
  });
}

createMobileMenu();

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelector('.nav-links').classList.remove('mobile-open');
    closeImgModal();
    closeJsonModal();
  }
  if (document.getElementById('img-backdrop').classList.contains('active')) {
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  }
});

// ==========================================
// ACCESSIBILITY
// ==========================================
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#home';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

addSkipLink();

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.video-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Watch video');
  });
});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.cta-button');
  if (!btn) return;

  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  Object.assign(ripple.style, {
    position: 'absolute',
    width: size + 'px',
    height: size + 'px',
    left: (e.clientX - rect.left - size / 2) + 'px',
    top: (e.clientY - rect.top - size / 2) + 'px',
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '50%',
    transform: 'scale(0)',
    animation: 'rippleAnim 0.6s linear',
    pointerEvents: 'none',
  });

  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
    document.head.appendChild(style);
  }

  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ==========================================
// RESIZE HANDLER
// ==========================================
const handleResize = (function () {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) navLinks.classList.remove('mobile-open');
    }, 250);
  };
})();

window.addEventListener('resize', handleResize);

// ==========================================
// DATA SECTION — CONFIG FILES & GUI IMAGES
// ==========================================
const CONFIG_EXPERIMENT_NAMES = {
  "robot_config_hospital_robots.json":            "Hospital Robot Operations",
  "robot_config_disaster.json":                   "Disaster Relief Mission",
  "robot_config_restaurant.json":                 "Restaurant Service",
  "robot_config_warehouse.json":                  "Warehouse Logistics",
  "robot_config_building_construction.json":      "Building Construction",
  "robot_config_roscon_2025.json":                "ROSCon 2025 Demo",
  "robot_config_hardware_experiment.json":        "Hardware Experiment",
  "robot_config_coordination.json":               "Multi-Robot Coordination",
  "robot_config_home.json":                       "Home Assistance",
  "robot_config_hotel.json":                      "Hotel Service",
  "robot_config_museum.json":                     "Museum Guide",
  "robot_config_university_campus.json":          "University Campus",
  "robot_config_smart_farming_system.json":       "Smart Farming",
  "robot_config_space_station.json":              "Space Station",
  "robot_config_fire_detection_and_control.json": "Fire Detection & Control",
  "robot_config_mine_detection.json":             "Mine Detection",
};

const GUI_EXPERIMENTS = {
  "Disaster Relief — Normal":     ["DISASTER-NORMAL1.png","DISASTER-NORMAL2.png","DISASTER-NORMAL3.png","DISASTER-NORMAL4.png"],
  "Disaster Relief — Event":      ["DISASTER-EVENT1.png","DISASTER-EVENT2.png","DISASTER-EVENT3.png","DISASTER-EVENT4.png"],
  "Formation Control — Normal":   ["FORMATION-NORMAL.png"],
  "Formation Control — Human":    ["FORMATION-HUMAN.png"],
  "Object Detection — Normal":    ["GREEN_OBJ-NORMAL.png"],
  "Object Detection — No Resume": ["GREEN_OBJ-NO_RESUME.png"],
  "Object Detection — Resume":    ["GREEN_OBJ-RESUME.png"],
  "Hospital — Normal":            ["HOSPITAL_NORMAL.png"],
  "Hospital — Event Triggered":   ["HOSPITAL-EVENT.png"],
};

const CONFIG_BASE = "assets/config_files/";
const GUI_BASE    = "assets/images/chat_gui/";
const CARD_W      = 260;

// ---- Lightbox state ----
let lbImages = [], lbIndex = 0;

// ==========================================
// HORIZONTAL SCROLL
// ==========================================
function scrollTrack(trackId, dir) {
  const track = document.getElementById(trackId);
  if (!track) return;
  track.scrollBy({ left: dir * (CARD_W + 20) * 2, behavior: 'smooth' });
}

// ==========================================
// CONFIG CARDS
// ==========================================
function renderConfigCards() {
  const track = document.getElementById('cfg-track');
  if (!track) return;

  Object.entries(CONFIG_EXPERIMENT_NAMES).forEach(([file, expName]) => {
    const card = document.createElement('div');
    card.className = 'ds-card cfg-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View ' + expName);

    card.innerHTML = `
      <div class="cfg-card-top">
        <span class="cfg-card-badge">JSON</span>
        <p class="cfg-card-name">${expName}</p>
        <p class="cfg-card-file">${file}</p>
      </div>
      <pre class="cfg-card-preview" data-file="${file}">Loading preview…</pre>
      <div class="cfg-card-footer">
        <span>Click to view full content</span>
      </div>
    `;

    card.addEventListener('click', () => openJsonModal(file, expName));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openJsonModal(file, expName); });
    track.appendChild(card);

    fetch(CONFIG_BASE + file)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json(); })
      .then(json => {
        const preview = card.querySelector('.cfg-card-preview');
        const lines = JSON.stringify(json, null, 2).split('\n').slice(0, 14).join('\n');
        preview.textContent = lines + '\n…';
        preview.dataset.full = JSON.stringify(json, null, 2);
      })
      .catch(() => {
        card.querySelector('.cfg-card-preview').textContent = '// File not found';
      });
  });
}

async function openJsonModal(file, expName) {
  document.getElementById('json-modal-exp').textContent  = expName;
  document.getElementById('json-modal-file').textContent = file;
  document.getElementById('json-modal-body').textContent = 'Loading…';
  document.getElementById('json-backdrop').classList.add('active');
  document.body.style.overflow = 'hidden';

  const card = [...document.querySelectorAll('.cfg-card')].find(c =>
    c.querySelector('.cfg-card-file') && c.querySelector('.cfg-card-file').textContent === file
  );
  const preview = card && card.querySelector('.cfg-card-preview');
  if (preview && preview.dataset.full) {
    document.getElementById('json-modal-body').textContent = preview.dataset.full;
    return;
  }

  try {
    const res  = await fetch(CONFIG_BASE + file);
    if (!res.ok) throw new Error('Not found');
    const json = await res.json();
    document.getElementById('json-modal-body').textContent = JSON.stringify(json, null, 2);
  } catch (e) {
    document.getElementById('json-modal-body').textContent = 'Could not load:\n' + CONFIG_BASE + file;
  }
}

function closeJsonModal() {
  document.getElementById('json-backdrop').classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// GUI IMAGE CARDS
// ==========================================
function renderGuiCards() {
  const track = document.getElementById('gui-track');
  if (!track) return;

  Object.entries(GUI_EXPERIMENTS).forEach(([expName, images]) => {
    const card = document.createElement('div');
    card.className = 'ds-card gui-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View ' + expName);

    const count = images.length;
    const stackHtml = count > 1
      ? `<div class="gui-stack">
           ${images.slice(0, 3).map((img, i) =>
             `<img src="${GUI_BASE + img}" alt="" class="gui-stack-img gui-stack-img-${i}" loading="lazy" />`
           ).join('')}
           ${count > 3 ? `<div class="gui-stack-more">+${count - 3}</div>` : ''}
         </div>`
      : `<div class="gui-single-wrap">
           <img src="${GUI_BASE + images[0]}" alt="${expName}" class="gui-single-img" loading="lazy" />
         </div>`;

    card.innerHTML = `
      ${stackHtml}
      <div class="gui-card-info">
        <p class="gui-card-name">${expName}</p>
        <span class="gui-card-count">${count} image${count > 1 ? 's' : ''}</span>
      </div>
      <div class="cfg-card-footer">
        <span>Click to view</span>
      </div>
    `;

    card.addEventListener('click', () => openImgModal(expName, images));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openImgModal(expName, images); });
    track.appendChild(card);
  });
}

function openImgModal(expName, images) {
  lbImages = images.map((img, i) => ({ src: GUI_BASE + img, alt: `${expName} — ${i + 1}` }));
  lbIndex  = 0;
  document.getElementById('img-modal-exp').textContent = expName;
  updateLbSlide();
  document.getElementById('img-backdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeImgModal() {
  const bd = document.getElementById('img-backdrop');
  if (bd) { bd.classList.remove('active'); document.body.style.overflow = ''; }
}

function lbStep(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  updateLbSlide();
}

function updateLbSlide() {
  document.getElementById('lb-img').src             = lbImages[lbIndex].src;
  document.getElementById('lb-img').alt             = lbImages[lbIndex].alt;
  document.getElementById('lb-caption').textContent = `${lbIndex + 1} / ${lbImages.length}`;
  const show = lbImages.length > 1 ? 'visible' : 'hidden';
  document.getElementById('lb-prev').style.visibility = show;
  document.getElementById('lb-next').style.visibility = show;
}

// ==========================================
// EMAIL COPY
// ==========================================
function copyEmail(el) {
  const email = el.querySelector('.email-text').textContent;
  navigator.clipboard.writeText(email).then(() => {
    const feedback = el.parentElement.querySelector('.copy-feedback');
    const btn = el.querySelector('.copy-icon-btn');
    btn.textContent = '✓ Copied';
    if (feedback) feedback.classList.add('show');
    setTimeout(() => {
      btn.textContent = '⎘ Copy';
      if (feedback) feedback.classList.remove('show');
    }, 2000);
  });
}

function copyAuthorEmail(el) {
  const email = el.querySelector('span').textContent;
  navigator.clipboard.writeText(email).then(() => {
    const btn = el.querySelector('.email-copy-mini');
    btn.textContent = '✓ Done';
    btn.style.background = '#059669';
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.style.background = '';
    }, 2000);
  });
}

// ==========================================
// INIT ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderConfigCards();
  renderGuiCards();
});

// ==========================================
// PAGE LOAD
// ==========================================
window.addEventListener('load', function () {
  document.body.classList.add('loaded');

  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  Object.assign(announcement.style, {
    position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden',
  });
  announcement.textContent = 'CoMuRoS website loaded and ready for navigation';
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 3000);
});

// ==========================================
// ERROR HANDLING
// ==========================================
window.addEventListener('error', e => {
  console.error('CoMuRoS error:', e.error);
  if (e.error && e.error.message && e.error.message.includes('IntersectionObserver')) {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }
});

window.addEventListener('unhandledrejection', e => {
  console.error('Unhandled rejection:', e.reason);
});

console.log('CoMuRoS website loaded successfully!');