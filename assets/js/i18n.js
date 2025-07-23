let translations = {};

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`assets/i18n/${lang}.json`);
      translations = await response.json();

      // Atualiza textos estáticos
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });

      if (translations.title) document.title = translations.title;

      // Após atualizar traduções, renderiza certificados
      const active = document.querySelector('.tab.active').getAttribute('data-section');
      renderCertificates(active);
    } catch (error) {
      console.error('Erro ao carregar tradução:', error);
    }
  }

  function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'pt';
    const select = document.getElementById('lang-select');
    if (select) {
      select.value = savedLang;
      select.addEventListener('change', e => {
        localStorage.setItem('language', e.target.value);
        loadLanguage(e.target.value);
      });
    }
    loadLanguage(savedLang);
  }

  function renderCertificates(sectionKey) {
    const list = document.getElementById('cert-list');
    list.innerHTML = '';

    // Usa arrays do translations em vez de fetch de pasta
    const files = translations[`diplomas.list_${sectionKey}`] || [];
    files.forEach(filename => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = `assets/certifications/${sectionKey}/${filename}`;
      const altKey = `diplomas.alt_${sectionKey}_${filename.replace(/\.[^.]+$/, '')}`;
      img.alt = translations[altKey] || filename.replace(/[-_]/g, ' ').replace(/\..+$/, '');
      li.appendChild(img);
      list.appendChild(li);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCertificates(tab.getAttribute('data-section'));
      });
    });
  });
