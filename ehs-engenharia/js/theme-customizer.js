(() => {
  const themeToggle = document.getElementById('themeToggle');
  const themePanel = document.getElementById('themePanel');
  const themePanelClose = document.getElementById('themePanelClose');
  const colorInputs = document.querySelectorAll('.color-input');
  const resetBtn = document.getElementById('resetTheme');

  const STORAGE_KEY = 'ehs-theme-customization';

  const defaults = {
    '--navy': '#0A2342',
    '--orange': '#FF6A13',
    '--green': '#1E9E62',
    '--bg': '#F6F8FA',
    '--hero-bg': '#0A2342',
    '--text': '#101820',
    '--header-bg': '#0A2342',
    '--section-alt-bg': '#EEF2F6',
    '--trust-bg': '#0A2342',
    '--footer-bg': '#08192f',
    '--header-text': '#FFFFFF',
    '--hero-text': '#FFFFFF',
    '--section-a-text': '#0A2342',
    '--section-b-text': '#0A2342',
    '--trust-text': '#FFFFFF',
    '--footer-text': '#FFFFFF'
  };

  const togglePanel = () => {
    themePanel.classList.toggle('active');
  };

  const closePanel = () => {
    themePanel.classList.remove('active');
  };

  const loadSavedTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const theme = JSON.parse(saved);
        Object.entries(theme).forEach(([varName, value]) => {
          document.documentElement.style.setProperty(varName, value);
          const input = document.querySelector(`input[data-var="${varName}"]`);
          if (input) input.value = value;
        });
      } catch (e) {
        console.warn('Failed to load saved theme', e);
      }
    }
  };

  const saveTheme = () => {
    const theme = {};
    colorInputs.forEach(input => {
      const varName = input.dataset.var;
      const value = input.value;
      theme[varName] = value;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  };

  const updateThemeColor = (varName, value) => {
    document.documentElement.style.setProperty(varName, value);
    saveTheme();
  };

  const resetTheme = () => {
    Object.entries(defaults).forEach(([varName, value]) => {
      document.documentElement.style.setProperty(varName, value);
      const input = document.querySelector(`input[data-var="${varName}"]`);
      if (input) input.value = value;
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  themeToggle.addEventListener('click', togglePanel);
  themePanelClose.addEventListener('click', closePanel);

  colorInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const varName = e.target.dataset.var;
      updateThemeColor(varName, e.target.value);
    });

    input.addEventListener('input', (e) => {
      const varName = e.target.dataset.var;
      document.documentElement.style.setProperty(varName, e.target.value);
    });
  });

  resetBtn.addEventListener('click', resetTheme);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  loadSavedTheme();
})();
