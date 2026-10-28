/*
  PROJECTS — edit this list to fill the Selected Work grid (one across).

  id     : short slug, used for links (#work-<id>)
  title  : project name
  tags   : disciplines, e.g. ["Branding", "Website Design"] (also build the filter list)
  summary: one line under the title (optional)
  image  : cover image, e.g. "assets/work/night-owl.jpg" ("" shows a blank slot)
  video  : optional looping cover video, e.g. "assets/work/night-owl.mp4"
  ratio  : cover aspect ratio, e.g. "16 / 9" or "4 / 5"
  hideFromWork : true keeps a project off the home grid (its page still works, e.g. from a Capabilities link)

  To add a project: copy a block, change the fields, drop the image in assets/work/.

  ---------------------------------------------------------------------------
  PROJECT PROFILE (project.html?p=<id>) — all optional; blanks show placeholders
  ---------------------------------------------------------------------------
  tagline : line after the title, e.g. "A new vision for late-night dining."
  client  : client name (defaults to title)
  year    : e.g. "2026"
  hero    : { image: "...", video: "...", ratio: "16 / 9" }  (defaults to cover image)
  overview: ["Paragraph one.", "Paragraph two."]
  team    : [{ role: "Photography", name: "Jane Doe" }, ...]
  blocks  : the story, top to bottom. Mix and repeat any of these:

    { type: "full", image: "...", ratio: "16 / 9", title: "Caption line.", label: "Color Palette" }
    { type: "split", layout: "wide-left" | "wide-right" | "", items: [{ image }, { image }], title, label }
    { type: "grid", columns: 3, ratio: "1 / 1", items: [{ image }, ...], title, label }
    { type: "carousel", ratio: "16 / 9", items: [{ image }, ...], title, label }
    { type: "statement", text: "Big centered question or idea?", more: "Read More text." }
    { type: "text", heading: "Approach", paragraphs: ["...", "..."] }

  Any item can use video: "assets/work/clip.mp4" instead of image.
  Leave blocks out to see the full layout as blank slots.

  EXAMPLE
  {
    id: "night-owl", title: "Night Owl", tags: ["Branding", "Website Design"],
    image: "assets/work/night-owl/cover.jpg",
    tagline: "A moody, elevated identity for late-night dining.",
    year: "2025",
    blocks: [
      { type: "statement", text: "How do you bottle late-night energy?", more: "..." },
      { type: "full", image: "assets/work/night-owl/01.jpg", title: "The mark.", label: "Logo" },
      { type: "split", items: [{ image: "assets/work/night-owl/02.jpg" }, { image: "assets/work/night-owl/03.jpg" }] }
    ],
    overview: ["..."],
    team: [{ role: "Photography", name: "..." }]
  }
*/
window.PROJECTS = [
  {
    id: "sincerely-yas", title: "Sincerely YAS", tags: ["Web Design", "Development", "Shopify"],
    summary: "Made to be shared.",
    image: "assets/work/yas/01.jpg", ratio: "1800 / 1200",
    tagline: "Made to be shared.",
    client: "Sincerely YAS",
    year: "2026",
    // Same layout as the Sincerely YAS case on brookerogersdesign.com, but square corners
    layout: "case", hero: false, square: true,
    blocks: [
      { type: "image", image: "assets/work/yas/01.jpg" },
      { type: "lead", lead: "SINCERELY YAS", text: "is a brand built around the table — the round of drinks, the plate in the middle, the people leaning in. The site had to feel like being invited rather than sold to." },
      { type: "red", video: "assets/work/yas/homepage.mp4", poster: "assets/work/yas/poster.jpg" },
      { type: "lead", lead: "DESIGNED AND BUILT", text: "end to end on Shopify — custom coded rather than themed, so every section behaves the way it was drawn instead of the way a template allows." },
      { type: "image", image: "assets/work/yas/02.jpg" },
      { type: "pair", items: ["assets/work/yas/03.jpg", "assets/work/yas/04.jpg"] },
      { type: "red", image: "assets/work/yas/05.jpg" },
      { type: "lead", lead: "THE PRODUCT PAGES", text: "carry the same warmth as the photography — generous imagery, a clear path to checkout, and a layout that holds up whether there are three products or thirty." },
      { type: "trio", items: ["assets/work/yas/06.jpg", "assets/work/yas/07.jpg", "assets/work/yas/08.jpg"] }
    ]
  },
  {
    id: "pap", title: "Premier Asset Partners",
    tags: ["Branding", "Strategy", "Social Media", "Website Design", "Marketing Collateral"],
    summary: "Beyond the transaction.",
    video: "assets/work/pap/hero.mp4", image: "assets/work/pap/poster.jpg", mark: "assets/work/pap/seal.svg", ratio: "1600 / 844",
    tagline: "Beyond the transaction.",
    client: "Premier Asset Partners, Lake Mary, FL",
    year: "2026",
    // Same layout as the PAP case on brookerogersdesign.com, but square corners
    layout: "case", hero: false, square: true,
    blocks: [
      { type: "clip", video: "assets/work/pap/hero.mp4", poster: "assets/work/pap/poster.jpg", mark: "assets/work/pap/seal.svg", ratio: "1929 / 1187", markW: "28.8%" },
      { type: "image", image: "assets/work/pap/mark.jpg" },
      { type: "bleed", image: "assets/work/pap/stationery.jpg" },
      { type: "slide", dur: "64s", items: ["assets/work/pap/post-1.jpg", "assets/work/pap/post-2.jpg", "assets/work/pap/post-3.jpg", "assets/work/pap/post-4.jpg", "assets/work/pap/post-5.jpg", "assets/work/pap/post-6.jpg"] },
      { type: "image", image: "assets/work/pap/logoband.jpg" },
      { type: "bleed", image: "assets/work/pap/brochure.jpg" },
      { type: "bleed", image: "assets/work/pap/merch.jpg" },
      { type: "patterns", each: 2.2, ratio: "565.34 / 443.5", items: ["assets/work/pap/pattern-1.jpg", "assets/work/pap/pattern-2.jpg", "assets/work/pap/pattern-3.jpg", "assets/work/pap/pattern-4.jpg", "assets/work/pap/pattern-5.jpg", "assets/work/pap/pattern-6.jpg"] },
      { type: "bleed", image: "assets/work/pap/skyline.jpg" },
      { type: "image", image: "assets/work/pap/cards.jpg" },
      { type: "image", image: "assets/work/pap/closing.jpg" }
    ]
  },
  {
    id: "madrun", title: "MADRUN", tags: ["Product Design", "Photography"],
    summary: "Built for the mile after.",
    image: "assets/work/madrun/cover.jpg", ratio: "2200 / 1160",
    tagline: "Built for the mile after.",
    client: "MADRUN, muscle cooling gel",
    year: "2023",
    // Same layout as the MADRUN case on brookerogersdesign.com, but square corners
    layout: "case", hero: false, square: true,
    blocks: [
      { type: "bleed", image: "assets/work/madrun/01.jpg" },
      { type: "lead", lead: "MADRUN", text: "turns recovery into part of the performance. A high-impact identity designed to stand out in the gym, on the shelf, and everywhere in between." },
      { type: "image", image: "assets/work/madrun/02.jpg" },
      { type: "pair", items: ["assets/work/madrun/03.jpg", "assets/work/madrun/04.jpg"] },
      { type: "image", image: "assets/work/madrun/05.jpg" },
      { type: "trio", items: ["assets/work/madrun/06.jpg", "assets/work/madrun/07.jpg", "assets/work/madrun/08.jpg"] },
      { type: "motion", video: "assets/work/madrun/motion.mp4", line: "made for the miles", lineArt: "assets/work/madrun/line.svg", mark: "assets/work/madrun/oval.png" },
      { type: "pack",
        heading: "a cooling botanical formula made with:",
        label: "assets/work/madrun/label.jpg",
        head: "assets/work/madrun/botanical-head.svg",
        bottle: "assets/work/madrun/bottle.jpg",
        notes: [
          { t: "peppermint + eucalyptus",         x: "0%",     y: "18.07%", w: "37.44%", r: "-5.87deg" },
          { t: "arnica flower",                   x: "45.81%", y: "15.50%", w: "21.82%", r: "4.62deg" },
          { t: "menthol + camphor",               x: "70.14%", y: "11.85%", w: "30.64%", r: "5.77deg" },
          { t: "aloe vera",                       x: "3.30%",  y: "82.79%", w: "14.28%", r: "-3.22deg" },
          { t: "turmeric + neem",                 x: "25.40%", y: "81.82%", w: "26.01%", r: "13.96deg" },
          { t: "botanical + essential oil blend", x: "53.89%", y: "84.90%", w: "46.11%", r: "-0.38deg" }
        ] }
    ],
    overview: ["MADRUN turns recovery into part of the performance. A high-impact identity designed to stand out in the gym, on the shelf, and everywhere in between."]
  },
  {
    id: "blank", title: "BLANK", tags: ["Branding", "Positioning", "Web Design"],
    summary: "The art of looking effortless.",
    image: "assets/work/blank/cover.jpg", ratio: "2880 / 1621",
    tagline: "The art of looking effortless.",
    client: "BLANK, hair studio, 421 S Washington St.",
    year: "2026",
    // Same layout as the BLANK case on brookerogersdesign.com, but square corners
    layout: "case", hero: false, square: true,
    blocks: [
      { type: "bleed", image: "assets/work/blank/01.jpg" },
      { type: "lead", lead: "BLANK", text: "is a hair studio built on a premise that runs against everything salon branding usually does — the most considered work is the work you never notice. Positioning, identity and site were built together so the restraint reads as intent rather than absence." },
      { type: "panel", image: "assets/work/blank/02.jpg", bg: "#D9D7CE" },
      { type: "lead", lead: "THE MARK", text: "mirrors its own K. Set as BLA / NK across two lines, the reversed letter reads as a flaw until you see it twice — then it reads as a signature. The BK monogram and star carry it down to stamp scale." },
      { type: "panel", image: "assets/work/blank/03.jpg", bg: "#251406" },
      { type: "image", image: "assets/work/blank/04.jpg" },
      { type: "trio", items: ["assets/work/blank/05.jpg", "assets/work/blank/06.jpg", "assets/work/blank/07.jpg"] },
      { type: "image", image: "assets/work/blank/08.jpg" },
      { type: "image", image: "assets/work/blank/09.jpg" },
      { type: "swatches", items: [
        { name: "Bone",    hex: "#F1EDEC", cmyk: "0 2 2 5",    ref: "assets/work/blank/ref-bone.jpg" },
        { name: "Sand",    hex: "#C7B79D", cmyk: "0 8 21 22",  ref: "assets/work/blank/ref-sand.jpg" },
        { name: "Oxblood", hex: "#4B2317", cmyk: "0 53 69 71", ref: "assets/work/blank/ref-oxblood.jpg" },
        { name: "Ink",     hex: "#261406", cmyk: "0 47 84 85", ref: "assets/work/blank/ref-ink.jpg" }
      ] },
      { type: "image", image: "assets/work/blank/stories.jpg" }
    ]
  },
  {
    id: "good-days", title: "good days", tags: ["Branding", "App Design", "UX & Strategy"],
    summary: "Every good day, in one place.",
    image: "assets/work/good-days/hero.jpg", ratio: "2400 / 1880",
    tagline: "Every good day, in one place.",
    client: "good days, personal health tracker",
    year: "2026",
    // Built from the "Good Days" frame in the Website Figma file, cut into its sections.
    // Not in the work list; opened from the Brand & Design panel in Capabilities.
    hideFromWork: true,
    layout: "case", hero: false, square: true,
    blocks: [
      { type: "bleed", image: "assets/work/good-days/hero.jpg" },
      { type: "image", image: "assets/work/good-days/02-app.jpg" },
      { type: "bleed", image: "assets/work/good-days/03-trail.jpg" },
      { type: "image", image: "assets/work/good-days/04-colours.jpg" },
      { type: "bleed", image: "assets/work/good-days/05-screens.jpg" },
      { type: "image", image: "assets/work/good-days/06-merch.jpg" }
    ]
  }
];

/*
  STUDIO — the full-screen "Our Studio" panels (home + studio page).
  Each item gets its own background as you scroll; its name lights up in the list.
  image : background, e.g. "assets/studio/editorial.jpg" ("" shows a dark blank panel)
  link  : optional, e.g. "project.html?p=night-owl" (shows "See project")
*/
window.STUDIO = [
  {
    title: "Visual Storytelling",
    text: "Live performance and campaign photography with a cinematic approach, focused on movement, light, and crowd connection.",
    image: "",
    link: ""
  },
  {
    title: "Marketing Positioning",
    text: "More than campaigns and calendars: building a brand people instantly recognize and genuinely connect with.",
    image: "",
    link: ""
  },
  {
    title: "Editorial Design",
    text: "Packaging, editorial layouts, and collector books, including a 300+ page book for Vintage Vault and Field of Memories.",
    image: "",
    link: ""
  },
  {
    title: "Social Media Management",
    text: "Strategy, content planning, analytics, and custom branded systems. Nothing templated, expected, or one-size-fits-all.",
    image: "",
    link: ""
  }
];

/*
  CAPABILITIES — the full-screen "Capabilities" (Services) panels on the home page.
  image : background, e.g. "assets/services/branding.jpg" ("" shows a dark blank panel)
  video : optional muted clip that loops behind the panel (image is its poster); mobileVideo is the phone cut
  mobileImage : optional portrait version used on phones (768px wide and under)
  link  : optional, e.g. "project.html?p=good-days" — clicking the panel opens it (a full https:// address opens in a new tab)
  hover : optional round badge that follows the mouse over the panel (desktop only), e.g. "assets/services/hover/bbz.jpg"
  shade : optional, true darkens the photo more so white text reads on bright images
  items : shown as the small line at the bottom of each panel
*/
window.CAPABILITIES = [
  {
    title: "Brand & Design",
    image: "assets/services/brand-design-good-days.jpg",
    mobileImage: "assets/services/brand-design-good-days-mobile.jpg",
    link: "project.html?p=good-days",
    hover: "assets/services/hover/good-days.jpg",
    items: ["Brand Identity & Logo", "Brand Kit Revamps", "Typography & Visual Systems", "Campaign Visual Rollouts", "Ad Creative", "Social Graphic Design"]
  },
  {
    title: "Digital & Web",
    image: "assets/services/digital-web.jpg",
    mobileImage: "assets/services/digital-web-mobile.jpg",
    link: "https://uncensored-health.com/",
    hover: "assets/services/hover/uncensored.jpg",
    items: ["Custom Website Design", "Landing Pages", "UX/UI & Site Architecture", "E-Commerce", "CMS Setup", "SEO-Ready Builds"]
  },
  {
    title: "Strategy",
    image: "assets/services/strategy.jpg",
    mobileImage: "assets/services/strategy-mobile.jpg",
    shade: true,
    items: ["Brand Positioning & Voice", "Audience Mapping", "Content Pillars", "Platform Strategy", "Campaign Planning", "KPI Mapping"]
  },
  {
    title: "Social & Content",
    image: "assets/services/social-content.jpg",
    mobileImage: "assets/services/social-content-mobile.jpg",
    link: "https://www.mybiomefit.com/",
    hover: "assets/services/hover/bbz.jpg",
    items: ["Content Systems", "Recurring Content Shoots", "Video Scripting", "Short-Form Editing", "Trend-Aware Direction", "Batch Production"]
  },
  {
    title: "Marketing",
    image: "assets/services/marketing.jpg",
    mobileImage: "assets/services/marketing-mobile.jpg",
    items: ["Social Media Management", "Content Calendars", "Strategic Copywriting", "Community Engagement", "Email & Funnels", "Launch Execution"]
  },
  {
    title: "Production",
    image: "assets/work/reel-poster.jpg",
    video: "assets/work/reel-1080.mp4",
    mobileVideo: "assets/work/reel-720.mp4",
    items: ["Commercials & Branded Ads", "Vertical Content", "Music Videos", "Brand Story Films", "Photography", "Drone Footage"]
  }
];
