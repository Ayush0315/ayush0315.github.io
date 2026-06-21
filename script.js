const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const themeBtn = document.getElementById("themeBtn");
const themeMenu = document.getElementById("themeMenu");
const themeOptions = document.querySelectorAll(".theme-option");
const THEME_KEY = "portfolio-theme";
const VALID_THEMES = ["aurora", "sunset", "emerald", "midnight"];

function applyTheme(theme) {
  if (theme === "aurora") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }

  themeOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.themeName === theme);
  });
}

const storedTheme = localStorage.getItem(THEME_KEY);
applyTheme(VALID_THEMES.includes(storedTheme) ? storedTheme : "aurora");

function closeThemeMenu() {
  if (!themeMenu) return;
  themeMenu.classList.remove("show");
  themeBtn.setAttribute("aria-expanded", "false");
}

if (themeBtn && themeMenu) {
  themeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = themeMenu.classList.toggle("show");
    themeBtn.setAttribute("aria-expanded", String(isOpen));
  });

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const theme = option.dataset.themeName;
      applyTheme(theme);
      localStorage.setItem(THEME_KEY, theme);
      closeThemeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!themeMenu.contains(event.target) && !themeBtn.contains(event.target)) {
      closeThemeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeThemeMenu();
    }
  });
}

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - 140 && window.scrollY < sectionTop + sectionHeight - 140) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.remove("active");
    if (anchor.getAttribute("href") === `#${currentSectionId}`) {
      anchor.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((element) => {
  const delay = element.getAttribute("data-delay");

  if (delay) {
    element.style.transitionDelay = `${delay}ms`;
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => observer.observe(element));
