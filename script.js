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

  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const navAnchors = document.querySelectorAll("#navLinks a");
const pages = document.querySelectorAll(".page[id]");

document.body.classList.add("tabs-enabled");

function showPage(pageId, updateHash = true) {
  const targetPage = document.getElementById(pageId);

  if (!targetPage) {
    return;
  }

  pages.forEach((page) => {
    page.classList.toggle("show", page.id === pageId);
  });

  navAnchors.forEach((anchor) => {
    const isActive = anchor.getAttribute("href") === `#${pageId}`;
    anchor.classList.toggle("active", isActive);
  });

  targetPage.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("in-view");
  });

  if (updateHash) {
    history.replaceState(null, "", `#${pageId}`);
  }
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const pageId = anchor.getAttribute("href").slice(1);
    event.preventDefault();
    showPage(pageId);
  });
});

const initialPage = window.location.hash ? window.location.hash.slice(1) : "about";
showPage(document.getElementById(initialPage) ? initialPage : "about", false);

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
