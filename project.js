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
      </section>`,

    /* Case-study blocks, matching the portfolio case layout (see projects.js) */
    bleed: (b) => `<figure class="cs-bleed"><img src="${esc(b.image)}" alt="${esc(p.title)}" loading="lazy"></figure>`,

    image: (b) => `<figure class="cs-full"><img src="${esc(b.image)}" alt="${esc(p.title)}" loading="lazy"></figure>`,

    pair: (b) => `<div class="cs-pair">${(b.items || []).map((s) => `<figure><img src="${esc(s)}" alt="${esc(p.title)}" loading="lazy"></figure>`).join("")}</div>`,

    trio: (b) => `<div class="cs-trio">${(b.items || []).map((s) => `<img src="${esc(s)}" alt="${esc(p.title)}" loading="lazy">`).join("")}</div>`,

    lead: (b) => `<p class="cs-statement"><span class="lead">${esc(b.lead)}</span> ${esc(b.text)}</p>`,

    motion: (b) => `<div class="cs-motion">
        <video autoplay loop muted playsinline preload="metadata"><source src="${esc(b.video)}" type="video/mp4"></video>
        <div class="mo-copy">
          ${b.lineArt ? `<img class="mo-line" src="${esc(b.lineArt)}" alt="${esc(b.line || "")}">` : b.line ? `<p class="mo-line">${esc(b.line)}</p>` : ""}
          ${b.mark ? `<img class="mo-mark" src="${esc(b.mark)}" alt="" loading="lazy">` : ""}
        </div>
      </div>`,

    // colour panel with the piece inset
    panel: (b) => `<div class="cs-panel" style="background:${esc(b.bg || "#3F1516")}"><img src="${esc(b.image)}" alt="${esc(p.title)}" loading="lazy"></div>`,

    // a row of screens on a panel; any number, wraps
    screens: (b) => `<div class="cs-screens" style="--screens-n:${(b.items || []).length}${b.bg ? `;--screens-bg:${esc(b.bg)}` : ""}">${(b.items || []).map((s) => `<img src="${esc(s)}" alt="${esc(p.title)} screen" loading="lazy">`).join("")}</div>`,

    // colour swatches; hover unfolds shades/tints and the breakdown
    swatches: (b) => `<div class="cs-swatches">${(b.items || []).map((c) => {
      const h = c.hex.replace("#", "");
      const rgb = [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
      const lum = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      const mix = (t) => `rgb(${rgb.map((v) => Math.round(v + ((t < 0 ? 0 : 255) - v) * Math.abs(t))).join(",")})`;
      const steps = [-0.45, -0.22, 0, 0.22, 0.45].map((t, i) => `<i style="background:${t === 0 ? esc(c.hex) : mix(t)};transition-delay:${i * 45}ms"></i>`).join("");
      return `<div class="cs-swatch${lum > 0.55 ? " on-light" : ""}" style="background:${esc(c.hex)}" tabindex="0">
          <div class="sw-steps">${steps}</div>
          ${c.ref ? `<span class="sw-ref"><img src="${esc(c.ref)}" alt="${esc(c.name)} reference" loading="lazy"></span>` : ""}
          <div class="sw-info">
            <span class="sw-name">${esc(c.name)}</span>
            <span class="sw-val">${esc(c.hex.toUpperCase())}</span>
            <span class="sw-val">RGB ${rgb.join(" ")}</span>
            ${c.cmyk ? `<span class="sw-val">CMYK ${esc(c.cmyk)}</span>` : ""}
          </div>
        </div>`;
    }).join("")}</div>`,

    // screens framed in a brand-colour panel (red by default); video or image
    red: (b) => `<div class="cs-red"${b.bg ? ` style="background:${esc(b.bg)}"` : ""}>${b.video
        ? `<video autoplay loop muted playsinline preload="metadata"${b.poster ? ` poster="${esc(b.poster)}"` : ""}><source src="${esc(b.video)}" type="video/mp4"></video>`
        : `<img src="${esc(b.image)}" alt="${esc(p.title)}" loading="lazy">`}</div>`,

    // a tinted clip with the mark held still on top
    clip: (b) => `<div class="cs-clip"${b.ratio ? ` style="aspect-ratio:${esc(b.ratio)}"` : ""}>
        <video autoplay loop muted playsinline preload="metadata"${b.poster ? ` poster="${esc(b.poster)}"` : ""}><source src="${esc(b.video)}" type="video/mp4"></video>
        ${b.mark ? `<img class="cl-mark" src="${esc(b.mark)}" alt="${esc(p.title)}"${b.markW ? ` style="width:${esc(b.markW)}"` : ""}>` : ""}
      </div>`,

    // a row that never stops and can be dragged; two identical halves shifted 50% loop seamlessly
    slide: (b) => {
      const one = (b.items || []).map((s) => `<img src="${esc(s)}" alt="${esc(p.title)} social post" loading="lazy" draggable="false">`).join("");
      return `<div class="cs-slide" data-slide${b.dur ? ` style="--sl-dur:${esc(b.dur)}"` : ""}><div class="sl-track">${one}${one}</div></div>`;
    },

    // a grid where every cell cycles the same colourways, each starting on a different one
    patterns: (b) => {
      const items = b.items || [];
      const n = items.length, each = b.each || 2.2;
      const slot = 100 / n, fade = Math.min(2.4, slot * 0.22), kf = `cs-pat-${n}`;
      return `<style>@keyframes ${kf}{0%{opacity:0}${fade.toFixed(3)}%{opacity:1}${(slot - fade).toFixed(3)}%{opacity:1}${slot.toFixed(3)}%{opacity:0}100%{opacity:0}}</style>
        <div class="cs-patterns" style="--pt-dur:${(n * each).toFixed(2)}s${b.ratio ? `;--pt-ratio:${esc(b.ratio)}` : ""}">
          ${items.map((_, cell) => `<div class="pt-cell">${items.map((src, i) => `<img src="${esc(src)}" alt="${i === 0 ? esc(p.title) + " pattern" : ""}"${i === 0 ? "" : ' aria-hidden="true"'} loading="lazy" style="animation-name:${kf};animation-delay:${(((i + cell) % n) * each).toFixed(2)}s">`).join("")}</div>`).join("")}
        </div>`;
    },

    pack: (b) => `<div class="cs-pack">
        <img class="pk-label" src="${esc(b.label)}" alt="${esc(p.title)} label artwork" loading="lazy">
        <div class="pk-bot">
          <img class="bo-head" src="${esc(b.head)}" alt="${esc(b.heading || "")}">
          <img class="bo-bottle" src="${esc(b.bottle)}" alt="${esc(p.title)} bottle" loading="lazy">
          ${(b.notes || []).map((n) => `<span class="bo-note" style="--x:${esc(n.x)};--y:${esc(n.y)};--w:${esc(n.w)};--r:${esc(n.r)}">${esc(n.t)}</span>`).join("")}
        </div>
      </div>`
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

    ${p.hero === false ? "" : `<div class="project-hero">${media(p.hero || { image: p.image, video: p.video }, (p.hero && p.hero.ratio) || "16 / 9", "Hero")}</div>`}

    <div class="project-blocks${p.layout === "case" ? " is-case" : ""}${p.square ? " is-square" : ""}">${blocks.map((b) => (render[b.type] || render.full)(b)).join("")}</div>

    ${p.layout === "case" && !(p.overview && p.overview.length) ? "" : `<section class="project-overview reveal">
      <h2 class="section-title">Overview</h2>
      <div class="project-overview-body">${overview.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
    </section>`}

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

  /* ---------- Slide rows: drag to scrub, then carry on from where you let go ---------- */
  let drag = null;
  const half = (track) => track.scrollWidth / 2;
  const currentX = (track) => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
  root.addEventListener("pointerdown", (e) => {
    const slide = e.target.closest("[data-slide]");
    if (!slide) return;
    const track = slide.querySelector(".sl-track");
    const x = currentX(track);
    track.style.animation = "none";
    track.style.transform = `translate3d(${x}px,0,0)`;
    drag = { slide, track, startX: e.clientX, baseX: x };
    slide.classList.add("is-dragging");
    slide.setPointerCapture(e.pointerId);
  });
  document.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const h = half(drag.track);
    let x = drag.baseX + e.clientX - drag.startX;
    while (x > 0) x -= h; // keep inside one half so the seam never shows
    while (x < -h) x += h;
    drag.track.style.transform = `translate3d(${x}px,0,0)`;
  });
  const release = () => {
    if (!drag) return;
    const { track, slide } = drag;
    const h = half(track);
    const progress = h ? ((-currentX(track) % h) + h) % h / h : 0;
    const dur = parseFloat(getComputedStyle(slide).getPropertyValue("--sl-dur")) || 46;
    track.style.transform = "";
    track.style.animation = "";
    track.style.animationDelay = `${-progress * dur}s`;
    slide.classList.remove("is-dragging");
    drag = null;
  };
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);
})();
