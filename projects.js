/*
  PROJECTS — edit this list to fill the Selected Work grid (one across).

  id     : short slug, used for links (#work-<id>)
  title  : project name
  tags   : disciplines, e.g. ["Branding", "Website Design"] (also build the filter list)
  summary: one line under the title (optional)
  image  : cover image, e.g. "assets/work/night-owl.jpg" ("" shows a blank slot)
  video  : optional looping cover video, e.g. "assets/work/night-owl.mp4"
  ratio  : cover aspect ratio, e.g. "16 / 9" or "4 / 5"

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
  { id: "project-01", title: "Project 01", tags: [], summary: "", image: "", ratio: "16 / 9" },
  { id: "project-02", title: "Project 02", tags: [], summary: "", image: "", ratio: "16 / 9" },
  { id: "project-03", title: "Project 03", tags: [], summary: "", image: "", ratio: "16 / 9" },
  { id: "project-04", title: "Project 04", tags: [], summary: "", image: "", ratio: "16 / 9" }
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

/* Capabilities — the "A Holistic Approach" section */
window.CAPABILITIES = [
  {
    title: "Brand & Design",
    items: ["Brand Identity & Logo", "Brand Kit Revamps", "Typography & Visual Systems", "Campaign Visual Rollouts", "Ad Creative", "Social Graphic Design"]
  },
  {
    title: "Digital & Web",
    items: ["Custom Website Design", "Landing Pages", "UX/UI & Site Architecture", "E-Commerce", "CMS Setup", "SEO-Ready Builds"]
  },
  {
    title: "Strategy",
    items: ["Brand Positioning & Voice", "Audience Mapping", "Content Pillars", "Platform Strategy", "Campaign Planning", "KPI Mapping"]
  },
  {
    title: "Social & Content",
    items: ["Content Systems", "Recurring Content Shoots", "Video Scripting", "Short-Form Editing", "Trend-Aware Direction", "Batch Production"]
  },
  {
    title: "Marketing",
    items: ["Social Media Management", "Content Calendars", "Strategic Copywriting", "Community Engagement", "Email & Funnels", "Launch Execution"]
  },
  {
    title: "Production",
    items: ["Commercials & Branded Ads", "Vertical Content", "Music Videos", "Brand Story Films", "Photography", "Drone Footage"]
  }
];
