# Howell'n website

Plain static site (HTML / CSS / JS), no build tools. GitHub: `HowellnPartners/Website` (public), branch `main`, SSH remote `git@github-howelln:HowellnPartners/Website.git`.
Live address: https://howelln.com (GitHub Pages custom domain, set by the `CNAME` file; the old https://howellnpartners.github.io/Website/ address redirects there). DNS is at GoDaddy: four A records for @ (185.199.108-111.153) and www as a CNAME. Pages caches for 10 minutes, so hard-refresh (Cmd + Shift + R) to see a fresh push.

## Design direction
- Home, project and studio pages: modeled on Mouthwash.
- Full-screen panels (Capabilities): modeled on Mutual Friends.
- Font: Inter Tight (Google Fonts, weights 400 and 500).

## Decisions not to undo
- The name is always "Howell'n". Never "Howell'n Media".
- No logo image anywhere: not in the header, footer or loader (the wordmark is live text), and not in the browser tab or share preview. The tab icon is a black dot (`assets/img/favicon.svg` / `.png`, `apple-touch-icon.png`), and the share image (`og-image.jpg`) is just "Bringing vision to fruition." in white on black.
- Large headline leading is 0.95 (`--lh-display`), loosened from 0.85 on purpose.

## Site map
- `index.html` (home): loader, header (Work, Services, Instagram / Studio, Contact), hero headline (no video; the reel plays behind the Production panel and in the Studio Reel box), Selected Work grid, Capabilities panels, Get in touch, footer.
- `project.html?p=<id>`: project profile built from that project's entry in `projects.js` (title, tagline, Client / Year / Role, hero, blocks, Overview, Team, Prev / Next).
- `contact.html`: white page, "Heads turn, jaws drop…" headline and the enquiry form. The header Contact link on every page goes here. The form posts to Formspree (`data-endpoint="https://formspree.io/f/xqppbbpr"`; entries land in Brooke's Formspree account, and the `email` field is the reply-to). With `data-endpoint` empty it falls back to opening the visitor's email app addressed to designs@howellnmedia.com.
- `studio.html`: intro paragraph, Information (Contact, Capabilities, Industries, Platforms, Clients), Approach.

## Where to edit
Almost everything lives in `projects.js`:
- `window.PROJECTS` (array order = home grid order and Prev / Next): Sincerely YAS, Premier Asset Partners, MADRUN, BLANK, Dazzling Doggie Duvet (cut from Website Figma node 4-2646; also opened from the Strategy panel), plus good days (hideFromWork: true, so it is only reached from the Brand & Design panel). good days is cut from the "Good Days" frame (node 4-2417) in the Website Figma file, not the portfolio. Block types are documented at the top of the file. Projects copied from Brooke's portfolio (brookerogersdesign.com, local `../../Portfolio Site/site/cases.js`) use `layout: "case"`, `hero: false` and the portfolio block types (bleed, image, pair, trio, lead, red, panel, screens, swatches, clip, slide, patterns, motion, pack) so they match the portfolio; the top title and Client / Year / Role stay in this site's layout. All four use `square: true` (no rounded corners).
- `window.CAPABILITIES`: the 6 Capabilities panels. Backgrounds are 1920x1080 exports of the frames in the "Website" Figma file (Homepage page), saved in `assets/services/`. A panel with `link` opens that project when clicked (Brand & Design → good days); a full https:// link opens in a new tab with "Visit site" (Digital & Web → uncensored-health.com, Social & Content → mybiomefit.com, Marketing → fieldofmemoriesbook.com, Strategy → Dazzling Doggie Duvet). `hover` is the round badge (Figma "Hover Over Section" frames, saved in `assets/services/hover/`) that follows the mouse on desktop. `mobileImage` is the phone version (1016x2340 frames on the Figma Homepage page, saved as `*-mobile.jpg`); Production plays the reel (`video`).
- `window.STUDIO`: the 4 Our Studio panels. Not shown anywhere since Our Studio was removed from the home page; kept in case it comes back.
Images go in `assets/work/` (one folder per project), `assets/services/`, `assets/studio/`. Styles in `styles.css`, behavior in `main.js` and `project.js`.

## Next up
- Add more projects as Brooke sends them (copy a block in `projects.js`).
- Decide what happens to howellnmedia.com (point it at howelln.com?).

## Working on it
- Preview: `python3 -m http.server 8000`, then open http://localhost:8000.
- Show changes in the browser before pushing; push to `main` to publish.
- Speed: every `<video>` uses `data-lazy` + `preload="none"` (no `autoplay`); main.js starts it when it scrolls near and pauses it off screen. Keep new videos the same way. Hover badges use `loading="lazy"`. Don't recompress photos to save bytes: Brooke wants full image quality.
- After changing CSS or JS, bump the `?v=N` on the `styles.css` / `*.js` links in all three HTML files, or browsers keep the old copy.
- The repo is public: no passwords, keys or private client info. Public contact email only (designs@howellnmedia.com).
- The older folder `../site` is a separate, earlier build with no GitHub remote. Don't edit it for this site.
