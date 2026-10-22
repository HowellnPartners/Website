# Howell'n Media — website

Static site (HTML / CSS / JS, no build step), ready for GitHub Pages.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page structure and copy |
| `styles.css` | All styling |
| `projects.js` | **Edit this** to add work and update capabilities |
| `main.js` | Grid, filters, copy-email, animations |
| `assets/img/` | Logos, favicon, social share image |
| `assets/work/` | Put project covers here |

## Adding a project

1. Export the cover from Figma (2400px wide JPG or WebP keeps it sharp but light).
2. Save it to `assets/work/`, e.g. `assets/work/night-owl.jpg`.
3. In `projects.js`, fill in a slot:

```js
{ id: "night-owl", title: "Night Owl", tags: ["Branding", "Website Design"],
  summary: "A moody, elevated identity for a late-night lounge.",
  image: "assets/work/night-owl.jpg", ratio: "16 / 9" },
```

Tags automatically build the filter list next to "Selected Work".
Use `video: "assets/work/clip.mp4"` for a looping cover.

## Project profiles

Every project automatically gets its own page at `project.html?p=<id>`, and the cards on the home page link to it.
The profile is built from that project's entry in `projects.js`: title + tagline, Client / Year / Role,
a hero image, then a stack of **blocks** (full image, split, grid, carousel, big statement with Read More, text),
an Overview, Team credits and Prev / Next links. The block types are documented at the top of `projects.js`.
A project with no blocks yet shows the full layout as blank slots.

Tip: keep each project's images in its own folder, e.g. `assets/work/night-owl/`.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Publish on GitHub Pages

1. Create a new repo on GitHub (e.g. `howelln-site`).
2. Push this folder:

```bash
git remote add origin https://github.com/<you>/howelln-site.git
git push -u origin main
```

3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
4. For a custom domain (e.g. howellnmedia.com), add it under Settings → Pages and point your DNS at GitHub.
