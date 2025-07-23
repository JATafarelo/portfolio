// Função para carregar os arquivos JSON e atualizar o texto da página
async function loadLanguage(lang) {
  try {
    const response = await fetch(`assets/i18n/${lang}.json`);
    const translations = await response.json();

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

  loadLanguage(savedLang);
}

// Função para renderizar certificados da seção selecionada
  function renderCertificates(sectionKey) {
    const listContainer = document.getElementById('cert-list');
    listContainer.innerHTML = '';

    // Busca array no objeto translations carregado
    const items = translations[`diplomas.list_${sectionKey}`] || [];
    items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      listContainer.appendChild(li);
    });
  }

  // Após inicializar idioma, dispara renderização das abas
  document.addEventListener('DOMContentLoaded', () => {
    // Inicializa idioma e traduções
    initLanguage();

    // Renderiza certificados da aba ativa
    const activeKey = document.querySelector('.tab.active').getAttribute('data-section');
    renderCertificates(activeKey);

    // Adiciona eventos de clique nas abas
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCertificates(tab.getAttribute('data-section'));
      });
    });
  });

// Executa a inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initLanguage);
