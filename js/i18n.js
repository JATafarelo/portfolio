async function loadLanguage(lang) {
  try {
    const res = await fetch(`assets/i18n/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) el.innerText = translations[key];
    });

    localStorage.setItem("lang", lang);
  } catch (e) {
    console.error("Erro ao carregar idioma:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "pt";
  loadLanguage(lang);

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.dataset.lang;
      loadLanguage(selectedLang);
    });
  });
});
