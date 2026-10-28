(function () {
  const projects = window.PROJECTS || [];
  const caps = window.CAPABILITIES || [];
  const grid = document.getElementById("work-grid");
  const filterList = document.getElementById("filter-list");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Work grid (home) ---------- */
  if (grid) {
    grid.innerHTML = projects.filter((p) => !p.hideFromWork).map((p) => {
      const url = `project.html?p=${encodeURIComponent(p.id)}`;
      let media;
      if (p.video) {
        media = `<video src="${esc(p.video)}" autoplay muted loop playsinline ${p.image ? `poster="${esc(p.image)}"` : ""}></video>`;
      } else if (p.image) {
        media = `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`;
      } else {
        media = `<div class="work-placeholder"><span>${esc(p.title)}</span></div>`;
      }
      return `
        <article class="work-card reveal" id="work-${esc(p.id)}" data-tags="${esc(p.tags.join("|"))}">
          <a class="work-media${p.image || p.video ? "" : " is-blank"}" href="${url}" style="aspect-ratio:${esc(p.ratio || "16 / 9")}">${media}${p.mark ? `<img class="work-mark" src="${esc(p.mark)}" alt="" aria-hidden="true">` : ""}</a>
          <div class="work-info">
            <h3 class="work-card-title"><a href="${url}">${esc(p.title)}</a></h3>
            ${p.summary ? `<p class="work-card-summary">${esc(p.summary)}</p>` : ""}
            <ul class="work-tags">${p.tags.map((t) => `<li>${filterList ? `<button type="button" data-filter="${esc(t)}">${esc(t)}</button>` : esc(t)}</li>`).join("")}</ul>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- Filters (home) ---------- */
  if (filterList) {
    const allTags = [...new Set(projects.flatMap((p) => p.tags))];
    if (!allTags.length) document.querySelector(".filters").hidden = true;
    filterList.innerHTML = allTags.map((t) => `<li><button type="button" data-filter="${esc(t)}">${esc(t)}</button></li>`).join("");

    let active = "all";
    const applyFilter = (tag) => {
      active = active === tag ? "all" : tag;
      document.querySelectorAll(".work-card").forEach((card) => {
        card.hidden = !(active === "all" || card.dataset.tags.split("|").includes(active));
      });
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("is-active", b.dataset.filter === active));
    };
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      e.preventDefault();
      applyFilter(btn.dataset.filter);
      if (btn.closest(".work-tags")) document.getElementById("work").scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- Panel stacks (full-screen panels that stack on scroll) ----------
     data-studio-stack="studio"        -> window.STUDIO
     data-studio-stack="capabilities"  -> window.CAPABILITIES (items become the detail line) */
  document.querySelectorAll("[data-studio-stack]").forEach((stack) => {
    const source = stack.dataset.studioStack || "studio";
    const list = (source === "capabilities" ? caps : window.STUDIO || []).map((s) => ({
      ...s,
      text: s.text || (s.items || []).join(" · ")
    }));
    const label = stack.dataset.label || "Our Studio";
    stack.innerHTML = list.map((s, i) => `
      <section class="ss-panel${s.shade ? " is-shaded" : ""}" id="${source}-${i + 1}" style="z-index:${i + 1}"${s.link ? ` data-link="${esc(s.link)}"` : ""}>
        ${s.video ? `<video class="ss-bg"${s.image ? ` poster="${esc(s.image)}"` : ""} autoplay muted loop playsinline preload="metadata" aria-hidden="true">${s.mobileVideo ? `<source src="${esc(s.mobileVideo)}" type="video/mp4" media="(max-width: 768px)">` : ""}<source src="${esc(s.video)}" type="video/mp4"></video>` : s.image ? `<picture>${s.mobileImage ? `<source media="(max-width: 768px)" srcset="${esc(s.mobileImage)}">` : ""}<img class="ss-bg" src="${esc(s.image)}" alt="" loading="lazy"></picture>` : `<div class="ss-bg ss-blank ss-tone-${(i % 4) + 1}"><span>Image ${i + 1}</span></div>`}
        ${s.hover && s.link ? `<img class="ss-cursor" src="${esc(s.hover)}" alt="" aria-hidden="true">` : ""}
        <div class="ss-inner">
          <div class="ss-label">${esc(label)}</div>
          <ul class="ss-list">
            ${list.map((t, j) => `<li><a href="#${source}-${j + 1}"${i === j ? ' class="is-active" aria-current="true"' : ""}>${esc(t.title)}</a></li>`).join("")}
          </ul>
          <div class="ss-detail">
            <p>${esc(s.text || "")}</p>
            ${s.link ? (/^https?:/.test(s.link) ? `<a class="ss-link" href="${esc(s.link)}" target="_blank" rel="noopener">Visit site</a>` : `<a class="ss-link" href="${esc(s.link)}">See project</a>`) : ""}
          </div>
        </div>
      </section>`).join("");

    // a panel with a link opens that project when you click anywhere on its image
    stack.addEventListener("click", (e) => {
      const panel = e.target.closest(".ss-panel[data-link]");
      if (!panel || e.target.closest("a")) return;
      if (/^https?:/.test(panel.dataset.link)) window.open(panel.dataset.link, "_blank", "noopener");
      else window.location.href = panel.dataset.link;
    });
  });

  /* ---------- Hover badge: follows the mouse over a linked panel (mouse only) ----------
     One position for every badge, so after a scroll the new panel's badge is already
     under the pointer. Each panel clips its own badge, so it never spills over. */
  if (document.querySelector(".ss-cursor") && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const root = document.documentElement.style;
    let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0;
    const step = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      root.setProperty("--mx", x + "px"); root.setProperty("--my", y + "px");
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(step) : 0;
    };
    addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: true });
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll(".copy-email").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (!navigator.clipboard) return; // fall back to mailto
      e.preventDefault();
      navigator.clipboard.writeText(el.dataset.email).then(() => {
        el.classList.add("is-copied");
        setTimeout(() => el.classList.remove("is-copied"), 1600);
      }, () => { window.location.href = el.href; });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const io = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px 0px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io ? io.observe(el) : el.classList.add("is-in"));

  /* ---------- Footer wordmark: fit to width ---------- */
  const wm = document.getElementById("wordmark");
  function fitWordmark() {
    const box = wm.parentElement;
    wm.style.fontSize = "100px";
    const ratio = box.clientWidth / wm.scrollWidth;
    wm.style.fontSize = Math.floor(100 * ratio * 0.995) + "px";
  }
  if (wm) {
    document.fonts && document.fonts.ready.then(fitWordmark);
    window.addEventListener("resize", fitWordmark);
    fitWordmark();
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Loader (home) ----------
     A short beat for the wordmark, then out of the way. It doesn't wait for
     window "load": that waits on the reel and every image, which took ~3s live. */
  if (document.body.classList.contains("is-loading")) {
    setTimeout(() => document.body.classList.remove("is-loading"), 700);
  }
})();
