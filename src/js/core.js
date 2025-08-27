/**
 * ✨ FLUXLOVE - Performance Optimized JavaScript Core ✨
 * Modern, efficient, and Google-level optimized
 */

(function() {
    'use strict';

    // Performance monitoring
    const perf = {
        start: performance.now(),
        marks: new Map(),
        
        mark(name) {
            this.marks.set(name, performance.now());
        },
        
        measure(name, startMark) {
            const start = this.marks.get(startMark) || this.start;
            const duration = performance.now() - start;
            console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
            return duration;
        }
    };

    perf.mark('init');

    // Theme system with performance optimization
    const themes = [
        { 
            name: "professional", 
            display: "Professional", 
            icon: "💼", 
            description: "Clean, polished, and sophisticated",
            colors: {
                primary: "#7c3aed",
                secondary: "#6366f1",
                accent: "#10b981"
            }
        },
        { 
            name: "creative", 
            display: "Creative Art", 
            icon: "🎨", 
            description: "Vibrant, artistic, and inspiring",
            colors: {
                primary: "#ec4899",
                secondary: "#f59e0b",
                accent: "#06b6d4"
            }
        },
        { 
            name: "party", 
            display: "Dance Party", 
            icon: "🎉", 
            description: "Energetic, fun, and dynamic",
            colors: {
                primary: "#f59e0b",
                secondary: "#ef4444",
                accent: "#8b5cf6"
            }
        }
    ];

    let currentThemeIndex = parseInt(localStorage.getItem("fluxlove-theme") || "0", 10);
    let isTransitioning = false;

    // Optimized theme application
    function applyTheme(index, skipTransition = false) {
        if (isTransitioning && !skipTransition) return;
        
        perf.mark('theme-start');
        
        const theme = themes[index];
        if (!theme) return;

        currentThemeIndex = index;
        
        // Use CSS custom properties for instant theme switching
        const root = document.documentElement;
        root.setAttribute('data-theme', theme.name);
        
        // Apply theme colors
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${key}`, value);
        });

        // Update UI elements
        updateThemeUI(index);
        
        // Store preference
        localStorage.setItem("fluxlove-theme", index.toString());
        
        if (!skipTransition) {
            createThemeTransition();
        }
        
        perf.measure('Theme applied', 'theme-start');
    }

    // Optimized theme transition
    function createThemeTransition() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, ${themes[currentThemeIndex].colors.primary}, ${themes[currentThemeIndex].colors.accent});
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Trigger transition
        requestAnimationFrame(() => {
            overlay.style.opacity = '0.8';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    isTransitioning = false;
                }, 300);
            }, 200);
        });
    }

    // Update theme UI elements
    function updateThemeUI(index) {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const theme = themes[index];
        const iconElement = themeToggle.querySelector('.theme-icon');
        const textElement = themeToggle.querySelector('.theme-text');
        
        if (iconElement) {
            iconElement.textContent = theme.icon;
        }
        
        if (textElement) {
            textElement.textContent = theme.display;
        }
        
        // Update aria-label for accessibility
        themeToggle.setAttribute('aria-label', `Switch to ${theme.display} theme`);
    }

    // Optimized scroll handler with throttling
    let scrollTimeout;
    let lastScrollY = 0;
    
    function handleScroll() {
        const currentScrollY = window.pageYOffset;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Update CSS custom property for scroll-based animations
        document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`);
        
        // Handle navigation background opacity
        const nav = document.querySelector('.main-nav');
        if (nav) {
            const opacity = Math.min(currentScrollY / 100, 1);
            nav.style.setProperty('--nav-opacity', opacity.toString());
        }
        
        lastScrollY = currentScrollY;
        
        // Dispatch custom scroll event for other components
        document.dispatchEvent(new CustomEvent('optimizedScroll', {
            detail: { scrollY: currentScrollY, direction: scrollDirection }
        }));
    }

    // Throttled scroll listener
    function onScroll() {
        if (!scrollTimeout) {
            scrollTimeout = requestAnimationFrame(() => {
                handleScroll();
                scrollTimeout = null;
            });
        }
    }

    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Optional: unobserve after animation to improve performance
                if (entry.target.dataset.once !== 'false') {
                    animationObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Prefetch links on hover
    const prefetchedLinks = new Set();
    
    function prefetchLink(href) {
        if (prefetchedLinks.has(href)) return;
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
        
        prefetchedLinks.add(href);
    }

    // Enhanced link handling
    function handleLinkHover(event) {
        const link = event.target.closest('a');
        if (link && link.href && link.hostname === window.location.hostname) {
            prefetchLink(link.href);
        }
    }

    // Initialize floating elements
    function createFloatingElements() {
        const container = document.createElement('div');
        container.className = 'floating-elements';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        // Create floating elements
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 40}px;
                height: ${20 + Math.random() * 40}px;
                background: linear-gradient(135deg, ${themes[currentThemeIndex].colors.primary}33, ${themes[currentThemeIndex].colors.accent}33);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${15 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 20}s;
            `;
            
            container.appendChild(element);
        }
        
        document.body.appendChild(container);
    }

    // Performance-optimized initialization
    function init() {
        perf.mark('dom-ready');
        
        // Apply initial theme
        applyTheme(currentThemeIndex, true);
        
        // Set up event listeners with performance optimization
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const nextIndex = (currentThemeIndex + 1) % themes.length;
                applyTheme(nextIndex);
            });
        }
        
        // Scroll handling
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Link prefetching
        document.addEventListener('mouseover', handleLinkHover, { passive: true });
        
        // Set up observers
        document.querySelectorAll('[data-animate]').forEach(el => {
            animationObserver.observe(el);
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Create floating elements
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            createFloatingElements();
        }
        
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
        
        perf.measure('Initialization complete', 'dom-ready');
        console.log('🚀 fluxlove loaded successfully');
    }

    // Enhanced DOM ready detection
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API for external use
    window.fluxlove = {
        themes,
        currentTheme: () => themes[currentThemeIndex],
        setTheme: applyTheme,
        perf
    };

})();
