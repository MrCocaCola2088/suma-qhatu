const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const links = document.getElementById("links");
const langBtn = document.getElementById("lang");
const wa = document.getElementById("wa");
const form = document.getElementById("form");

const messages = {
  es: "Hola Suma Qhatu, quiero una copia del proyecto y sumarme a la alianza.",
  en: "Hello Suma Qhatu, I would like a copy of the project and to join the alliance."
};

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", open ? "true" : "false");
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }
});

function apply(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-es]").forEach((el) => {
    el.innerHTML = el.dataset[lang] || el.dataset.es;
  });
  document.querySelectorAll("[data-es-placeholder]").forEach((el) => {
    el.placeholder = lang === "en" ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
  });
  langBtn.textContent = lang === "es" ? "EN" : "ES";
  langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  wa.href = `https://wa.me/59173108083?text=${encodeURIComponent(messages[lang])}`;
  localStorage.setItem("sq-lang", lang);
}

langBtn.addEventListener("click", () => {
  apply(document.documentElement.lang === "es" ? "en" : "es");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const lang = document.documentElement.lang === "en" ? "en" : "es";
  const rol = form.querySelector("#rol").selectedOptions[0];
  const rolText = lang === "en" ? rol.dataset.en : rol.dataset.es;
  const text = lang === "en"
    ? `Hello Suma Qhatu. I am ${data.get("nombre")}${data.get("org") ? " from " + data.get("org") : ""}. I want to join as: ${rolText}. ${data.get("mensaje") || messages.en}`
    : `Hola Suma Qhatu. Soy ${data.get("nombre")}${data.get("org") ? ", de " + data.get("org") : ""}. Quiero sumarme como: ${rolText}. ${data.get("mensaje") || messages.es}`;
  window.open(`https://wa.me/59173108083?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

apply(localStorage.getItem("sq-lang") || "es");
