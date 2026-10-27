# Howell'n website

Plain static site (HTML / CSS / JS), no build tools. GitHub: `HowellnPartners/Website` (public), branch `main`, SSH remote `git@github-howelln:HowellnPartners/Website.git`.
Live address: https://howellnpartners.github.io/Website/ (GitHub Pages, no custom domain yet). Pages caches for 10 minutes, so hard-refresh (Cmd + Shift + R) to see a fresh push.

## Design direction
- Home, project and studio pages: modeled on Mouthwash.
- Full-screen panels (Capabilities): modeled on Mutual Friends.
- Font: Inter Tight (Google Fonts, weights 400 and 500).

## Decisions not to undo
- The name is always "Howell'n". Never "Howell'n Media".
- No logo image in the header, footer or loader. The wordmark is live text.
- Large headline leading is 0.95 (`--lh-display`), loosened from 0.85 on purpose.

## Site map
- `index.html` (home): loader, header (Work, Services, Instagram / Studio, Contact), hero, Selected Work grid, Capabilities panels, Get in touch, footer.
- `project.html?p=<id>`: project profile built from that project's entry in `projects.js` (title, tagline, Client / Year / Role, hero, blocks, Overview, Team, Prev / Next).
- `studio.html`: intro paragraph, Information (Contact, Capabilities, Industries, Platforms, Clients), Approach.

## Where to edit
Almost everything lives in `projects.js`:
- `window.PROJECTS`: MADRUN, Premier Asset Partners, Sincerely YAS, then one blank slot (`project-04`). Block types are documented at the top of the file. Projects copied from Brooke's portfolio (brookerogersdesign.com, local `../../Portfolio Site/site/cases.js`) use `layout: "case"`, `hero: false` and the portfolio block types (bleed, image, pair, trio, lead, red, clip, slide, patterns, motion, pack) so they match the portfolio; the top title and Client / Year / Role stay in this site's layout.
- `window.CAPABILITIES`: the 6 Capabilities panels (images still blank).
- `window.STUDIO`: the 4 Our Studio panels. Not shown anywhere since Our Studio was removed from the home page; kept in case it comes back.
Images go in `assets/work/` (one folder per project), `assets/services/`, `assets/studio/`. Styles in `styles.css`, behavior in `main.js` and `project.js`.

## Next up
- Fill project 4.
- Panel photos for Capabilities.
- Move howellnmedia.com over to this site.

## Working on it
- Preview: `python3 -m http.server 8000`, then open http://localhost:8000.
- Show changes in the browser before pushing; push to `main` to publish.
- After changing CSS or JS, bump the `?v=N` on the `styles.css` / `*.js` links in all three HTML files, or browsers keep the old copy.
- The repo is public: no passwords, keys or private client info. Public contact email only (designs@howellnmedia.com).
- The older folder `../site` is a separate, earlier build with no GitHub remote. Don't edit it for this site.
