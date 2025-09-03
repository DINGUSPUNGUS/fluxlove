/**
 * ✨ FLUXLOVE - Simplified Core for Testing ✨
 */

(function() {
    'use strict';

    console.log('🚀 FLUXLOVE Core Loading...');

    // Simple theme system
    const themes = [
        { 
            name: "professional", 
            display: "Professional", 
            colors: {
                primary: "#7c3aed",
                secondary: "#6366f1", 
                accent: "#10b981"
            }
        },
        { 
            name: "creative", 
            display: "Creative", 
            colors: {
                primary: "#ec4899",
                secondary: "#f59e0b",
                accent: "#06b6d4"
            }
        },
        { 
            name: "party", 
            display: "Energy", 
            colors: {
                primary: "#f59e0b",
                secondary: "#ef4444",
                accent: "#8b5cf6"
            }
        }
    ];

    let currentThemeIndex = 0;

    function applyTheme(index) {
        const theme = themes[index];
        if (!theme) return;

        const root = document.documentElement;
        root.setAttribute('data-theme', theme.name);
        
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        console.log('✨ Theme applied:', theme.name);
    }

    function setupThemeButton() {
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            themeButton.addEventListener('click', () => {
                currentThemeIndex = (currentThemeIndex + 1) % themes.length;
                applyTheme(currentThemeIndex);
                
                const theme = themes[currentThemeIndex];
                const themeText = themeButton.querySelector('.theme-text');
                if (themeText) {
                    themeText.textContent = theme.display;
                }
            });
            console.log('✅ Theme button setup complete');
        }
    }

    function initialize() {
        console.log('🎯 Initializing FLUXLOVE...');
        
        applyTheme(currentThemeIndex);
        setupThemeButton();
        
        console.log('✅ FLUXLOVE initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
