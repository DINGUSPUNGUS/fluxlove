// Modern Theme Management
const themes = ["theme-light", "theme-dark", "theme-vibrant", "theme-pastel"];
let currentThemeIndex = 0;

function setTheme(index) {
    document.body.classList.remove(...themes);
    document.body.classList.add(themes[index]);
    localStorage.setItem("portfolio-theme", index);
    updateThemeIcon(index);
}

function updateThemeIcon(index) {
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
        const icons = ["🌞", "🌙", "🌈", "🎨"];
        toggleBtn.querySelector("span").textContent = icons[index];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize theme
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
        currentThemeIndex = parseInt(savedTheme, 10);
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
});

function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}
