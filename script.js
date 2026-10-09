const DATA = {

  experience: [
    {
      role: "Desenvolvedor Full Stack Pleno",
      company: "Empresa Atual Ltda.",
      period: "2023 — hoje",
      description: "Responsável pelo desenvolvimento de novas funcionalidades do produto principal, além de manutenção da infraestrutura e mentoria de desenvolvedores júnior.",
      stack: ["React", "Node.js", "PostgreSQL", "Docker"]
    },
    {
      role: "Desenvolvedor Full Stack Júnior",
      company: "Startup Exemplo",
      period: "2021 — 2023",
      description: "Atuação no time de produto de uma startup de e-commerce, do design de interfaces à implementação do backend das funcionalidades.",
      stack: ["JavaScript", "React", "Express", "MongoDB"]
    },
    {
      role: "Estagiário de Desenvolvimento",
      company: "Agência Digital Exemplo",
      period: "2020 — 2021",
      description: "Primeiro contato profissional com desenvolvimento web, criando landing pages e pequenos sites institucionais para clientes da agência.",
      stack: ["HTML", "CSS", "JavaScript", "WordPress"]
    },
  ],

  education: [
    { degree: "Bacharelado em Ciência da Computação", institution: "Universidade Exemplo", period: "2018 — 2022" },
    { degree: "Formação em Desenvolvimento Web Full Stack", institution: "Escola Exemplo", period: "2020" },
  ],

  languages: [
    { name: "Português", level: 5 },
    { name: "Inglês", level: 4 },
    { name: "Espanhol", level: 2 },
  ],

  emailForContactForm: "seuemail@exemplo.com",
};



function levelDots(level) {
  let dots = "";
  for (let i = 1; i <= 5; i++) {
    dots += `<span class="level-dot ${i <= level ? "filled" : ""}"></span>`;
  }
  return dots;
}


function renderExperiencePage() {
  const timeline = document.getElementById("experience-timeline");
  if (!timeline) return;

  timeline.innerHTML = DATA.experience.map((job) => `
    <div class="timeline-item">
      <span class="timeline-dot"></span>
      <div class="timeline-card">
        <span class="timeline-period">${job.period}</span>
        <p class="timeline-role">${job.role}</p>
        <p class="timeline-company">${job.company}</p>
        <p class="timeline-desc">${job.description}</p>
        <div class="timeline-stack">
          ${job.stack.map((tech) => `<span class="stack-chip">${tech}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

function renderAboutPage() {
  const eduList = document.getElementById("education-list");
  if (eduList) {
    eduList.innerHTML = DATA.education.map((e) => `
      <div class="edu-item">
        <strong>${e.degree}</strong>
        <span>${e.institution} · ${e.period}</span>
      </div>
    `).join("");
  }

  const langList = document.getElementById("languages-list");
  if (langList) {
    langList.innerHTML = DATA.languages.map((l) => `
      <div class="lang-item">
        <strong>${l.name}</strong>
        <span class="level-dots">${levelDots(l.level)}</span>
      </div>
    `).join("");
  }
}


function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const hint = document.getElementById("form-hint");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${DATA.emailForContactForm}?subject=${subject}&body=${body}`;

    hint.textContent = "Abrindo seu aplicativo de e-mail para enviar a mensagem…";
  });
}


function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const root = document.documentElement;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    btn.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
    btn.setAttribute("title", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
  }

  apply(root.getAttribute("data-theme") || "dark");

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}


document.addEventListener("DOMContentLoaded", () => {
  renderExperiencePage();
  renderAboutPage();
  setupContactForm();
  setupThemeToggle();
});