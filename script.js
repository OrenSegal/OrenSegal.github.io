// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCodeAnimation();
    initScrollAnimations();
    initMobileMenu();
});

// ==================== Navigation ====================
function initNavigation() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// ==================== Mobile Menu ====================
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// ==================== Code Animation ====================
function initCodeAnimation() {
    const codeElement = document.getElementById('codeAnimation');
    if (!codeElement) return;

    const codeLines = [
        '# Building AI products with measurable impact',
        '',
        'class AIEngineer:',
        '    def __init__(self):',
        '        self.skills = [',
        '            "LLM Applications",',
        '            "Computer Vision",',
        '            "Production ML",',
        '            "Full-Stack Development"',
        '        ]',
        '        self.impact = {',
        '            "revenue_growth": 0.17,',
        '            "forecast_accuracy": 0.995,',
        '            "processes_automated": 70',
        '        }',
        '',
        '    def build_product(self, idea):',
        '        """Transform ideas into deployed solutions"""',
        '        model = self.train_ml_model(data)',
        '        app = self.create_flutter_app()',
        '        return self.deploy_to_cloud(model, app)',
        '',
        '# Currently building Shelfie 🚀',
        'engineer = AIEngineer()',
        'engineer.build_product("AI Cooking Assistant")'
    ];

    let currentLine = 0;
    let currentChar = 0;
    let currentText = '';

    function typeLine() {
        if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];

            if (currentChar < line.length) {
                currentText += line[currentChar];
                codeElement.textContent = formatCode(currentLine, currentText);
                currentChar++;
                setTimeout(typeLine, 30);
            } else {
                currentText += '\n';
                codeElement.textContent = formatCode(currentLine + 1, currentText);
                currentLine++;
                currentChar = 0;
                setTimeout(typeLine, 100);
            }
        }
    }

    function formatCode(lineCount, text) {
        const lines = text.split('\n');
        return lines.map((line, index) => {
            // Add syntax highlighting classes
            if (line.includes('#')) {
                return `<span style="color: #6c757d;">${line}</span>`;
            } else if (line.includes('class ') || line.includes('def ')) {
                return `<span style="color: #2563eb; font-weight: 600;">${line}</span>`;
            } else if (line.includes('"')) {
                return line.replace(/"([^"]*)"/g, '<span style="color: #10b981;">"$1"</span>');
            } else if (line.match(/\d+\.?\d*/)) {
                return line.replace(/(\d+\.?\d*)/g, '<span style="color: #f59e0b;">$1</span>');
            }
            return line;
        }).join('\n');
    }

    setTimeout(typeLine, 500);
}

// ==================== Scroll Animations ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger special animations
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }

                if (entry.target.classList.contains('impact-metrics')) {
                    animateMetrics(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe specific elements
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    document.querySelectorAll('.impact-metrics').forEach(metrics => {
        observer.observe(metrics);
    });

    // Observe cards with stagger effect
    observeWithStagger('.highlight-card', observer);
    observeWithStagger('.suggestion-card', observer);
    observeWithStagger('.cert-item', observer);
}

function observeWithStagger(selector, observer) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// ==================== Counter Animations ====================
function animateCounters() {
    const stats = [
        { element: document.querySelector('.hero-stats .stat:nth-child(1) .stat-number'), target: 17, suffix: '%', duration: 2000 },
        { element: document.querySelector('.hero-stats .stat:nth-child(2) .stat-number'), target: 99.5, suffix: '%', duration: 2000, decimals: 1 },
        { element: document.querySelector('.hero-stats .stat:nth-child(3) .stat-number'), target: 70, suffix: '+', duration: 2000 }
    ];

    stats.forEach(stat => {
        if (!stat.element) return;
        if (stat.element.classList.contains('animated')) return;

        stat.element.classList.add('animated');
        animateValue(stat.element, 0, stat.target, stat.duration, stat.suffix, stat.decimals);
    });
}

function animateMetrics(container) {
    const metrics = container.querySelectorAll('.metric-value');
    metrics.forEach((metric, index) => {
        if (metric.classList.contains('animated')) return;

        metric.classList.add('animated');
        const text = metric.textContent;
        const numberMatch = text.match(/[\d.]+/);

        if (numberMatch) {
            const target = parseFloat(numberMatch[0]);
            const prefix = text.match(/^[^\d]*/)[0];
            const suffix = text.match(/[^\d]*$/)[0];
            const decimals = (numberMatch[0].split('.')[1] || '').length;

            setTimeout(() => {
                animateValue(metric, 0, target, 1500, suffix, decimals, prefix);
            }, index * 100);
        }
    });
}

function animateValue(element, start, end, duration, suffix = '', decimals = 0, prefix = '') {
    const startTime = performance.now();
    const range = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = start + (range * easeProgress);

        element.textContent = prefix + current.toFixed(decimals) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ==================== Utility Functions ====================
// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    let previous = 0;

    return function executedFunction(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== Performance Optimizations ====================
// Preload critical resources
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload fonts
        const fonts = [
            new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2)'),
            new FontFace('JetBrains Mono', 'url(https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2)')
        ];

        fonts.forEach(font => {
            font.load().then(loadedFont => {
                document.fonts.add(loadedFont);
            }).catch(err => {
                console.log('Font loading failed:', err);
            });
        });
    });
}

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Analytics & Tracking ====================
// Add custom event tracking (placeholder for future analytics)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }

    if (typeof plausible !== 'undefined') {
        plausible(action, { props: { category, label } });
    }
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.trim();
        const href = this.getAttribute('href');
        trackEvent('CTA', 'click', `${text} - ${href}`);
    });
});

// Track section views
if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id || entry.target.className;
                trackEvent('Section', 'view', sectionId);
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// ==================== Console Easter Egg ====================
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in how this site works? Check out the code!', 'font-size: 14px; color: #6c757d;');
console.log('%cThis portfolio showcases AI Engineering + Data Science + Business Impact', 'font-size: 12px; color: #10b981;');
console.log('%cFeel free to reach out if you want to collaborate!', 'font-size: 12px; color: #2563eb;');
