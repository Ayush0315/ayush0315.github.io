// Footer year
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when clicking a link (mobile UX)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Active link highlight while scrolling
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Offset for sticky navbar height
    if (window.scrollY >= sectionTop - 140 && window.scrollY < sectionTop + sectionHeight - 140) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navAnchors.forEach((a) => {
    a.classList.remove("active");
    const href = a.getAttribute("href");
    if (href === `#${currentSectionId}`) {
      a.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

/* ===========================
   Scroll Reveal Animations
   =========================== */

const revealElements = document.querySelectorAll(".reveal");

function applyInitialDelays() {
  revealElements.forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
  });
}

applyInitialDelays();

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

revealElements.forEach((el) => observer.observe(el));
