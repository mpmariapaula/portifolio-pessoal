const root = document.body;
const status = document.querySelector("#accessibilityStatus");
let fontScale = 1;

function announce(message) {
  if (status) status.textContent = message;
}
function setFontScale(scale) {
  fontScale = Math.min(1.5, Math.max(0.85, scale));
  document.documentElement.style.setProperty("--font-scale", fontScale);
  announce(`Tamanho do texto ajustado para ${Math.round(fontScale * 100)} por cento.`);
}
document.querySelector("#increaseFont").addEventListener("click", () => setFontScale(fontScale + 0.1));
document.querySelector("#decreaseFont").addEventListener("click", () => setFontScale(fontScale - 0.1));
document.querySelector("#resetFont").addEventListener("click", () => setFontScale(1));

function setTheme(theme) {
  root.classList.remove("dark-theme", "high-contrast");
  if (theme === "dark") root.classList.add("dark-theme");
  if (theme === "contrast") root.classList.add("high-contrast");
  document.querySelectorAll("[data-theme-button]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeButton === theme));
  });
  announce(theme === "dark" ? "Tema escuro ativado." : theme === "contrast" ? "Alto contraste ativado." : "Tema claro ativado.");
}
const themeButtons = [
  ["lightTheme", "light"], ["darkTheme", "dark"], ["contrastTheme", "contrast"]
];
themeButtons.forEach(([id, theme]) => {
  const button = document.getElementById(id);
  button.dataset.themeButton = theme;
  button.setAttribute("aria-pressed", String(theme === "light"));
  button.addEventListener("click", () => setTheme(theme));
});

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
}));

document.querySelector("#currentYear").textContent = new Date().getFullYear();
