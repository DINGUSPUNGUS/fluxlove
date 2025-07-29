// Theme Toggle Logic
const themes = ["theme-light", "theme-dark", "theme-vibrant", "theme-pastel"];
let currentThemeIndex = 0;

function setTheme(index) {
  document.body.classList.remove(...themes);
  document.body.classList.add(themes[index]);
  localStorage.setItem("portfolio-theme", index);
}

document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    currentThemeIndex = parseInt(savedTheme, 10);
    setTheme(currentThemeIndex);
  } else {
    setTheme(0);
  }
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      setTheme(currentThemeIndex);
    });
  }

  // Modern animated accent bar and shapes
  createAnimatedAccentBar();
  createAnimatedShapes();
});


function createAnimatedAccentBar() {
  if (document.querySelector('.animated-accent-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'animated-accent-bar';
  document.body.appendChild(bar);
}

function createAnimatedShapes() {
  // Remove old shapes
  document.querySelectorAll('.animated-shape').forEach(e => e.remove());
  // Add a few subtle geometric shapes
  const shapes = [
    {top: '10%', left: '5%', size: 120, color: 'var(--primary-color)'},
    {top: '60%', left: '80%', size: 90, color: 'var(--secondary-color)'},
    {top: '80%', left: '20%', size: 60, color: 'var(--accent-color)'},
    {top: '30%', left: '60%', size: 100, color: 'var(--primary-color)'},
    {top: '50%', left: '40%', size: 70, color: 'var(--secondary-color)'}
  ];
  for (const s of shapes) {
    const el = document.createElement('div');
    el.className = 'animated-shape';
    el.style.top = s.top;
    el.style.left = s.left;
    el.style.width = el.style.height = s.size + 'px';
    el.style.background = `linear-gradient(135deg, ${getComputedStyle(document.body).getPropertyValue(s.color)}, transparent 80%)`;
    document.body.appendChild(el);
  }
}