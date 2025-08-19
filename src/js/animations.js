// ✨ FLUXLOVE - Advanced Animation Controller ✨

class FluxloveAnimations {
    constructor() {
        this.isInitialized = false;
        this.observers = [];
        this.animationQueue = [];
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupIntersectionObserver();
        this.initializeScrollAnimations();
        this.setupPerformanceOptimizations();
        this.isInitialized = true;
        
        console.log('🎨 Fluxlove Animations Initialized!');
    }

    // 🌟 Enhanced Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerEntranceAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(`
            .skill-card,
            .category-card,
            .featured-item,
            .hero-stat,
            .achievement-card,
            .project-item,
            .testimonial
        `);

        animatableElements.forEach(element => {
            this.prepareElement(element);
            this.scrollObserver.observe(element);
        });
    }

    // 🎭 Prepare elements for animation
    prepareElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.dataset.animated = 'false';
    }

    // ✨ Trigger entrance animations based on current theme
    triggerEntranceAnimation(element, ratio) {
        if (element.dataset.animated === 'true') return;
        
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'professional';
        const delay = this.calculateAnimationDelay(element);
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.dataset.animated = 'true';
            
            // Add theme-specific animation classes
            this.addThemeAnimation(element, currentTheme);
            
            // Create magical sparkles for high visibility ratios
            if (ratio > 0.5) {
                this.createElementSparkles(element);
            }
        }, delay);
    }

    // 🎪 Add theme-specific animations
    addThemeAnimation(element, theme) {
        // Remove existing theme classes
        element.classList.remove('party-entrance', 'creative-entrance', 'professional-entrance');
        
        switch (theme) {
            case 'party':
                element.classList.add('party-entrance');
                break;
            case 'creative':
                element.classList.add('creative-entrance');
                break;
            case 'professional':
                element.classList.add('professional-entrance');
                break;
        }
    }

    // ⏱️ Calculate staggered animation delays
    calculateAnimationDelay(element) {
        const siblings = Array.from(element.parentNode.children);
        const index = siblings.indexOf(element);
        return Math.min(index * 100, 600); // Max 600ms delay
    }

    // ✨ Create sparkle effects for elements
    createElementSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkleCount = 6;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                this.createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
    }

    // 🌟 Create individual sparkle
    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #ffd700, #fff);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkleFloat 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }

    // 🎨 Initialize scroll-based animations
    initializeScrollAnimations() {
        let lastScrollY = window.scrollY;
        let scrollSpeed = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollSpeed = Math.abs(currentScrollY - lastScrollY);
            lastScrollY = currentScrollY;
            
            // Update parallax elements based on scroll
            this.updateParallaxElements(currentScrollY);
            
            // Adjust animation speed based on scroll velocity
            this.adjustAnimationSpeed(scrollSpeed);
        }, { passive: true });
    }

    // 🌊 Update parallax elements
    updateParallaxElements(scrollY) {
        const parallaxElements = document.querySelectorAll('.hero-title, .floating-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    }

    // ⚡ Adjust animation speed based on scroll velocity
    adjustAnimationSpeed(speed) {
        const speedFactor = Math.min(speed / 10, 2); // Max 2x speed
        document.documentElement.style.setProperty('--scroll-speed-factor', speedFactor);
    }

    // 🎯 Performance optimizations
    setupPerformanceOptimizations() {
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
        
        // Reduce animations on low-end devices
        if (this.isLowEndDevice()) {
            this.enableReducedMotion();
        }
    }

    // 📱 Detect low-end devices
    isLowEndDevice() {
        const nav = navigator;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
        
        if (connection && connection.effectiveType) {
            return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
        }
        
        // Fallback: check for low memory devices
        return nav.deviceMemory && nav.deviceMemory < 2;
    }

    // 🎛️ Animation control methods
    pauseAnimations() {
        document.documentElement.style.setProperty('--animations-play-state', 'paused');
    }

    resumeAnimations() {
        document.documentElement.style.setProperty('--animations-play-state', 'running');
    }

    enableReducedMotion() {
        document.documentElement.classList.add('reduced-motion');
        console.log('🔧 Reduced motion enabled for better performance');
    }

    // 🧹 Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.isInitialized = false;
    }
}

// Add sparkle animation keyframes
const sparkleStyles = document.createElement('style');
sparkleStyles.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0px) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
        }
    }
    
    .reduced-motion * {
        animation-duration: 0.01s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01s !important;
    }
`;
document.head.appendChild(sparkleStyles);

// Legacy animation support - Enhanced
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate');

    animatedElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.add('animated');
        });

        element.addEventListener('animationend', () => {
            element.classList.remove('animated');
        });
    });
    
    // Initialize new animation system
    window.fluxloveAnimations = new FluxloveAnimations();
});

// Export for external use
window.FluxloveAnimations = FluxloveAnimations;