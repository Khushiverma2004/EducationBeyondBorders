const introLoader = document.getElementById("introLoader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
const revealTargets = document.querySelectorAll(
  ".hero__content, .about, .section-heading, .card, .stat-item, .cta, .footer"
);

revealTargets.forEach((element) => {
  element.setAttribute("data-reveal", "");
});

window.addEventListener("load", () => {
  if (!introLoader) {
    return;
  }

  setTimeout(() => {
    introLoader.classList.add("is-hidden");
  }, 1400);
});

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
  });
});

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
    threshold: 0.16,
  }
);

revealTargets.forEach((element) => observer.observe(element));
