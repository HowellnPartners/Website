/* Renders a project profile (project.html?p=<id>) from window.PROJECTS. */
(function () {
  const projects = window.PROJECTS || [];
  const root = document.getElementById("project");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const id = new URLSearchParams(location.search).get("p");
  const index = Math.max(0, projects.findIndex((p) => p.id === id));
  const p = projects[index];

  if (!p) {
    root.innerHTML = `<header class="project-head"><h1 class="project-title">Project not found.<br><a href="index.html#work">Back to work</a></h1></header>`;
    return;
  }

  document.title = `${p.title} — Howell'n`;

  /* Used when a project has no blocks yet: shows the full layout as blank slots. */
  const DEFAULT_BLOCKS = [
    { type: "statement", text: "The question this project set out to answer.", more: "A short paragraph expanding on the idea. Click Read More to reveal it." },
    { type: "split", items: [{ ratio: "4 / 5" }, { ratio: "4 / 5" }], title: "A line about these two images.", label: "Section label" },
    { type: "full", ratio: "16 / 9", title: "A line about this image.", label: "Section label" },
    { type: "split", layout: "wide-left", items: [{ ratio: "4 / 3" }, { ratio: "3 / 4" }] },
    { type: "carousel", items: [{}, {}, {}, {}], ratio: "16 / 9", title: "A line about this series.", label: "Section label" },
    { type: "grid", columns: 3, items: [{}, {}, {}, {}, {}, {}], ratio: "1 / 1", title: "A line about this grid.", label: "Section label" },
    { type: "statement", text: "A closing thought on the result.", more: "" },
    { type: "full", ratio: "16 / 9" }
  ];

  /* ---------- Media helpers ---------- */
  function media(item, fallbackRatio, label) {
    item = item || {};
    const ratio = esc(item.ratio || fallbackRatio || "16 / 9");
    let inner;
    if (item.video) {
      inner = `<video src="${esc(item.video)}" autoplay muted loop playsinline ${item.image ? `poster="${esc(item.image)}"` : ""}></video>`;
    } else if (item.image) {
      inner = `<img src="${esc(item.image)}" alt="${esc(item.alt || p.title)}" loading="lazy">`;
    } else {
      inner = `<div class="work-placeholder"><span>${esc(label || "Image")}</span></div>`;
    }
    const blank = item.image || item.video ? "" : " is-blank";
    return `<figure class="pm${blank}" style="aspect-ratio:${ratio}">${inner}</figure>`;
  }

  function caption(b) {
    if (!b.title && !b.label) return "";
    return `<figcaption class="p-caption"><span>${esc(b.title || "")}</span><span class="p-caption-label">${esc(b.label || "")}</span></figcaption>`;
  }

  /* ---------- Blocks ---------- */
  const render = {
    full: (b) => `<section class="pb pb-full reveal">${media(b, b.ratio)}${caption(b)}</section>`,

    split: (b) => {
      const items = b.items || [{}, {}];
      return `<section class="pb pb-split ${esc(b.layout || "")} reveal">
        <div class="pb-split-row">${items.map((it, i) => media(it, b.ratio, `Image ${i + 1}`)).join("")}</div>
        ${caption(b)}</section>`;
    },

    grid: (b) => {
      const items = b.items || [];
      return `<section class="pb pb-grid reveal">
        <div class="pb-grid-row" style="--cols:${Number(b.columns) || 3}">${items.map((it, i) => media(it, b.ratio || "1 / 1", `Image ${i + 1}`)).join("")}</div>
        ${caption(b)}</section>`;
    },

    carousel: (b) => {
      const items = b.items || [];
      return `<section class="pb pb-carousel reveal" data-carousel>
        <div class="pb-carousel-track">${items.map((it, i) => `<div class="pb-slide">${media(it, b.ratio, `Slide ${i + 1}`)}</div>`).join("")}</div>
        <div class="pb-carousel-ui">
          <button type="button" class="pb-prev" aria-label="Previous">Prev</button>
          <span class="pb-count">Page <span data-cur>1</span> of ${items.length}</span>
          <button type="button" class="pb-next" aria-label="Next">Next</button>
        </div>
        ${caption(b)}</section>`;
    },

    statement: (b) => `<section class="pb pb-statement reveal">
        <h2>${esc(b.text)}</h2>
        ${b.more ? `<button type="button" class="pb-more">Read More</button><div class="pb-more-text" hidden><p>${esc(b.more)}</p></div>` : ""}
      </section>`,

    text: (b) => `<section class="pb pb-text reveal">
        ${b.heading ? `<h2>${esc(b.heading)}</h2>` : "<span></span>"}
        <div>${(b.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
      </section>`
  };

  const blocks = p.blocks && p.blocks.length ? p.blocks : DEFAULT_BLOCKS;
  const roles = p.tags && p.tags.length ? p.tags : ["Role"];
  const overview = p.overview && p.overview.length ? p.overview : ["Project overview goes here: the challenge, the approach, and the result."];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  root.innerHTML = `
    <header class="project-head">
      <h1 class="project-title">${esc(p.title)},<br>${esc(p.tagline || "A one-line description of the project.")}</h1>
      <dl class="project-meta">
        <div><dt>Client:</dt><dd>${esc(p.client || p.title)}</dd></div>
        <div><dt>Year:</dt><dd>${esc(p.year || new Date().getFullYear())}</dd></div>
        <div><dt>Role:</dt><dd>${roles.map(esc).join("<br>")}</dd></div>
      </dl>
    </header>

    <div class="project-hero">${media(p.hero || { image: p.image, video: p.video }, (p.hero && p.hero.ratio) || "16 / 9", "Hero")}</div>

    <div class="project-blocks">${blocks.map((b) => (render[b.type] || render.full)(b)).join("")}</div>

    <section class="project-overview reveal">
      <h2 class="section-title">Overview</h2>
      <div class="project-overview-body">${overview.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
    </section>

    <section class="project-team reveal">
      <h2>Team</h2>
      <dl>${(p.team && p.team.length ? p.team : [{ role: "Creative Direction, Strategy, Design", name: "Howell'n" }])
        .map((t) => `<div><dt>${esc(t.role)}:</dt><dd>${esc(t.name)}</dd></div>`).join("")}</dl>
    </section>

    <nav class="project-pager" aria-label="More projects">
      <a href="project.html?p=${esc(prev.id)}"><span>Prev:</span> ${esc(prev.title)}</a>
      <a href="project.html?p=${esc(next.id)}"><span>Next:</span> ${esc(next.title)}</a>
    </nav>`;

  /* ---------- Read More ---------- */
  root.querySelectorAll(".pb-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const txt = btn.nextElementSibling;
      txt.hidden = !txt.hidden;
      btn.textContent = txt.hidden ? "Read More" : "Read Less";
    });
  });

  /* ---------- Carousels ---------- */
  root.querySelectorAll("[data-carousel]").forEach((c) => {
    const track = c.querySelector(".pb-carousel-track");
    const cur = c.querySelector("[data-cur]");
    const total = track.children.length;
    let i = 0;
    let lockUntil = 0; // ignore scroll events while a button-driven scroll animates
    const go = (n) => {
      i = (n + total) % total;
      lockUntil = Date.now() + 700;
      track.scrollTo({ left: track.children[i].offsetLeft - track.offsetLeft, behavior: "smooth" });
      cur.textContent = i + 1;
    };
    c.querySelector(".pb-prev").addEventListener("click", () => go(i - 1));
    c.querySelector(".pb-next").addEventListener("click", () => go(i + 1));
    track.addEventListener("click", () => go(i + 1));
    track.addEventListener("scroll", () => {
      if (Date.now() < lockUntil) return;
      const n = Math.round(track.scrollLeft / track.clientWidth);
      if (n !== i) { i = n; cur.textContent = i + 1; }
    }, { passive: true });
  });
})();
