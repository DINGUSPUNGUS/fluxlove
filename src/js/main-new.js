// ✨ FLUXLOVE - Enhanced Interactive System ✨
const themes = [
    { 
        name: "professional", 
        display: "Professional", 
        icon: "", 
        description: "Clean, polished, and sophisticated",
        particles: ["", "", "", "", ""]
    },
    { 
        name: "creative", 
        display: "Creative Art", 
        icon: "", 
        description: "Vibrant, artistic, and inspiring",
        particles: ["", "", "", "", ""]
    },
    { 
        name: "party", 
        display: "Dance Party", 
        icon: "", 
        description: "Energetic, fun, and dynamic",
        particles: ["", "", "", "", ""]
    }
];

let currentThemeIndex = 0;
let particleContainer = null;
let cursorTrail = null;

function setTheme(index) {
    const theme = themes[index];
    document.documentElement.setAttribute('data-theme', theme.name);
    localStorage.setItem("portfolio-theme", index);
    updateThemeUI(index);
    
    // Trigger theme change animation with enhanced visual feedback
    document.body.style.setProperty('--theme-transition-active', '1');
    createThemeTransition();
    updateParticleSystem(theme);
    
    setTimeout(() => {
        document.body.style.removeProperty('--theme-transition-active');
    }, 800);
}

// 🌊 Create premium liquid theme transition effect
function createThemeTransition() {
    const existingTransition = document.querySelector('.page-transition');
    if (existingTransition) {
        existingTransition.remove();
    }
    
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    // Trigger premium animation sequence
    requestAnimationFrame(() => {
        transition.classList.add('active');
    });
    
    // Add subtle screen blur during transition
    document.body.style.filter = 'blur(1px)';
    
    // Remove transition and restore clarity
    setTimeout(() => {
        document.body.style.filter = '';
        transition.classList.remove('active');
        
        setTimeout(() => {
            transition.remove();
        }, 300);
    }, 1000);
}

// ✨ Dynamic particle system based on current theme
function updateParticleSystem(theme) {
    if (!particleContainer) {
        particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        document.body.appendChild(particleContainer);
    }
    
    // Clear existing particles
    particleContainer.innerHTML = '';
    
    // Create theme-appropriate particles
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        createParticle(theme, i);
    }
}

function createParticle(theme, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = (Math.random() * 20) + 's';
    particle.style.animationDuration = (12 + Math.random() * 8) + 's';
    
    particleContainer.appendChild(particle);
}

function updateThemeUI(index) {
    const theme = themes[index];
    const toggleBtn = document.getElementById("theme-toggle");
    
    if (toggleBtn) {
        const iconElement = toggleBtn.querySelector(".theme-icon");
        const textElement = toggleBtn.querySelector(".theme-text");
        
        if (iconElement) {
            iconElement.setAttribute('data-theme-icon', theme.icon);
        }
        
        if (textElement) {
            textElement.textContent = theme.display;
        }
        
        // Update tooltip/title
        toggleBtn.title = `Switch to ${themes[(index + 1) % themes.length].display} theme: ${themes[(index + 1) % themes.length].description}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize theme
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme !== null) {
        currentThemeIndex = parseInt(savedTheme, 10);
        if (currentThemeIndex >= themes.length) {
            currentThemeIndex = 0;
        }
    }
    setTheme(currentThemeIndex);

    // Theme toggle handler
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            setTheme(currentThemeIndex);
            createSparkles(toggleBtn);
        });
    }

    // Initialize all enhanced features
    initializeAnimations();
    initializeThemeFeatures();
    initializeFloatingElements();
    initializeCursorTrail();
    initializeSkillCards();
    
    // Add smooth scrolling for anchor links
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

// 🎨 Create premium floating geometric elements
function initializeFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';
    document.body.appendChild(floatingContainer);
    
    // Create 8 sophisticated geometric shapes
    for (let i = 0; i < 8; i++) {
        const floatingEl = document.createElement('div');
        floatingEl.className = 'floating-element';
        floatingEl.style.animationDelay = (i * 4) + 's';
        
        // Add some randomness to the animation duration for organic feel
        const duration = 20 + (Math.random() * 10);
        floatingEl.style.animationDuration = duration + 's';
        
        floatingContainer.appendChild(floatingEl);
    }
}

// 🎯 Cursor trail effect
function initializeCursorTrail() {
    cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorTrail.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        cursorTrail.classList.remove('active');
    });
    
    // Smooth trailing animation
    function updateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    updateTrail();
}

// 🃏 Enhanced skill card interactions
function initializeSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // Create card structure for 3D flip
        const content = card.innerHTML;
        card.innerHTML = `
            <div class="skill-card-inner">
                <div class="skill-card-front">
                    ${content}
                </div>
                <div class="skill-card-back">
                    <h3>Discover More</h3>
                    <p>Click to explore this amazing skill area!</p>
                    <div class="skill-preview">Professional excellence showcased here</div>
                </div>
            </div>
        `;
        
        // Add click handler for navigation
        const skillLink = card.querySelector('.skill-link');
        if (skillLink) {
            card.addEventListener('click', (e) => {
                if (e.target !== skillLink) {
                    skillLink.click();
                }
            });
        }
    });
}

// ✨ Create sparkle effect for interactions
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            animation: sparkleExplode 0.8s ease-out forwards;
        `;
        
        const angle = (360 / sparkleCount) * i;
        const distance = 50 + Math.random() * 30;
        
        sparkle.style.setProperty('--angle', angle + 'deg');
        sparkle.style.setProperty('--distance', distance + 'px');
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 800);
    }
    
    // Add sparkle animation keyframes if not present
    if (!document.querySelector('#sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.textContent = `
            @keyframes sparkleExplode {
                0% {
                    transform: scale(1) translate(0, 0);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) translate(
                        calc(cos(var(--angle)) * var(--distance)),
                        calc(sin(var(--angle)) * var(--distance))
                    );
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeAnimations() {
    // Enhanced Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add theme-specific animation classes
                const currentTheme = themes[currentThemeIndex].name;
                if (currentTheme === 'party') {
                    entry.target.classList.add('party-entrance');
                } else if (currentTheme === 'creative') {
                    entry.target.classList.add('creative-entrance');
                }
            }
        });
    }, observerOptions);

    // Observe various elements
    const elementsToObserve = [
        '.skill-card',
        '.category-card',
        '.featured-item',
        '.stats-item',
        '.achievement-card'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });
}

function initializeThemeFeatures() {
    // Enhanced professional interactions
    addProfessionalInteractions();
}

function addProfessionalInteractions() {
    // Enhanced hover effects for professional theme
    document.querySelectorAll('.skill-card, .category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Keyboard shortcuts for theme switching
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + T to cycle themes
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        setTheme(currentThemeIndex);
    }
    
    // Number keys 1-3 for direct theme selection
    if (e.key >= '1' && e.key <= '3' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const themeIndex = parseInt(e.key) - 1;
        if (themeIndex < themes.length) {
            currentThemeIndex = themeIndex;
            setTheme(currentThemeIndex);
        }
    }
});

// Export theme functions for external use
window.fluxloveThemes = {
    setTheme,
    getCurrentTheme: () => themes[currentThemeIndex],
    getThemes: () => themes,
    nextTheme: () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        setTheme(currentThemeIndex);
    }
};

// Mobile Navigation Handling
function initializeMobileNavigation() {
    // Create hamburger menu button if it doesn't exist
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu && !document.querySelector('.hamburger-menu')) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert hamburger before theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            navContainer.insertBefore(hamburger, themeToggle);
        }
        
        // Handle hamburger click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Initialize mobile navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileNavigation);
} else {
    initializeMobileNavigation();
}
