/**
 * Storytelling & Interactive Features
 * Phase 2: Personal Storytelling Revolution
 */

class StorytellingExperience {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupTimelineInteractions();
        this.setupValueOrbits();
        this.setupProgressBarAnimations();
        this.setupScrollAnimations();
        this.setupStoryExpansions();
        
        this.isInitialized = true;
    }

    setupTimelineInteractions() {
        const storyExpanders = document.querySelectorAll('.story-expand');
        
        storyExpanders.forEach(button => {
            button.addEventListener('click', (e) => {
                const timelineItem = e.target.closest('.timeline-item');
                const storyDetails = timelineItem.querySelector('.story-details');
                
                if (storyDetails.classList.contains('hidden')) {
                    // Expand story
                    storyDetails.classList.remove('hidden');
                    button.textContent = 'Show less...';
                    
                    // Smooth scroll into view
                    setTimeout(() => {
                        storyDetails.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                    
                    // Add visual feedback
                    timelineItem.style.background = 'var(--primary-color)05';
                    
                } else {
                    // Collapse story
                    storyDetails.classList.add('hidden');
                    button.textContent = 'Tell me more...';
                    timelineItem.style.background = '';
                }
            });
        });
    }

    setupValueOrbits() {
        const valueItems = document.querySelectorAll('.value-item');
        const coreDisplay = document.querySelector('.core-value-display .current-value');
        
        if (!coreDisplay) return;
        
        valueItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const description = item.dataset.description;
                const valueName = item.dataset.value;
                
                if (description) {
                    coreDisplay.textContent = description;
                    coreDisplay.style.fontSize = '0.9rem';
                }
                
                // Pause orbit rotation on hover
                const orbit = document.querySelector('.value-orbit');
                if (orbit) {
                    orbit.style.animationPlayState = 'paused';
                }
                
                // Highlight effect
                item.style.transform = 'scale(1.3)';
                item.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', () => {
                coreDisplay.textContent = 'Hover to explore my values';
                coreDisplay.style.fontSize = '1rem';
                
                // Resume orbit rotation
                const orbit = document.querySelector('.value-orbit');
                if (orbit) {
                    orbit.style.animationPlayState = 'running';
                }
                
                // Reset transform
                item.style.transform = '';
                item.style.zIndex = '';
            });
        });
    }

    setupProgressBarAnimations() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observeProgress = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progressValue = progressBar.style.getPropertyValue('--progress');
                    
                    // Animate the progress bar
                    progressBar.style.setProperty('--progress', '0%');
                    
                    setTimeout(() => {
                        progressBar.style.setProperty('--progress', progressValue);
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observeProgress.observe(bar));
    }

    setupScrollAnimations() {
        // Timeline items entrance animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observeTimeline = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';
            observeTimeline.observe(item);
        });

        // Philosophy cards stagger animation
        const philosophyCards = document.querySelectorAll('.philosophy-card');
        
        const observePhilosophy = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        philosophyCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observePhilosophy.observe(card);
        });

        // Fact cards cascade animation
        const factCards = document.querySelectorAll('.fact-card');
        
        const observeFacts = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1) translateY(0)';
                    }, index * 80);
                }
            });
        }, { threshold: 0.3 });

        factCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8) translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observeFacts.observe(card);
        });
    }

    setupStoryExpansions() {
        // Add reading time estimation
        const storyDetails = document.querySelectorAll('.story-details');
        
        storyDetails.forEach(detail => {
            const text = detail.textContent;
            const wordCount = text.split(' ').length;
            const readingTime = Math.ceil(wordCount / 200); // Average reading speed
            
            if (readingTime > 1) {
                const timeIndicator = document.createElement('span');
                timeIndicator.className = 'reading-time';
                timeIndicator.textContent = `${readingTime} min read`;
                timeIndicator.style.cssText = `
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    font-style: italic;
                    display: block;
                    margin-bottom: 1rem;
                `;
                
                detail.insertBefore(timeIndicator, detail.firstChild);
            }
        });
    }

    // Theme-aware animations
    updateThemeAnimations(theme) {
        const root = document.documentElement;
        
        switch(theme) {
            case 'creative':
                root.style.setProperty('--animation-speed', '1.2s');
                this.addCreativeFlare();
                break;
            case 'party':
                root.style.setProperty('--animation-speed', '0.8s');
                this.addPartyMode();
                break;
            default:
                root.style.setProperty('--animation-speed', '1s');
                this.resetAnimations();
        }
    }

    addCreativeFlare() {
        // Enhanced animations for creative theme
        const profileFrame = document.querySelector('.profile-frame');
        if (profileFrame) {
            profileFrame.style.filter = 'hue-rotate(45deg) saturate(1.3)';
        }

        const valueOrbit = document.querySelector('.value-orbit');
        if (valueOrbit) {
            valueOrbit.style.animationDuration = '25s';
        }
    }

    addPartyMode() {
        // Fun animations for party theme
        const profileFrame = document.querySelector('.profile-frame');
        if (profileFrame) {
            profileFrame.style.filter = 'hue-rotate(90deg) saturate(1.5) brightness(1.1)';
            profileFrame.style.animationDuration = '15s';
        }

        const valueOrbit = document.querySelector('.value-orbit');
        if (valueOrbit) {
            valueOrbit.style.animationDuration = '20s';
        }

        // Add party sparkles
        this.addSparkleEffect();
    }

    resetAnimations() {
        const profileFrame = document.querySelector('.profile-frame');
        if (profileFrame) {
            profileFrame.style.filter = '';
            profileFrame.style.animationDuration = '20s';
        }

        const valueOrbit = document.querySelector('.value-orbit');
        if (valueOrbit) {
            valueOrbit.style.animationDuration = '30s';
        }
    }

    addSparkleEffect() {
        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-container';
        sparkleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(sparkleContainer);

        // Create sparkles on mouse move
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.8) { // Only sometimes create sparkles
                this.createSparkle(e.clientX, e.clientY, sparkleContainer);
            }
        });
    }

    createSparkle(x, y, container) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: sparkleFloat 1s ease-out forwards;
            font-size: ${Math.random() * 10 + 10}px;
            transform: translate(-50%, -50%);
        `;
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // Accessibility improvements
    setupAccessibility() {
        // Add keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll('.value-item, .story-expand, .focus-card');
        
        interactiveElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Add reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.reduceAnimations();
        }
    }

    reduceAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Custom CSS animations for sparkles
const sparkleCSS = `
@keyframes sparkleFloat {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0) rotate(360deg);
    }
}
`;

// Add sparkle animations to document
const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleCSS;
document.head.appendChild(styleSheet);

// Initialize storytelling experience when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const storytelling = new StorytellingExperience();
    
    // Listen for theme changes
    document.addEventListener('themeChanged', (e) => {
        storytelling.updateThemeAnimations(e.detail.theme);
    });
    
    // Setup accessibility features
    storytelling.setupAccessibility();
});

// Export for potential external use
window.StorytellingExperience = StorytellingExperience;
