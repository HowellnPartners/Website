# Howell'n website

Plain static site (HTML / CSS / JS), no build tools. GitHub: `HowellnPartners/Website` (public), branch `main`, SSH remote `git@github-howelln:HowellnPartners/Website.git`.
Live address: not confirmed yet (no CNAME in the repo; check GitHub Pages settings).

## Design direction
- Home, project and studio pages: modeled on Mouthwash.
- Full-screen panels (Capabilities): modeled on Mutual Friends.
- Font: Inter Tight (Google Fonts, weights 400 and 500).

## Decisions not to undo
- The name is always "Howell'n". Never "Howell'n Media".
- No logo image in the header, footer or loader. The wordmark is live text.
- Large headline leading is 0.95 (`--lh-display`), loosened from 0.85 on purpose.

## Site map
- `index.html` (home): loader, header (Work, Services, Instagram / Studio, Contact), hero, Selected Work grid with Discipline filters, Capabilities panels, Get in touch, footer.
- `project.html?p=<id>`: project profile built from that project's entry in `projects.js` (title, tagline, Client / Year / Role, hero, blocks, Overview, Team, Prev / Next).
- `studio.html`: intro paragraph, Information (Contact, Capabilities, Industries, Platforms, Clients), Approach.

## Where to edit
Almost everything lives in `projects.js`:
- `window.PROJECTS`: the 4 blank slots (`project-01` to `project-04`). Block types are documented at the top of the file.
- `window.CAPABILITIES`: the 6 Capabilities panels (images still blank).
- `window.STUDIO`: the 4 Our Studio panels. Not shown anywhere since Our Studio was removed from the home page; kept in case it comes back.
Images go in `assets/work/` (one folder per project), `assets/services/`, `assets/studio/`. Styles in `styles.css`, behavior in `main.js` and `project.js`.

## Next up
- Fill the 4 project slots from Brooke's Figma files.
- Panel photos for Capabilities, and the hero reel (`assets/work/reel.mp4`, see the comment in `index.html`).
- Move howellnmedia.com over to this site.

## Working on it
- Preview: `python3 -m http.server 8000`, then open http://localhost:8000.
- Show changes in the browser before pushing; push to `main` to publish.
- The repo is public: no passwords, keys or private client info. Public contact email only (designs@howellnmedia.com).
- The older folder `../site` is a separate, earlier build with no GitHub remote. Don't edit it for this site.
