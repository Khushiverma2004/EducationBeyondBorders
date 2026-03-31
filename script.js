const introLoader = document.getElementById("introLoader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
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

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "there";

  if (formStatus) {
    formStatus.textContent = `Thanks ${name}, your message has been recorded. We'll reach out soon.`;
  }

  contactForm.reset();
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
