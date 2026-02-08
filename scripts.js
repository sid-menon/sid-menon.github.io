const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

elements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 0.08}s`;
  observer.observe(element);
});

const themeToggles = document.querySelectorAll(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("theme");
const isDark = storedTheme ? storedTheme === "dark" : prefersDark;

document.body.classList.toggle("dark", isDark);

const updateToggleLabel = (darkMode) => {
  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", darkMode ? "true" : "false");
  });
};

updateToggleLabel(isDark);

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const nextIsDark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    updateToggleLabel(nextIsDark);
  });
});
