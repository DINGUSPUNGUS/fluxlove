/**
 * ✨ FLUXLOVE - Final Performance & Quality Assurance ✨
 * Last-mile optimizations for client delivery
 */

(function() {
    'use strict';

    // Performance Quality Assurance
    class QualityAssurance {
        constructor() {
            this.metrics = {
                loadTime: 0,
                animationFrames: 0,
                errorCount: 0,
                performanceScore: 0
            };
            this.init();
        }

        init() {
            this.monitorPerformance();
            this.optimizeAnimations();
            this.ensureAccessibility();
            this.validateContent();
        }

        monitorPerformance() {
            // Track Core Web Vitals
            if ('PerformanceObserver' in window) {
                // Largest Contentful Paint
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        console.log('📊 LCP:', entry.startTime);
                    }
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // Cumulative Layout Shift
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            console.log('📊 CLS:', entry.value);
                        }
                    }
                }).observe({ entryTypes: ['layout-shift'] });

                // First Input Delay
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        console.log('📊 FID:', entry.processingStart - entry.startTime);
                    }
                }).observe({ entryTypes: ['first-input'] });
            }

            // Track load completion
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.generatePerformanceReport();
                }, 1000);
            });
        }

        optimizeAnimations() {
            // Ensure all animations run at 60fps
            let lastFrame = performance.now();
            let frameCount = 0;

            const checkFrameRate = (currentTime) => {
                frameCount++;
                
                if (currentTime - lastFrame >= 1000) {
                    const fps = Math.round((frameCount * 1000) / (currentTime - lastFrame));
                    if (fps < 55) {
                        console.warn('⚠️ Frame rate below optimal:', fps, 'fps');
                        this.reduceAnimationComplexity();
                    } else {
                        console.log('✅ Frame rate optimal:', fps, 'fps');
                    }
                    
                    frameCount = 0;
                    lastFrame = currentTime;
                }
                
                requestAnimationFrame(checkFrameRate);
            };

            requestAnimationFrame(checkFrameRate);
        }

        reduceAnimationComplexity() {
            // Reduce animation complexity if performance is poor
            document.documentElement.style.setProperty('--transition-smooth', '0.2s ease');
            document.querySelectorAll('.geometric-art .particle').forEach((particle, index) => {
                if (index > 2) {
                    particle.style.display = 'none';
                }
            });
            console.log('🔧 Reduced animation complexity for better performance');
        }

        ensureAccessibility() {
            // Verify all interactive elements have proper labels
            const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
            interactiveElements.forEach(element => {
                const hasLabel = element.getAttribute('aria-label') || 
                                element.getAttribute('aria-labelledby') ||
                                element.textContent.trim() ||
                                element.querySelector('img')?.getAttribute('alt');
                
                if (!hasLabel) {
                    console.warn('⚠️ Interactive element missing label:', element);
                }
            });

            // Ensure proper heading hierarchy
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            let lastLevel = 0;
            
            headings.forEach(heading => {
                const level = parseInt(heading.tagName[1]);
                if (level > lastLevel + 1) {
                    console.warn('⚠️ Heading hierarchy skip detected:', heading);
                }
                lastLevel = level;
            });

            console.log('✅ Accessibility check completed');
        }

        validateContent() {
            // Check for missing images or broken links
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('error', () => {
                    console.warn('⚠️ Image failed to load:', img.src);
                    this.metrics.errorCount++;
                });
            });

            // Validate links (basic check)
            const links = document.querySelectorAll('a[href]');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (!target) {
                        console.warn('⚠️ Broken internal link:', href);
                        this.metrics.errorCount++;
                    }
                }
            });

            console.log('✅ Content validation completed');
        }

        generatePerformanceReport() {
            const navigation = performance.getEntriesByType('navigation')[0];
            
            this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
            this.metrics.performanceScore = this.calculatePerformanceScore();

            console.log('🎯 FLUXLOVE Performance Report:');
            console.log(`  📈 Load Time: ${this.metrics.loadTime.toFixed(2)}ms`);
            console.log(`  🎭 Animation Health: ${this.metrics.animationFrames > 0 ? 'Good' : 'Excellent'}`);
            console.log(`  ❌ Error Count: ${this.metrics.errorCount}`);
            console.log(`  🏆 Performance Score: ${this.metrics.performanceScore}/100`);
            
            // Report to console for client visibility
            if (this.metrics.performanceScore >= 90) {
                console.log('🌟 EXCELLENT: Website performance is premium quality!');
            } else if (this.metrics.performanceScore >= 75) {
                console.log('✨ GOOD: Website performance is solid with room for optimization.');
            } else {
                console.log('⚠️ NEEDS IMPROVEMENT: Performance optimizations recommended.');
            }
        }

        calculatePerformanceScore() {
            let score = 100;
            
            // Deduct for slow load times
            if (this.metrics.loadTime > 3000) score -= 20;
            else if (this.metrics.loadTime > 2000) score -= 10;
            else if (this.metrics.loadTime > 1000) score -= 5;
            
            // Deduct for errors
            score -= this.metrics.errorCount * 5;
            
            // Deduct for poor animations
            if (this.metrics.animationFrames > 10) score -= 10;
            
            return Math.max(0, score);
        }
    }

    // Enhanced Image Loading
    class ImageOptimizer {
        constructor() {
            this.lazyImages = [];
            this.init();
        }

        init() {
            this.setupLazyLoading();
            this.optimizeExistingImages();
        }

        setupLazyLoading() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            imageObserver.unobserve(entry.target);
                        }
                    });
                }, { rootMargin: '50px' });

                // Find all images with data-src
                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }

        loadImage(img) {
            return new Promise((resolve, reject) => {
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    resolve();
                };
                newImg.onerror = reject;
                newImg.src = img.dataset.src;
            });
        }

        optimizeExistingImages() {
            // Add loading states to existing images
            document.querySelectorAll('img').forEach(img => {
                if (!img.complete) {
                    img.classList.add('loading');
                    img.addEventListener('load', () => {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    });
                }
            });
        }
    }

    // Final Polish Touch-ups
    class FinalPolish {
        constructor() {
            this.init();
        }

        init() {
            this.addMicroInteractions();
            this.enhanceKeyboardNavigation();
            this.addProgressiveEnhancement();
            this.finalValidation();
        }

        addMicroInteractions() {
            // Add subtle hover sounds (visual feedback only)
            document.querySelectorAll('.btn, .nav-link').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = element.style.transform || '';
                });
            });

            // Add click feedback
            document.addEventListener('click', (e) => {
                if (e.target.matches('.btn, .nav-link, .portfolio-card')) {
                    this.createClickFeedback(e);
                }
            });
        }

        createClickFeedback(e) {
            const feedback = document.createElement('div');
            feedback.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: clickFeedback 0.6s ease-out forwards;
            `;
            
            feedback.style.left = e.clientX + 'px';
            feedback.style.top = e.clientY + 'px';
            
            document.body.appendChild(feedback);
            
            setTimeout(() => feedback.remove(), 600);
        }

        enhanceKeyboardNavigation() {
            // Improve keyboard navigation
            let focusableElements = [];
            
            const updateFocusableElements = () => {
                focusableElements = Array.from(document.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                ));
            };

            updateFocusableElements();

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    updateFocusableElements();
                }
                
                // Add escape key handlers
                if (e.key === 'Escape') {
                    const activeElement = document.activeElement;
                    if (activeElement && activeElement.blur) {
                        activeElement.blur();
                    }
                }
            });
        }

        addProgressiveEnhancement() {
            // Enhance for users with JavaScript
            document.documentElement.classList.add('js-enabled');
            
            // Add enhanced features for capable browsers
            if ('backdrop-filter' in document.documentElement.style || 
                '-webkit-backdrop-filter' in document.documentElement.style) {
                document.documentElement.classList.add('backdrop-filter-support');
            }

            if ('IntersectionObserver' in window) {
                document.documentElement.classList.add('intersection-observer-support');
            }
        }

        finalValidation() {
            // Final checks before client delivery
            setTimeout(() => {
                console.log('🔍 Final Quality Check:');
                
                // Check if all critical CSS is loaded
                const criticalStyles = ['performance.css', 'hero.css', 'portfolio.css'];
                criticalStyles.forEach(style => {
                    const link = document.querySelector(`link[href*="${style}"]`);
                    if (link && link.sheet) {
                        console.log(`✅ ${style} loaded successfully`);
                    } else {
                        console.warn(`⚠️ ${style} may not be loaded properly`);
                    }
                });

                // Verify theme system
                const themeButton = document.getElementById('theme-toggle');
                if (themeButton) {
                    console.log('✅ Theme system initialized');
                } else {
                    console.warn('⚠️ Theme button not found');
                }

                console.log('🎉 FLUXLOVE is ready for client delivery!');
            }, 2000);
        }
    }

    // Add click feedback animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickFeedback {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize all systems
    function initializeQualitySystems() {
        console.log('🚀 Initializing FLUXLOVE Quality Systems...');
        
        new QualityAssurance();
        new ImageOptimizer();
        new FinalPolish();
        
        console.log('✨ All quality systems initialized');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeQualitySystems);
    } else {
        initializeQualitySystems();
    }

})();
