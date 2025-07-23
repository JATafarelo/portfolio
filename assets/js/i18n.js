// Variável global para armazenar traduções carregadas
  let translations = {};

  // Função para carregar os arquivos JSON e atualizar o texto da página
  async function loadLanguage(lang) {
    try {
      const response = await fetch(`assets/i18n/${lang}.json`);
      translations = await response.json();

      // Atualiza todos os elementos com data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });

      // Atualiza manualmente o título
      if (translations.title) {
        document.title = translations.title;
      }

      // Re-renderiza certificados na aba ativa (para atualizar alt text se necessário)
      const activeTab = document.querySelector('.tab.active');
      if (activeTab) {
        renderCertificates(activeTab.getAttribute('data-section'));
      }
    } catch (error) {
      console.error('Erro ao carregar tradução:', error);
    }
  }

  // Função para inicializar o idioma com base no localStorage ou default
  function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'pt';
    const select = document.getElementById('lang-select');

    if (select) {
      select.value = savedLang;
      select.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        loadLanguage(selectedLang);
      });
    }

    // Carrega traduções iniciais
    loadLanguage(savedLang);
  }

  // Função para renderizar certificados da seção selecionada
  async function renderCertificates(sectionKey) {
    const listContainer = document.getElementById('cert-list');
    listContainer.innerHTML = '';

    try {
      // busca o manifest gerado: array de nomes de arquivos
      const resp = await fetch(`assets/certifications/${sectionKey}/index.json`);
      const files = await resp.json();

      files.forEach(filename => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = `assets/certifications/${sectionKey}/${filename}`;
        const altKey = `diplomas.alt_${sectionKey}_${filename.replace(/\.[^.]+$/, '')}`;
        img.alt = translations[altKey] || filename.replace(/[-_]/g, ' ').replace(/\..+$/, '');
        li.appendChild(img);
        listContainer.appendChild(li);
      });
    } catch (err) {
      console.error(`Erro ao carregar manifest de ${sectionKey}:`, err);
    }
  }

  // Configura eventos após DOM carregado
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    // Renderiza primeira aba após traduções iniciais
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCertificates(tab.getAttribute('data-section'));
      });
    });
  });
