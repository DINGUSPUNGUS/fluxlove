/**
 * Interactive Art Gallery Experience
 * Phase 2: Creative Portfolio Showcase
 */

class ArtGalleryExperience {
    constructor() {
        this.currentFilter = 'all';
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupGalleryFilters();
        this.setupArtworkInteractions();
        this.setupScrollAnimations();
        this.setupStatCounters();
        this.setupCanvasAnimation();
        
        this.isInitialized = true;
    }

    setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const artworkCards = document.querySelectorAll('.artwork-card');
        
        if (!filterButtons.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.dataset.filter;
                this.currentFilter = filter;
                
                // Filter artwork cards
                this.filterArtworks(filter, artworkCards);
            });
        });
    }

    filterArtworks(filter, artworkCards) {
        artworkCards.forEach((card, index) => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(20px)';
                
                // Staggered animation
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease-out';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, index * 100);
                
            } else {
                card.style.transition = 'all 0.3s ease-out';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(-20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    setupArtworkInteractions() {
        const artworkCards = document.querySelectorAll('.artwork-card');
        
        artworkCards.forEach(card => {
            const artworkEmoji = card.querySelector('.artwork-emoji');
            const overlay = card.querySelector('.artwork-overlay');
            const story = card.querySelector('.artwork-story');
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                // Animate emoji
                if (artworkEmoji) {
                    artworkEmoji.style.transform = 'scale(1.2) rotate(15deg)';
                    artworkEmoji.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))';
                }
                
                // Add parallax effect to overlay
                this.addParallaxEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset emoji
                if (artworkEmoji) {
                    artworkEmoji.style.transform = '';
                    artworkEmoji.style.filter = '';
                }
                
                // Remove parallax effect
                this.removeParallaxEffect(card);
            });
            
            // Click to expand story
            card.addEventListener('click', () => {
                this.toggleArtworkStory(card);
            });
        });
    }

    addParallaxEffect(card) {
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };
        
        card.addEventListener('mousemove', handleMouseMove);
        card._handleMouseMove = handleMouseMove; // Store for cleanup
    }

    removeParallaxEffect(card) {
        if (card._handleMouseMove) {
            card.removeEventListener('mousemove', card._handleMouseMove);
            delete card._handleMouseMove;
        }
        
        card.style.transform = 'translateY(-10px)'; // Keep the hover lift
    }

    toggleArtworkStory(card) {
        const story = card.querySelector('.artwork-story');
        if (!story) return;
        
        const isExpanded = story.style.maxHeight && story.style.maxHeight !== '0px';
        
        if (isExpanded) {
            // Collapse
            story.style.maxHeight = '0px';
            story.style.padding = '0 2rem';
            card.classList.remove('story-expanded');
        } else {
            // Expand
            story.style.maxHeight = '200px';
            story.style.padding = '2rem';
            card.classList.add('story-expanded');
            
            // Scroll into view if needed
            setTimeout(() => {
                const rect = card.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        }
    }

    setupScrollAnimations() {
        // Journey milestones animation
        const milestones = document.querySelectorAll('.journey-milestone');
        
        const observeMilestones = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    // Animate mini artworks
                    const miniArtworks = entry.target.querySelectorAll('.mini-artwork');
                    miniArtworks.forEach((artwork, index) => {
                        setTimeout(() => {
                            artwork.style.opacity = '1';
                            artwork.style.transform = 'scale(1) translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });

        milestones.forEach(milestone => {
            milestone.style.opacity = '0';
            milestone.style.transform = 'translateX(50px)';
            milestone.style.transition = 'all 0.6s ease-out';
            
            // Set initial state for mini artworks
            const miniArtworks = milestone.querySelectorAll('.mini-artwork');
            miniArtworks.forEach(artwork => {
                artwork.style.opacity = '0';
                artwork.style.transform = 'scale(0.8) translateY(20px)';
                artwork.style.transition = 'all 0.4s ease-out';
            });
            
            observeMilestones.observe(milestone);
        });

        // Process cards animation
        const processCards = document.querySelectorAll('.process-card');
        
        const observeProcessCards = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        processCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            card.style.transition = 'all 0.6s ease-out';
            observeProcessCards.observe(card);
        });
    }

    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observeStats = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observeStats.observe(stat));
    }

    animateCounter(element) {
        const finalValue = parseInt(element.textContent);
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const updateCounter = () => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                element.textContent = finalValue;
                return;
            }
            
            element.textContent = Math.floor(currentValue);
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    }

    setupCanvasAnimation() {
        const canvasLayers = document.querySelectorAll('.canvas-layer');
        
        // Add interactive rotation based on mouse position
        const rotatingCanvas = document.querySelector('.rotating-canvas');
        if (!rotatingCanvas) return;
        
        rotatingCanvas.addEventListener('mouseenter', () => {
            canvasLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.5;
                layer.style.animationDuration = `${10 / speed}s`;
            });
        });
        
        rotatingCanvas.addEventListener('mouseleave', () => {
            canvasLayers.forEach((layer, index) => {
                // Reset to original speeds
                const originalSpeeds = ['20s', '25s', '30s'];
                layer.style.animationDuration = originalSpeeds[index];
            });
        });
        
        // Add click interaction
        canvasLayers.forEach(layer => {
            layer.addEventListener('click', () => {
                layer.style.transform += ' scale(1.2)';
                layer.style.transition = 'transform 0.3s ease-out';
                
                setTimeout(() => {
                    layer.style.transform = layer.style.transform.replace(' scale(1.2)', '');
                }, 300);
            });
        });
    }

    // Theme-aware adaptations
    updateThemeAnimations(theme) {
        const canvasLayers = document.querySelectorAll('.canvas-layer');
        const artworkCards = document.querySelectorAll('.artwork-card');
        
        switch(theme) {
            case 'creative':
                this.applyCreativeTheme(canvasLayers, artworkCards);
                break;
            case 'party':
                this.applyPartyTheme(canvasLayers, artworkCards);
                break;
            default:
                this.applyProfessionalTheme(canvasLayers, artworkCards);
        }
    }

    applyCreativeTheme(canvasLayers, artworkCards) {
        canvasLayers.forEach(layer => {
            layer.style.filter = 'hue-rotate(45deg) saturate(1.3)';
        });
        
        artworkCards.forEach(card => {
            card.style.borderColor = 'var(--accent-color)';
        });
    }

    applyPartyTheme(canvasLayers, artworkCards) {
        canvasLayers.forEach(layer => {
            layer.style.filter = 'hue-rotate(90deg) saturate(1.5) brightness(1.1)';
            layer.style.animationDuration = '10s';
        });
        
        // Add party sparkles to artwork cards
        this.addPartySparkles();
    }

    applyProfessionalTheme(canvasLayers, artworkCards) {
        canvasLayers.forEach(layer => {
            layer.style.filter = '';
            layer.style.animationDuration = '';
        });
        
        artworkCards.forEach(card => {
            card.style.borderColor = '';
        });
    }

    addPartySparkles() {
        const artworkCards = document.querySelectorAll('.artwork-card');
        
        artworkCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createSparkleEffect(card);
            });
        });
    }

    createSparkleEffect(element) {
        const sparkles = ['✨', '🌟', '💫', '⭐'];
        const sparkle = document.createElement('div');
        
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            animation: sparkleArt 1s ease-out forwards;
            z-index: 10;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // Accessibility features
    setupAccessibility() {
        const interactiveElements = document.querySelectorAll('.filter-btn, .artwork-card, .mini-artwork');
        
        interactiveElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
        
        // Add aria labels
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            const filter = button.dataset.filter;
            button.setAttribute('aria-label', `Filter artworks by ${filter}`);
        });
        
        const artworkCards = document.querySelectorAll('.artwork-card');
        artworkCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent || 'Artwork';
            card.setAttribute('aria-label', `View details for ${title}`);
        });
    }
}

// Custom CSS animations for art gallery
const artGalleryCSS = `
@keyframes sparkleArt {
    0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
    }
}

.artwork-card.story-expanded {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.mini-artwork {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.mini-artwork::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
}

.mini-artwork:hover::before {
    left: 100%;
}
`;

// Add art gallery animations to document
const artStyleSheet = document.createElement('style');
artStyleSheet.textContent = artGalleryCSS;
document.head.appendChild(artStyleSheet);

// Initialize art gallery experience when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const artGallery = new ArtGalleryExperience();
    
    // Listen for theme changes
    document.addEventListener('themeChanged', (e) => {
        artGallery.updateThemeAnimations(e.detail.theme);
    });
    
    // Setup accessibility features
    artGallery.setupAccessibility();
});

// Export for potential external use
window.ArtGalleryExperience = ArtGalleryExperience;
