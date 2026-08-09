# MASTER PROMPT — Rebuild My Portfolio Website From Scratch

> **How to use this prompt:** Copy-paste everything below into any AI coding assistant (Gemini, Claude, ChatGPT, Cursor, etc.). Before you paste it, make sure your project folder already contains the `assets/` folder with all media files in the exact structure described in Section 2. The AI will build the entire site around those assets.

---

## CONTEXT

I need you to build a multi-page personal portfolio website for a PGDM (MBA-equivalent) student. The site is **vanilla HTML + CSS + JavaScript only** — no frameworks, no build tools, no npm. It must work by opening `index.html` directly in a browser (file:// protocol) or when deployed to any static host like Vercel/Netlify.

The design language is **"Neubrutalist Editorial"** — think modern magazine layout meets Swiss/International typography with hard borders, offset drop-shadows, monospace chrome labels, and a warm paper-like background with a subtle grid overlay and grain texture. It must have a **light/dark theme toggle** that persists across pages.

---

## SECTION 1 — FILE STRUCTURE TO CREATE

Build exactly these files:

```
/
├── index.html            (Home page — hero, marquee, highlights, rich modals)
├── projects.html         (Projects — academic cards, committee carousels, brand audits)
├── internship.html       (Internship — 2 detailed project breakdowns with videos)
├── certificates.html     (Certificates & Awards — cards + timeline)
├── about.html            (About — portrait, personal essay, skills, education timeline)
├── contact.html          (Contact — centered card with email, LinkedIn, phone)
├── css/
│   ├── style.css         (Master stylesheet — design tokens, layout, all components)
│   └── brm-player.css    (Styles for the custom native DOM presentation player)
├── js/
│   ├── main.js           (Theme toggle, carousels, global lightbox modal, marquee)
│   └── brm-player.js     (Timeline engine for the BRM native presentation player)
└── assets/               (Pre-existing — DO NOT create, just reference)
    ├── profile.png
    ├── Committee Work/
    │   ├── Posters/      (17 files: 13 .png + 4 .mp4)
    │   └── Reels/        (3 .mp4 files)
    └── Internship Projects/
        ├── Sales Deal Intelligence.mp4
        └── Brand Deal Intelligence.mp4
```

---

## SECTION 2 — ASSET FOLDER (Pre-existing, reference only)

The `assets/` folder is already populated. Here are the exact filenames you must reference:

**Profile Photo:**
- `assets/profile.png`

**Committee Work — Posters (13 images + 4 videos):**
- `assets/Committee Work/Posters/CREST - Celestia Nova (Event Main Poster).png`
- `assets/Committee Work/Posters/CREST - Celestia Nova (Judges).png`
- `assets/Committee Work/Posters/Durga Pooja (Event Details).png`
- `assets/Committee Work/Posters/Durga Pooja Invite.png`
- `assets/Committee Work/Posters/Dussehra Invite.png`
- `assets/Committee Work/Posters/Ganesh Visarjan Invite.png`
- `assets/Committee Work/Posters/Garba Invite.png`
- `assets/Committee Work/Posters/Garba Workshop Invite.png`
- `assets/Committee Work/Posters/Halloween Poster.png`
- `assets/Committee Work/Posters/Independenc Day Invite.png` ← (note the typo in filename, keep it)
- `assets/Committee Work/Posters/Onam (Event Details).png`
- `assets/Committee Work/Posters/Onam Invite.png`
- `assets/Committee Work/Posters/Sankranti (Event Details).png`
- `assets/Committee Work/Posters/Lohri Invite.mp4`
- `assets/Committee Work/Posters/New Year Wish.mp4`
- `assets/Committee Work/Posters/Pongal (Event Details).mp4`
- `assets/Committee Work/Posters/Sankranti Invite.mp4`

**Committee Work — Reels (3 videos):**
- `assets/Committee Work/Reels/Cult Mela (Post Event Reel).mp4`
- `assets/Committee Work/Reels/Children's Day (Pre-Event Reel).mp4`
- `assets/Committee Work/Reels/Children's Day (Post-Event Reel).mp4`

**Internship Projects (2 videos):**
- `assets/Internship Projects/Sales Deal Intelligence.mp4`
- `assets/Internship Projects/Brand Deal Intelligence.mp4`

---

## SECTION 3 — DESIGN SYSTEM

### 3.1 Fonts (Google Fonts, imported via CSS @import)
- **Headings:** `Outfit` (weights 300–900)
- **Body text:** `Inter` (weights 300–600)
- **Monospace / Chrome labels:** `JetBrains Mono` (weights 400, 500)

### 3.2 Color Tokens (CSS Custom Properties on `:root`)

**Light theme (default):**
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-paper` | `#fdfbf7` | Page background (warm off-white) |
| `--bg-paper-2` | `#ffffff` | Card backgrounds |
| `--ink` | `#1a1a1a` | Primary text |
| `--ink-soft` | `#4a4a4a` | Secondary text |
| `--ink-faint` | `#888888` | Tertiary / metadata text |
| `--line` | `rgba(26,26,26,0.15)` | Borders, dividers |
| `--accent` | `#2563eb` | Royal blue, accent color |

**Dark theme (toggled via `[data-theme="dark"]` on `<html>`):**
| Token | Value |
|-------|-------|
| `--bg-paper` | `#1a1a1a` |
| `--bg-paper-2` | `#2a2a2a` |
| `--ink` | `#fdfbf7` |
| `--ink-soft` | `#a3a3a3` |
| `--ink-faint` | `#737373` |
| `--line` | `rgba(253,251,247,0.15)` |
| `--accent` | `#60a5fa` |

### 3.3 Background Textures
The `<body>` has two pseudo-element overlays:
1. **`::before`** — A subtle 60×60px CSS grid pattern using `linear-gradient` lines in `var(--line)` color, at 50% opacity.
2. **`::after`** — An SVG-based fractal noise grain texture, at 5% opacity (8% in dark mode).

### 3.4 Core Component Styles

**`.editorial-card`** — The main content card:
- `border: 1px solid var(--ink)`
- `box-shadow: 6px 6px 0 0 var(--ink)` (hard offset Neubrutalist shadow)
- `padding: 2.5rem`
- `position: relative`
- `min-height: 350px`
- Hover: shadow grows to `10px 10px`, card translates `-2px, -2px`

**`.btn`** — Base button:
- `border: 2px solid var(--ink)`
- `padding: 1rem 2rem`
- `text-transform: uppercase`
- `font-family: JetBrains Mono`
- `font-weight: 500`
- `letter-spacing: 0.1em`
- Hover: inverts (background becomes `var(--ink)`, text becomes `var(--bg-paper)`)

**`.btn-primary`** — Filled button:
- `background-color: var(--ink)`
- `color: var(--bg-paper)`
- Hover: reverses

**`.tag`** — Small metadata pill:
- `border: 1px solid var(--ink)`
- `padding: 0.4rem 0.8rem`
- `font-family: JetBrains Mono`
- `font-size: 0.7rem`
- `text-transform: uppercase`

**`.kicker`** — Monospace label/metadata:
- `font-family: JetBrains Mono`
- `font-size: 0.75rem`
- `text-transform: uppercase`
- `letter-spacing: 0.1em`
- `color: var(--ink-soft)`

**`.text-outline`** — Outlined/stroked headline text:
- `-webkit-text-stroke: 2px var(--ink)`
- `color: transparent`

---

## SECTION 4 — NAVIGATION (Shared across all 6 pages)

Every page has an identical sticky header:
```
LOGO: "Ritika" + bold "Sharma" (linked to index.html)
NAV LINKS: 00 Home | 01 Projects | 02 Internship | 03 Certificates | 04 About | 05 Contact
THEME TOGGLE: A button (☽/☀ icon) that toggles [data-theme="dark"] on <html> and saves to localStorage
```
The current page's nav link gets class `active` (styled with filled background + inverted text, making it look like a dark pill).

---

## SECTION 5 — PAGE-BY-PAGE CONTENT SPECIFICATION

### 5.1 HOME PAGE (`index.html`)

**Hero Section:**
- Two-column layout (text left, portrait right on desktop; stacked on mobile)
- Left side:
  - `<h1>` with "Ritika" on line 1, "Sharma" on line 2 (in `.text-outline` style)
  - Kicker group: "marketing strategist & analytics" and "pgdm '27 — great lakes, gurgaon"
  - CTA button: "Index 01 → Projects" linking to `projects.html`
- Right side:
  - Portrait photo (`assets/profile.png`) inside a wrapper with a blue offset background square behind it
  - Label below: "Est. PGDM '27"

**Marquee Ticker:**
- Full-width horizontal scrolling ticker with skills: MARKETING STRATEGY ✦ BRAND POSITIONING ✦ CONSUMER RESEARCH ✦ DATA ANALYTICS ✦ POWER BI ✦ AI PRODUCT DEV ✦
- Uses CSS `@keyframes marquee` animation, content duplicated for seamless loop
- Also supports drag-to-scroll (JS)

**"The Short Version" Section:**
- Kicker: "— the short version"
- Headline: "Creative on the surface." (solid) + "Driven by numbers." (outlined)
- Body paragraph about working on creative marketing backed by data

**"Selected Highlights" Section:**
- Kicker: "— Selected Highlights"
- 4 cards in an `.editorial-grid` (responsive CSS grid, 3 columns on desktop):
  1. **Sales Deal Intelligence** — Has a `<video>` thumbnail from internship assets
  2. **Customer Trust Review** — Placeholder div (no video yet)
  3. **D2C Brand Strategy** — Placeholder div (no video yet)
  4. **CultCom Posters & Reels** — Has a `<video>` thumbnail from committee reels
- Each card has `data-highlight="highlight-N"` and `cursor: pointer`
- Clicking a card opens a **Rich Modal** (see Features section below)

**Hidden Rich Modal Templates:**
- Stored in a `display: none` wrapper with id `rich-modal-templates`
- Template 1 (Sales Deal Intelligence): Video player + title + description + link to internship page
- Template 2 (Customer Trust Review): Contains the **BRM Native Player** (see Section 6) + title + description
- Template 3 (D2C Brand Strategy): Placeholder + title + description
- Template 4 (CultCom): Video player + title + description

**Section Navigation:**
- At the bottom: "Next: 01 Projects ➝" link

---

### 5.2 PROJECTS PAGE (`projects.html`)

**Page Header:**
- Kicker: "— index 01"
- `<h1>`: "Projects & Work"
- Subtitle: "Applying strategic frameworks, data analysis, and creative problem-solving."

**Section 1 — Academic Projects:**
- 4 editorial cards in a grid:
  1. **Ethnic Wear Market Study — BIBA** (Strategy & Growth)
     - Led market research on BIBA's ₹95,000+ Cr ethnic-wear category, benchmarking 4 competitors via PESTEL/Porter's Five Forces and primary consumer-dealer interviews to design a revised STP and 3-phase growth roadmap.
     - Tags: Market Research, STP
  2. **Consumer Trust Review Experiment** (Quantitative Analytics)
     - Designed a between-subjects experiment (n=40) on how review valence shapes consumer trust and purchase intent; ran chi-square/t-test analysis (p<0.001) to derive review-management recommendations for e-commerce brands.
     - Contains a **BRM Thumbnail Trigger** — a clickable 16:9 box that says "REVIEWS VS. TRUST" + "▶ PLAY PRESENTATION" that opens the BRM Native Player in a modal popup
     - Tags: Quant Analysis, A/B Testing
  3. **New Brand Launch — "Urban Slice"** (Marketing Management)
     - Conceptualized "Urban Slice," an Indian-fusion pizza brand from scratch; building the product mix, brand positioning, and penetration pricing strategy benchmarked against Domino's and Pizza Hut for market entry.
     - Tags: Brand Positioning, Pricing Strategy
  4. **D2C Brand Strategic Pivot** (Framework Application)
     - Analyzed Ish Museum's pivot from thrift resale to in-house production through founder interviews, applying Effectuation and Resource-Based View frameworks to recommend multi-channel scaling strategies.
     - Tags: D2C Strategy, Frameworks

**Section 2 — Committee Work:**
- **Posters Carousel:** Horizontal scrollable carousel with ← → arrow buttons, containing all 17 poster files (13 images + 4 videos). Each item has a caption below it.
- **Reels Carousel:** Same pattern, 3 reel videos.
- All carousel videos: `autoplay loop muted playsinline`

**Section 3 — Brand Audits & Marketing Explorations:**
- A single placeholder card: "[ Upcoming Audits & Explorations will be published here ]"

**Hidden BRM Modal Template:**
- Full copy of the BRM Native Player (same as index.html) stored in a `display: none` wrapper
- Gets cloned into the modal when the thumbnail is clicked

**Section Navigation:**
- "Next: 02 Internship ➝"

---

### 5.3 INTERNSHIP PAGE (`internship.html`)

**Page Header:**
- Kicker: "— index 02"
- `<h1>`: "Internship"
- Subtitle: "Marketing Intern @ Quick Clean Laundry Systems (2.5 Months)"

**Project 1 — Sales Deal Intelligence:**
- Two-column layout (text left, video right)
- Content:
  - **The Problem:** No centralized record of closed deals existed for 40 new sales trainees. Knowledge was trapped with individual sales reps.
  - **The Execution:** Gathered raw deal data from SPOCs across 60+ hotel and hospital sites. Built a 7-module web app ("QuickClean Knowledge Center") from scratch using AI/no-code tools. Integrated an AI Chatbot ("Ask Anshul") powered by Gemini API for natural-language querying.
  - **The Delivery:** 33 fully published, 10-section case studies. A live, authenticated web portal featuring KPI tracking, CO₂ calculators, and strategic intel. Co-authored a formal 5-step SOP and Admin guide for future maintenance.
- Right side: Video embed (`Sales Deal Intelligence.mp4`) in a bordered card

**Project 2 — Brand Deal Intelligence:**
- Same two-column layout but **reversed** (video left, text right) via `direction: rtl`
- Content:
  - **The Problem:** Needed data-driven, brand-wide dashboards (consumption, savings, CAPEX, sustainability) for CEO-level pitches to major hotel chains.
  - **The Execution:** Engineered a reusable master analytical Excel template with automated load logic, ICP fit modeling, and sustainability calculations. Mapped every current and upcoming property for Marriott and IHCL nationwide. Built a dedicated dashboard website to visualize the findings for Marriott.
  - **The Impact:** Marriott: Mapped 282 properties (54k rooms), identified 972 tonnes CO₂e avoided (~44k trees). IHCL: Mapped 484 properties (40k rooms), identified 719 tonnes CO₂e avoided (~32.7k trees).
- Left side: Video embed (`Brand Deal Intelligence.mp4`)

**Section Navigation:**
- "Next: 03 Certificates ➝"

---

### 5.4 CERTIFICATES PAGE (`certificates.html`)

**Page Header:**
- Kicker: "— index 03", Title: "Certificates", Subtitle: "Continuous learning and extracurricular engagements."

**Two-column layout:**
- **Left — Academic Certifications:**
  1. Marketing Strategy Specialization — IE Business School | 2025 (12 Weeks)
  2. Data Analytics Professional — Google | 2025 (12 Weeks)

- **Right — Awards & Responsibility (Timeline format):**
  1. 2023 — Final Round Qualifier, Logistics & SCM Workshop by MakeIntern, IIM-B
  2. 2025 — Member, Social Media & Cultural, Great Lakes Institute of Management. Created and managed social media content to improve engagement and event visibility.
  3. 2024 — Member, Organizing Committee, UG College. Part of a sponsorship drive for the college magazine; onboarded 2 corporate sponsors.

**Section Navigation:**
- "Next: 04 About ➝"

---

### 5.5 ABOUT PAGE (`about.html`)

**Page Header:**
- Kicker: "— index 04", Title: "About", Subtitle: "From a blank canvas to data-driven marketing strategy."

**Two-column layout (portrait left, text right):**
- Left: Same portrait photo component as hero
- Right — Personal essay titled "What makes me different?":
  > Frankly, at twenty-two years old, I haven't achieved anything massive yet. But if I have one defining trait, it's that I am incredibly comfortable starting from zero.
  >
  > Constantly moving from Kashmir to Gujarat as a defence kid forced me to quickly observe and adapt to new environments. To process all that change and clear my head, I paint and sketch portraits. It taught me how to look at a blank canvas, pay attention to the small details, and try to understand the people around me.
  >
  > That same curiosity is why I dropped science for business management, and why I didn't give up when I failed my first entrance exam. I'm genuinely not afraid of a steep learning curve, or looking foolish while I'm figuring something new out.
  >
  > I even brought this mindset to my recent marketing internship. When tasked with documenting standard sales case studies, I didn't want to just deliver a predictable Word document. I used it as an excuse to learn, experimenting with new AI tools to build something much more interactive.
  >
  > So, what makes me, me? It's not a list of past achievements. It's my comfort with a blank canvas - whether that's a new city, a new field of study, or a new project. What defines me is the willingness to look at what I don't know, and face it with absolute curiosity and discipline.
  >
  > — And yeah, that's Ritika Sharma.

**Key Skills section:** Card with tags — AI PRODUCT DEVELOPMENT, QUANTITATIVE ANALYSIS, MARKET RESEARCH, BRAND STRATEGY, CLIENT ENGAGEMENT, PROCESS OPTIMIZATION

**Education Timeline:**
1. 2025–2027: PGDM, Great Lakes Institute of Management, Gurgaon — Pursuing major in Marketing and minor in Analytics.
2. Graduated 2023: BBA, Maharaja Sayajirao University, Baroda

**Section Navigation:**
- "Next: 05 Contact ➝"

---

### 5.6 CONTACT PAGE (`contact.html`)

**Centered layout:**
- Kicker: "— index 05", Title: "Contact", Subtitle: "Open for opportunities."
- Single centered editorial card with:
  - Heading: "Say Hello"
  - Body: "I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to chat strategy, I'll get back to you!"
  - Three stacked buttons:
    1. **Email Me** → `mailto:ritikasharma.pgdm27g@greatlakes.edu.in` (primary/filled)
    2. **LinkedIn** → `https://www.linkedin.com/in/ritika-sharma-9518a9255` (outline)
    3. **+91 8140353560** → `tel:+918140353560` (outline, monospace)

---

## SECTION 6 — SPECIAL FEATURE: BRM NATIVE PRESENTATION PLAYER

This is a custom, fully responsive DOM-based animated presentation that replaces the need for an embedded video. It uses CSS Container Queries (`cqi` units) so it scales perfectly at any size.

### Visual Design:
- **Canvas:** `aspect-ratio: 16/9`, light lavender background `#F4F3F8`, 2px solid black border, hard 8px offset drop shadow
- **Header Chrome:** Blue tag square (numbered "05"), title "REVIEWS VS. TRUST", subtitle line, "SCRUB / PLAY" pill
- **Footer Chrome:** Blue play button, scrub bar track with fill + handle, time readout (e.g., "00:04.0 / 00:26.0"), hint row
- **Scene Area:** Between header and footer chrome, beats snap in/out with opacity + translateY transitions

### Timeline (26 seconds total):
| Beat | Time | Type | Content |
|------|------|------|---------|
| 1 | 0–4s | Title Reveal | "— BRM EXPERIMENT / 2025" label, giant "REVIEWS VS. TRUST" wordmark with decorative play ring, "CONSUMER BEHAVIOR STUDY" caption |
| 2 | 4–8s | Stat Card | "— THE SETUP" / **40** RESPONDENTS / "20 SAW POSITIVE REVIEWS · 20 SAW NEGATIVE REVIEWS — SAME PRODUCT PAGE, ONLY THE REVIEWS CHANGED" |
| 3 | 8–12s | Stat Card | "— BEFORE THE REVIEWS" / **p = 0.429** / NO PRE-EXISTING BIAS BETWEEN GROUPS / "CHI-SQUARE = 0.635 — groups were statistically identical at the start" |
| 4 | 12–17s | Stat Card (hero blue) | "— THE RESULT" / **CHI-SQUARE = 38.000** / PURCHASE INTENTION / "p < 0.001 — positive reviews drove buying intent, negative reviews reversed it" |
| 5 | 17–22s | Stat Card (hero blue) | "— THE RESULT" / **F = 259.929** / CONSUMER TRUST / "p < 0.001 — trust nearly collapsed under negative framing" |
| 6 | 22–26s | Ghost Text | Large, light gray uppercase text: "REVIEWS AREN'T FEEDBACK. THEY'RE THE PRODUCT PAGE'S MOST POWERFUL LINE OF COPY." |

### JavaScript Engine (`brm-player.js`):
- `window.initBrmPlayers(container)` — initializes all `.brm-player-wrapper` elements inside a container
- Uses `requestAnimationFrame` for smooth playback
- Play/pause via the blue button OR clicking anywhere on the canvas
- Scrub bar is clickable to seek
- Displays formatted time readout
- Skips initialization of hidden elements (checks `offsetParent === null`)

---

## SECTION 7 — GLOBAL FEATURES (in `main.js`)

### 7.1 Theme Toggle
- Button with id `theme-toggle`
- Toggles `data-theme="dark"` attribute on `<html>`
- Persists to `localStorage`
- Updates icon between ☽ (light mode) and ☀ (dark mode)

### 7.2 Carousel System
- Each carousel has a `.carousel-track` with `.carousel-item` children
- Previous/Next buttons (← →) scroll the track by the width of one item
- Smooth CSS `scroll-behavior: smooth` or JS-based scrolling

### 7.3 Global Lightbox Modal
- Every page includes a `#media-modal` element (class `media-modal`)
- Structure: `.modal-content-container` > `.modal-close-btn` (×) + `#modal-inject-zone`
- **Behavior:** Clicking ANY `<img>` (except `.portrait-img`) or `<video>` on the site creates a clone/new element inside `#modal-inject-zone` and opens the modal
- Videos in the modal get `controls`, `loop`, `playsinline`. Reels (from `#reels-track`) get `muted = false` (audio); others default to `muted`
- Modal closes on clicking the × button, clicking the backdrop, or pressing ESC

### 7.4 Rich Modal System (Home page highlights)
- `.highlight-card` elements on the home page have `data-highlight="highlight-N"`
- Clicking one clones the corresponding `#highlight-N-content` template from the hidden template store, injects it into `#modal-inject-zone`, and opens the modal
- After injection, calls `window.initBrmPlayers()` on the clone (for Template 2)

### 7.5 BRM Thumbnail Trigger (Projects page)
- `.brm-thumbnail-trigger` elements have a `data-target` pointing to a hidden template id
- Clicking clones the template, injects it, opens the modal, and initializes the BRM player

### 7.6 Draggable Marquee
- The `.marquee-container` on the home page is also manually draggable (click + drag to scroll)

---

## SECTION 8 — RESPONSIVE DESIGN

- **Desktop (>1024px):** Full multi-column layouts, 3-column editorial grid
- **Tablet (768–1024px):** 2-column grid, stacked hero
- **Mobile (<768px):** Single column, hamburger menu or simplified nav, stacked carousels
- The BRM player uses CSS Container Queries (`cqi` units) so it scales perfectly at any container width

---

## SECTION 9 — FOOTER (Shared across all pages)

```html
<footer>
    <div class="container">
        <p>&copy; 2026 Ritika Sharma</p>
    </div>
</footer>
```

---

## SECTION 10 — IMPORTANT IMPLEMENTATION NOTES

1. **Do NOT use any framework or build tool.** Pure HTML/CSS/JS only.
2. **All fonts come from Google Fonts** via a single CSS `@import` in `style.css`.
3. **The `assets/` folder already exists** — do not create placeholder images. Just reference the exact filenames listed in Section 2.
4. **CHI-SQUARE notation:** Do NOT use the unicode χ² character — it renders broken in some fonts. Always write `CHI-SQUARE` in plain ASCII text.
5. **Every page must include** the `#media-modal` markup and `js/main.js` script tag.
6. **Only pages with the BRM player** (index.html and projects.html) need `css/brm-player.css` and `js/brm-player.js`.
7. **The nav link for the current page** must have class `active`.
8. **Videos in carousels** should have `autoplay loop muted playsinline` attributes.
9. **Portrait image** (`.portrait-img`) should NOT open in the lightbox — exclude it from the global click listener.

---

**Now build the entire site. Start with `css/style.css`, then `css/brm-player.css`, then `js/main.js`, then `js/brm-player.js`, then the 6 HTML pages in order: index → projects → internship → certificates → about → contact.**
