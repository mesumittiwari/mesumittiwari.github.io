(() => {
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");
  const key = "portfolio-theme";

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem(key, theme);
  };

  button?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
})();
