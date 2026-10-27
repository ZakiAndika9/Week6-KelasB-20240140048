const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  try {
    localStorage.setItem("theme", theme);
  } catch {
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  applyTheme(isDark ? "light" : "dark");
});

themeToggle.setAttribute(
  "aria-pressed",
  String(document.documentElement.getAttribute("data-theme") === "dark")
);