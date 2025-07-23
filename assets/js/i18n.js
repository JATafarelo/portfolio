// Função para carregar os arquivos JSON e atualizar o texto da página
async function loadLanguage(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    const translations = await response.json();

    // Percorre todos os elementos com data-i18n e atualiza seu texto
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
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

// Executa a inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initLanguage);
