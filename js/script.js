// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==========================================
// NAVBAR SCROLL EFFECTS
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ==========================================
// SECTION FADE-IN ANIMATION ON SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply fade-in animation to all content sections
document.querySelectorAll('.content-section, .feature-card, .video-item, .team-member, .stat-card').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// CODE BLOCK COPY FUNCTIONALITY
// ==========================================
document.querySelectorAll('.code-block').forEach(codeBlock => {
    // Skip if it's a bibtex block (different styling)
    if (codeBlock.classList.contains('bibtex')) {
        return;
    }
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.className = 'copy-button';
    copyButton.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: #3182ce;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 500;
        transition: all 0.3s ease;
        opacity: 0.9;
    `;
    
    copyButton.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.background = '#2c5282';
    });
    
    copyButton.addEventListener('mouseleave', function() {
        this.style.opacity = '0.9';
        this.style.background = '#3182ce';
    });
    
    // Make code block container relative for absolute positioning
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
    
    // Copy functionality
    copyButton.addEventListener('click', function() {
        const code = codeBlock.querySelector('code') || codeBlock;
        const text = code.textContent || code.innerText;
        
        navigator.clipboard.writeText(text).then(function() {
            copyButton.textContent = 'Copied!';
            copyButton.style.background = '#38a169';
            
            setTimeout(function() {
                copyButton.textContent = 'Copy';
                copyButton.style.background = '#3182ce';
            }, 2000);
        }).catch(function() {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            copyButton.textContent = 'Copied!';
            copyButton.style.background = '#38a169';
            
            setTimeout(function() {
                copyButton.textContent = 'Copy';
                copyButton.style.background = '#3182ce';
            }, 2000);
        });
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #3182ce;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // Add mobile menu button to navbar
    navContainer.appendChild(mobileMenuBtn);
    
    // Mobile menu styles for nav-links
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        @media (max-width: 768px) {
            .nav-links.mobile-open {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #e2e8f0;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-open');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('mobile-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
        }
    });
}

// Initialize mobile menu
createMobileMenu();

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ==========================================
// VIDEO ITEM INTERACTIONS
// ==========================================
document.querySelectorAll('.video-item').forEach(item => {
    item.addEventListener('click', function() {
        const placeholder = this.querySelector('.video-placeholder');
        const originalContent = placeholder.innerHTML;
        
        // Add click animation
        placeholder.style.background = 'linear-gradient(135deg, #2c5282 0%, #3182ce 100%)';
        placeholder.innerHTML = '▶️ Loading Demo...';
        
        setTimeout(() => {
            placeholder.style.background = 'linear-gradient(135deg, #63b3ed 0%, #3182ce 100%)';
            placeholder.innerHTML = originalContent;
        }, 2000);
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Navbar scroll effects
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ==========================================
// LOADING ANIMATION & STATS
// ==========================================
window.addEventListener('load', function() {
    // Trigger initial animations
    document.body.classList.add('loaded');
    
    // Animate stats numbers when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                
                if (finalValue.includes('%')) {
                    animateNumber(stat, 0, parseFloat(finalValue), '%');
                } else if (finalValue.includes('ms')) {
                    animateNumber(stat, 0, parseInt(finalValue), 'ms');
                } else if (finalValue.includes('+')) {
                    animateNumber(stat, 0, parseInt(finalValue), '+');
                } else {
                    const numValue = parseInt(finalValue);
                    if (!isNaN(numValue)) {
                        animateNumber(stat, 0, numValue, '');
                    }
                }
                
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
// Animate numbers
function animateNumber(element, start, end, suffix = '') {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + suffix; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(update);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for resize events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Handle window resize
const handleResize = debounce(function() {
    // Recalculate layout elements on resize
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
// Skip to main content functionality
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#overview';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
addSkipLink();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('mobile-open');
    }
    
    // Enter key activates video items
    if (e.key === 'Enter' && e.target.closest('.video-item')) {
        e.target.closest('.video-item').click();
    }
});

// Add focus indicators for keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    // Make video items focusable
    document.querySelectorAll('.video-item').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'Play demo video');
    });
    
    // Make feature cards focusable
    document.querySelectorAll('.feature-card').forEach(card => {
        card.setAttribute('tabindex', '0');
    });
    
    // Make team members focusable
    document.querySelectorAll('.team-member').forEach(member => {
        member.setAttribute('tabindex', '0');
    });
});

// ==========================================
// ENHANCED USER INTERACTIONS
// ==========================================
// Add hover effects for better user feedback
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    });
});

// Add click feedback for buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==========================================
// PROGRESSIVE ENHANCEMENT
// ==========================================
// Add loading states for interactive elements
function addLoadingStates() {
    document.querySelectorAll('.card-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href === '#' || this.href.endsWith('#')) {
                e.preventDefault();
                
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    
                    // Show demo message
                    showNotification('Demo link clicked! In a real implementation, this would navigate to the actual resource.', 'info');
                }, 1500);
            }
        });
    });
}

// Simple notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'info' ? '#3182ce' : '#38a169'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 300px;
        font-size: 0.875rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Initialize progressive enhancements
addLoadingStates();

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
// Simple performance tracking
const performanceTracker = {
    startTime: performance.now(),
    
    logMetric: function(name, value) {
        if (window.console && console.log) {
            console.log(`[CoMuRoS] ${name}: ${value}ms`);
        }
    },
    
    measurePageLoad: function() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            this.logMetric('Page Load Time', Math.round(loadTime));
        });
    },
    
    measureFirstPaint: function() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        this.logMetric('First Contentful Paint', Math.round(entry.startTime));
                    }
                });
            });
            observer.observe({ entryTypes: ['paint'] });
        }
    }
};

// Initialize performance tracking
performanceTracker.measurePageLoad();
performanceTracker.measureFirstPaint();

// ==========================================
// ERROR HANDLING & FALLBACKS
// ==========================================
window.addEventListener('error', function(e) {
    console.error('CoMuRoS Website Error:', e.error);
    
    // Fallback for critical functionality
    if (e.error && e.error.message.includes('IntersectionObserver')) {
        // Fallback for older browsers without IntersectionObserver
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('visible');
        });
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Fallback for browsers without modern JS features
if (!window.IntersectionObserver) {
    // Simple fallback - show all fade-in elements immediately
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add('visible');
    });
}

// ==========================================
// ANALYTICS & TRACKING (PLACEHOLDER)
// ==========================================
// Simple event tracking for user interactions
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event: ${category} - ${action} - ${label}`);
    
    // In a real implementation, you would send this to your analytics service
    // Example: gtag('event', action, { event_category: category, event_label: label });
}

// Track important user interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.matches('.cta-button')) {
        trackEvent('Button', 'Click', target.textContent.trim());
    }
    
    if (target.matches('.video-item') || target.closest('.video-item')) {
        trackEvent('Video', 'Click', 'Demo Video');
    }
    
    if (target.matches('.card-link')) {
        trackEvent('Link', 'Click', target.textContent.trim());
    }
});

// Track section visibility
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
                trackEvent('Section', 'View', sectionId);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// ==========================================
// DATA SECTION — CONFIG FILES & GUI IMAGES
// ==========================================

// --- EDIT THESE MAPPINGS ---
// Only files listed here will be shown. Remove an entry to hide it.
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

// Each experiment key maps to one or more image filenames
const GUI_EXPERIMENTS = {
  "Disaster Relief — Normal":       ["DISASTER-NORMAL1.png","DISASTER-NORMAL2.png","DISASTER-NORMAL3.png","DISASTER-NORMAL4.png"],
  "Disaster Relief — Event":        ["DISASTER-EVENT1.png","DISASTER-EVENT2.png","DISASTER-EVENT3.png","DISASTER-EVENT4.png"],
  "Formation Control — Normal":     ["FORMATION-NORMAL.png"],
  "Formation Control — Human":      ["FORMATION-HUMAN.png"],
  "Object Detection — Normal":      ["GREEN_OBJ-NORMAL.png"],
  "Object Detection — No Resume":   ["GREEN_OBJ-NO_RESUME.png"],
  "Object Detection — Resume":      ["GREEN_OBJ-RESUME.png"],
  "Hospital — Normal":              ["HOSPITAL_NORMAL.png"],
  "Hospital — Event Triggered":     ["HOSPITAL-EVENT.png"],
};

const CONFIG_BASE = "assets/config_files/";
const GUI_BASE    = "assets/images/chat_gui/";
const CARD_W      = 260; // px, card width for scroll step

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

    // Placeholder preview text — will be replaced after fetch
    card.innerHTML = `
      <div class="cfg-card-top">
        <span class="cfg-card-badge"><i class="ti ti-braces" aria-hidden="true"></i> JSON</span>
        <p class="cfg-card-name">${expName}</p>
        <p class="cfg-card-file">${file}</p>
      </div>
      <pre class="cfg-card-preview" data-file="${file}">Loading preview…</pre>
      <div class="cfg-card-footer">
        <span>Click to view full content</span>
        <i class="ti ti-arrow-up-right" aria-hidden="true"></i>
      </div>
    `;

    card.addEventListener('click', () => openJsonModal(file, expName));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openJsonModal(file, expName); });
    track.appendChild(card);

    // Fetch and show preview
    fetch(CONFIG_BASE + file)
      .then(r => r.json())
      .then(json => {
        const preview = card.querySelector('.cfg-card-preview');
        const lines = JSON.stringify(json, null, 2).split('\n').slice(0, 14).join('\n');
        preview.textContent = lines + '\n…';
        preview.dataset.full = JSON.stringify(json, null, 2);
      })
      .catch(() => {
        card.querySelector('.cfg-card-preview').textContent = '{ … }';
      });
  });
}

async function openJsonModal(file, expName) {
  document.getElementById('json-modal-exp').textContent  = expName;
  document.getElementById('json-modal-file').textContent = file;
  document.getElementById('json-modal-body').textContent = 'Loading…';
  document.getElementById('json-backdrop').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Try to reuse already-fetched data from card
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

    // Stacked thumbnails preview for multi-image, single for one
    const stackHtml = count > 1
      ? `<div class="gui-stack">
           ${images.slice(0, 3).map((img, i) => `
             <img src="${GUI_BASE + img}" alt="" class="gui-stack-img gui-stack-img-${i}" loading="lazy" />
           `).join('')}
           ${count > 3 ? `<div class="gui-stack-more">+${count - 3}</div>` : ''}
         </div>`
      : `<div class="gui-single-wrap">
           <img src="${GUI_BASE + images[0]}" alt="${expName}" class="gui-single-img" loading="lazy" />
         </div>`;

    card.innerHTML = `
      ${stackHtml}
      <div class="gui-card-info">
        <p class="gui-card-name">${expName}</p>
        <span class="gui-card-count">
          <i class="ti ti-photo" aria-hidden="true"></i>
          ${count} image${count > 1 ? 's' : ''}
        </span>
      </div>
      <div class="cfg-card-footer">
        <span>Click to view</span>
        <i class="ti ti-arrow-up-right" aria-hidden="true"></i>
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
  document.getElementById('img-backdrop').classList.remove('active');
  document.body.style.overflow = '';
}

function lbStep(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  updateLbSlide();
}

function updateLbSlide() {
  document.getElementById('lb-img').src        = lbImages[lbIndex].src;
  document.getElementById('lb-img').alt        = lbImages[lbIndex].alt;
  document.getElementById('lb-caption').textContent = `${lbIndex + 1} / ${lbImages.length}`;
  document.getElementById('lb-prev').style.visibility = lbImages.length > 1 ? 'visible' : 'hidden';
  document.getElementById('lb-next').style.visibility = lbImages.length > 1 ? 'visible' : 'hidden';
}

// ==========================================
// KEYBOARD
// ==========================================
document.addEventListener('keydown', e => {
  if (document.getElementById('img-backdrop').classList.contains('active')) {
    if (e.key === 'ArrowLeft')  lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
    if (e.key === 'Escape')     closeImgModal();
  }
  if (document.getElementById('json-backdrop').classList.contains('active')) {
    if (e.key === 'Escape') closeJsonModal();
  }
});

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderConfigCards();
  renderGuiCards();
});

// ==========================================
// FINAL INITIALIZATION
// ==========================================
console.log('CoMuRoS website loaded successfully!');
console.log('All interactive features initialized');

// Add a subtle loading indicator removal (if present)
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Announce to screen readers that the page is ready
window.addEventListener('load', function() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    announcement.textContent = 'CoMuRoS website loaded and ready for navigation';
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 3000);
});

// ==========================================
// EMAIL COPY FUNCTIONALITY
// ==========================================
function copyEmail(el) {
  const email = el.querySelector('.email-text').textContent;
  navigator.clipboard.writeText(email).then(() => {
    const feedback = el.parentElement.querySelector('.copy-feedback');
    const btn = el.querySelector('.copy-icon-btn');
    btn.textContent = '✓ Copied';
    feedback.classList.add('show');
    setTimeout(() => {
      btn.textContent = '⎘ Copy';
      feedback.classList.remove('show');
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