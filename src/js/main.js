// Advanced Theme Management System for fluxlove Portfolio
const themes = [
    { 
        name: "professional", 
        display: "Professional", 
        icon: "💼", 
        description: "Clean, polished, and sophisticated" 
    },
    { 
        name: "creative", 
        display: "Creative Art", 
        icon: "🎨", 
        description: "Vibrant, artistic, and inspiring" 
    },
    { 
        name: "party", 
        display: "Dance Party", 
        icon: "🎉", 
        description: "Energetic, fun, and dynamic" 
    }
];

let currentThemeIndex = 0;

function setTheme(index) {
    const theme = themes[index];
    document.documentElement.setAttribute('data-theme', theme.name);
    localStorage.setItem("portfolio-theme", index);
    updateThemeUI(index);
    
    // Trigger theme change animation
    document.body.style.setProperty('--theme-transition-active', '1');
    setTimeout(() => {
        document.body.style.removeProperty('--theme-transition-active');
    }, 600);
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
        // Ensure the index is valid
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
        });
    }

    // Smooth scrolling for anchor links
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

    // Initialize animations
    initializeAnimations();
    
    // Initialize theme-specific features
    initializeThemeFeatures();
});

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
