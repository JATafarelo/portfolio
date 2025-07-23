async function loadLanguage(lang) {
  const res = await fetch(`assets/i18n/${lang}.json`);
  const translations = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) el.innerText = translations[key];
  });

  localStorage.setItem("lang", lang);
}

// Carrega idioma salvo ou padrão pt
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "pt";
  loadLanguage(lang);

  // Botões de troca de idioma
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => loadLanguage(btn.dataset.lang));
  });
});
