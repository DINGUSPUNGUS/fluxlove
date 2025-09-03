/**
 * ✨ FLUXLOVE - Premium Interactions & Animation Engine ✨
 * Client-ready with AAA game-level polish
 */

(function() {
    'use strict';

    // Performance monitoring with detailed metrics
    const Performance = {
        start: performance.now(),
        marks: new Map(),
        metrics: new Map(),
        
        mark(name) {
            this.marks.set(name, performance.now());
            console.log(`📍 Performance Mark: ${name}`);
        },
        
        measure(name, startMark) {
            const start = this.marks.get(startMark) || this.start;
            const duration = performance.now() - start;
            this.metrics.set(name, duration);
            console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
            return duration;
        },
        
        logSummary() {
            console.log('📊 Performance Summary:');
            this.metrics.forEach((duration, name) => {
                console.log(`  ${name}: ${duration.toFixed(2)}ms`);
            });
        }
    };

    Performance.mark('core-init');

    // Premium Loading System
    class LoadingManager {
        constructor() {
            this.overlay = null;
            this.isLoading = true;
            this.loadPromises = [];
            this.init();
        }

        init() {
            this.createOverlay();
            this.setupLoadingPromises();
            
            // Auto-hide loading after maximum time
            setTimeout(() => {
                if (this.isLoading) {
                    this.hide();
                }
            }, 5000);
        }

        createOverlay() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'loading-overlay';
            this.overlay.innerHTML = `
                <div class="loading-spinner"></div>
            `;
            document.body.appendChild(this.overlay);
        }

        setupLoadingPromises() {
            // Wait for DOM content
            this.addPromise(new Promise(resolve => {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', resolve);
                } else {
                    resolve();
                }
            }));

            // Wait for window load
            this.addPromise(new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve);
                }
            }));

            // Wait for critical resources
            this.addPromise(this.loadCriticalResources());

            // Start monitoring
            Promise.all(this.loadPromises).then(() => {
                setTimeout(() => this.hide(), 500);
            });
        }

        async loadCriticalResources() {
            const criticalImages = document.querySelectorAll('img[data-critical]');
            const imagePromises = Array.from(criticalImages).map(img => {
                return new Promise(resolve => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.addEventListener('load', resolve);
                        img.addEventListener('error', resolve);
                    }
                });
            });

            return Promise.all(imagePromises);
        }

        addPromise(promise) {
            this.loadPromises.push(promise);
        }

        hide() {
            if (!this.isLoading) return;
            
            this.isLoading = false;
            this.overlay.classList.add('hidden');
            
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
                // Trigger page entrance animations
                document.body.classList.add('loaded');
                AnimationEngine.triggerEntranceAnimations();
            }, 800);
        }
    }

    // Premium Page Transition System
    class PageTransitionManager {
        constructor() {
            this.transitionElement = null;
            this.isTransitioning = false;
            this.init();
        }

        init() {
            this.createTransitionElement();
            this.setupNavigationListeners();
        }

        createTransitionElement() {
            this.transitionElement = document.createElement('div');
            this.transitionElement.className = 'page-transition';
            document.body.appendChild(this.transitionElement);
        }

        setupNavigationListeners() {
            // Intercept internal links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link) return;

                const href = link.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) {
                    return;
                }

                e.preventDefault();
                this.navigateToPage(href);
            });
        }

        async navigateToPage(url) {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            
            // Start transition
            this.transitionElement.classList.add('active');
            
            // Wait for transition
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // Navigate
            window.location.href = url;
        }
    }

    // Enhanced Scroll Progress
    class ScrollProgress {
        constructor() {
            this.progressBar = null;
            this.ticking = false;
            this.init();
        }

        init() {
            this.createProgressBar();
            this.setupScrollListener();
        }

        createProgressBar() {
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'scroll-progress';
            document.body.appendChild(this.progressBar);
        }

        setupScrollListener() {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    requestAnimationFrame(() => this.updateProgress());
                    this.ticking = true;
                }
            }, { passive: true });
        }

        updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            this.progressBar.style.width = `${Math.min(progress, 100)}%`;
            this.ticking = false;
        }
    }

    // Premium Animation Engine
    class AnimationEngine {
        constructor() {
            this.observers = new Map();
            this.init();
        }

        init() {
            this.setupIntersectionObserver();
            this.setupScrollAnimations();
            this.enhanceButtons();
            this.enhanceCards();
        }

        setupIntersectionObserver() {
            if (!('IntersectionObserver' in window)) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    rootMargin: '0px 0px -10% 0px',
                    threshold: 0.1
                }
            );

            // Observe all animatable elements
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });

            this.observers.set('scroll', observer);
        }

        setupScrollAnimations() {
            // Parallax elements
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            if (parallaxElements.length === 0) return;

            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.updateParallax(parallaxElements);
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }

        updateParallax(elements) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            elements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }

        enhanceButtons() {
            document.querySelectorAll('.btn').forEach(button => {
                // Add ripple effect
                button.addEventListener('click', (e) => {
                    this.createRipple(e, button);
                });

                // Add magnetic effect on hover (subtle)
                if (!('ontouchstart' in window)) {
                    button.addEventListener('mousemove', (e) => {
                        this.createMagneticEffect(e, button);
                    });

                    button.addEventListener('mouseleave', () => {
                        button.style.transform = '';
                    });
                }
            });
        }

        createRipple(e, element) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;

            element.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        createMagneticEffect(e, element) {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        }

        enhanceCards() {
            document.querySelectorAll('.portfolio-card').forEach(card => {
                // 3D tilt effect
                if (!('ontouchstart' in window)) {
                    card.addEventListener('mousemove', (e) => {
                        this.createTiltEffect(e, card);
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.transform = '';
                    });
                }
            });
        }

        createTiltEffect(e, element) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        }

        static triggerEntranceAnimations() {
            // Reveal content sections
            document.querySelectorAll('.content-reveal').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 100);
            });
        }
    }

    // Enhanced Theme System
    class ThemeManager {
        constructor() {
            this.themes = [
                { 
                    name: "professional", 
                    display: "Professional", 
                    icon: "💼",
                    colors: {
                        primary: "#7c3aed",
                        secondary: "#6366f1", 
                        accent: "#10b981"
                    }
                },
                { 
                    name: "creative", 
                    display: "Creative", 
                    icon: "🎨",
                    colors: {
                        primary: "#ec4899",
                        secondary: "#f59e0b",
                        accent: "#06b6d4"
                    }
                },
                { 
                    name: "party", 
                    display: "Energy", 
                    icon: "🎉",
                    colors: {
                        primary: "#f59e0b",
                        secondary: "#ef4444",
                        accent: "#8b5cf6"
                    }
                }
            ];
            
            this.currentIndex = parseInt(localStorage.getItem("fluxlove-theme") || "0", 10);
            this.transitionElement = null;
            this.init();
        }

        init() {
            this.createTransitionElement();
            this.setupThemeButton();
            this.applyTheme(this.currentIndex, true);
        }

        createTransitionElement() {
            this.transitionElement = document.createElement('div');
            this.transitionElement.className = 'theme-transition';
            document.body.appendChild(this.transitionElement);
        }

        setupThemeButton() {
            const themeButton = document.getElementById('theme-toggle');
            if (!themeButton) return;

            themeButton.addEventListener('click', () => {
                this.cycleTheme();
            });
        }

        async cycleTheme() {
            // Create transition effect
            this.transitionElement.classList.add('active');
            
            // Wait for transition to cover screen
            await new Promise(resolve => setTimeout(resolve, 400));
            
            // Apply new theme
            this.currentIndex = (this.currentIndex + 1) % this.themes.length;
            this.applyTheme(this.currentIndex);
            
            // Complete transition
            await new Promise(resolve => setTimeout(resolve, 100));
            this.transitionElement.classList.remove('active');
        }

        applyTheme(index, skipAnimation = false) {
            const theme = this.themes[index];
            if (!theme) return;

            const root = document.documentElement;
            
            // Apply theme attribute
            root.setAttribute('data-theme', theme.name);
            
            // Update CSS custom properties
            Object.entries(theme.colors).forEach(([key, value]) => {
                root.style.setProperty(`--theme-${key}`, value);
                root.style.setProperty(`--${key}`, value);
            });

            // Update UI
            this.updateThemeUI(theme);
            
            // Store preference
            localStorage.setItem("fluxlove-theme", index.toString());
            
            Performance.mark('theme-applied');
        }

        updateThemeUI(theme) {
            const themeButton = document.getElementById('theme-toggle');
            if (!themeButton) return;

            const themeText = themeButton.querySelector('.theme-text');
            const themeIcon = themeButton.querySelector('.theme-icon');
            
            if (themeText) themeText.textContent = theme.display;
            if (themeIcon) themeIcon.textContent = theme.icon;
        }
    }

    // Mobile Navigation
    class MobileNavigation {
        constructor() {
            this.mobileNav = null;
            this.hamburger = null;
            this.isOpen = false;
            this.init();
        }

        init() {
            this.createMobileNav();
            this.createHamburger();
            this.setupEventListeners();
        }

        createMobileNav() {
            this.mobileNav = document.createElement('div');
            this.mobileNav.className = 'mobile-nav';
            
            // Copy navigation links
            const navLinks = document.querySelectorAll('.nav-menu .nav-link');
            navLinks.forEach(link => {
                const mobileLink = link.cloneNode(true);
                mobileLink.addEventListener('click', () => this.close());
                this.mobileNav.appendChild(mobileLink);
            });

            document.body.appendChild(this.mobileNav);
        }

        createHamburger() {
            this.hamburger = document.createElement('button');
            this.hamburger.className = 'mobile-hamburger';
            this.hamburger.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            this.hamburger.style.cssText = `
                display: none;
                flex-direction: column;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                gap: 3px;
            `;
            
            this.hamburger.querySelectorAll('span').forEach(span => {
                span.style.cssText = `
                    display: block;
                    width: 25px;
                    height: 3px;
                    background: var(--text-color);
                    transition: all 0.3s ease;
                `;
            });

            // Add to navigation
            const navContainer = document.querySelector('.nav-container');
            if (navContainer) {
                navContainer.appendChild(this.hamburger);
            }
        }

        setupEventListeners() {
            if (this.hamburger) {
                this.hamburger.addEventListener('click', () => this.toggle());
            }

            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });

            // Close on outside click
            this.mobileNav.addEventListener('click', (e) => {
                if (e.target === this.mobileNav) {
                    this.close();
                }
            });

            // Show/hide based on screen size
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.close();
                    this.hamburger.style.display = 'none';
                } else {
                    this.hamburger.style.display = 'flex';
                }
            });

            // Initial check
            if (window.innerWidth <= 768) {
                this.hamburger.style.display = 'flex';
            }
        }

        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        open() {
            this.isOpen = true;
            this.mobileNav.classList.add('active');
            this.hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        close() {
            this.isOpen = false;
            this.mobileNav.classList.remove('active');
            this.hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Initialize everything when DOM is ready
    function initialize() {
        Performance.mark('initialization-start');

        // Initialize all systems
        const loadingManager = new LoadingManager();
        const pageTransitions = new PageTransitionManager();
        const scrollProgress = new ScrollProgress();
        const animationEngine = new AnimationEngine();
        const themeManager = new ThemeManager();
        const mobileNav = new MobileNavigation();

        // Add ripple animation keyframes
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        Performance.mark('initialization-complete');
        Performance.measure('Total Initialization', 'initialization-start');
        
        // Log performance summary after everything loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                Performance.logSummary();
            }, 1000);
        });

        console.log('✨ FLUXLOVE Premium Systems Initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Export for debugging
    window.FluxloveCore = {
        Performance,
        initialize
    };

})();
