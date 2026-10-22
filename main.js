(function () {
  const projects = window.PROJECTS || [];
  const caps = window.CAPABILITIES || [];
  const grid = document.getElementById("work-grid");
  const filterList = document.getElementById("filter-list");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Work grid ---------- */
  grid.innerHTML = projects.map((p) => {
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
        <a class="work-media${p.image || p.video ? "" : " is-blank"}" href="#work-${esc(p.id)}" style="aspect-ratio:${esc(p.ratio || "16 / 9")}">${media}</a>
        <div class="work-info">
          <h3 class="work-card-title">${esc(p.title)}</h3>
          ${p.summary ? `<p class="work-card-summary">${esc(p.summary)}</p>` : ""}
          <ul class="work-tags">${p.tags.map((t) => `<li><button type="button" data-filter="${esc(t)}">${esc(t)}</button></li>`).join("")}</ul>
        </div>
      </article>`;
  }).join("");

  /* ---------- Filters ---------- */
  const allTags = [...new Set(projects.flatMap((p) => p.tags))];
  if (!allTags.length) document.querySelector(".filters").hidden = true;
  filterList.innerHTML = allTags.map((t) => `<li><button type="button" data-filter="${esc(t)}">${esc(t)}</button></li>`).join("");

  let active = "all";
  function applyFilter(tag) {
    active = active === tag ? "all" : tag;
    document.querySelectorAll(".work-card").forEach((card) => {
      const show = active === "all" || card.dataset.tags.split("|").includes(active);
      card.hidden = !show;
    });
    document.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("is-active", b.dataset.filter === active));
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    e.preventDefault();
    applyFilter(btn.dataset.filter);
    if (btn.closest(".work-tags")) document.getElementById("work").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Capabilities ---------- */
  document.getElementById("cap-grid").innerHTML = caps.map((c) => `
    <div class="cap reveal">
      <h3>${esc(c.title)}</h3>
      <ul>${c.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`).join("");

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
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io ? io.observe(el) : el.classList.add("is-in"));

  /* ---------- Footer wordmark: fit to width ---------- */
  const wm = document.getElementById("wordmark");
  function fitWordmark() {
    const box = wm.parentElement;
    wm.style.fontSize = "100px";
    const ratio = box.clientWidth / wm.scrollWidth;
    wm.style.fontSize = Math.floor(100 * ratio * 0.995) + "px";
  }
  document.fonts && document.fonts.ready.then(fitWordmark);
  window.addEventListener("resize", fitWordmark);
  fitWordmark();

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => document.body.classList.remove("is-loading"), 900);
  });
  setTimeout(() => document.body.classList.remove("is-loading"), 3000); // safety
})();
