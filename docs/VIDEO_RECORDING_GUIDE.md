# Complete Video Recording Guide & Screenplay: TeddyPups U.A.E.

This guide gives you everything you need to record a video:
1. **Setup & Screen Layout** (tools, windows to open beforehand)
2. **Scene-by-Scene Cue Sheet** (exactly what to display on your screen at each second)
3. **Word-for-Word Spoken Script** (natural, professional, confident narration)

---

## 🛠️ Step 1: Pre-Recording Setup (Do This Before Hitting Record)

### 1. Recommended Recording Software
* **Option A: Loom** (Recommended) — Select "Screen + Camera" (Webcam circle in the bottom-left or bottom-right corner).
* **Option B: Windows Snipping Tool / Game Bar (`Win + Alt + R`)** or **OBS Studio** — If you want full-screen recording without camera.

### 2. Prepare Your Windows & Tabs
Open and arrange these 3 windows so you can easily switch between them with `Alt + Tab`:

#### Window 1: Web Browser (Chrome / Edge)
Open the following tabs in order:
1. **Tab 1:** `http://localhost:3000` (Make sure your dev server is running with `npm run dev`)
2. **Tab 2:** Your GitHub repo: `https://github.com/Tirth0604/PUPPY_INSTA-BIZ`
3. **Tab 3 (Optional):** Reference site: `https://puppy.instabizweb.com/`

#### Window 2: VS Code
Open the project folder `teddypups-website-clone` and have these files open in editor tabs:
1. `app/[...route]/page.tsx`
2. `package.json`
3. `docs/AI_PROMPTS.md`
4. `docs/IMPLEMENTATION_DECISIONS.md`
5. Keep the file explorer sidebar visible on the left.

#### Window 3: Terminal (PowerShell / Command Prompt)
Navigate to `teddypups-website-clone` and type `npm test` (do not press Enter yet, you will run it live).

---

## 🎬 Step 2: Scene-by-Scene Screenplay (What to Show & What to Say)

---

### SCENE 1: Introduction & Assessment Goal
⏱ **Time:** `0:00 – 0:40`  
🖥 **What to show on screen:**  
Browser on `http://localhost:3000` showing the homepage hero section. Show the header, persistent assessment demonstration banner, and puppy cards.

🗣 **What to speak (Word-for-Word):**  
> *"Hello! My name is Tirth Gandhi. Welcome to my technical presentation and project demonstration for the TeddyPups U.A.E. full-stack website recreation assessment.*
>
> *The objective of this project was to analyze, re-engineer, and build an independent, pixel-accurate, and fully functional clone of the reference website at puppy.instabizweb.com.*
>
> *Over the next six to seven minutes, I'm going to walk you through our complete development process, project structure, technologies used, AI engineering workflows, key technical challenges solved, test results, and our production deployment setup. Let's begin!"*

---

### SCENE 2: Technologies & Tooling
⏱ **Time:** `0:40 – 1:30`  
🖥 **What to show on screen:**  
Switch (`Alt + Tab`) to **VS Code** with [`package.json`](file:///c:/Users/admin/Downloads/teddypups-website-clone-checkpoint/teddypups-website-clone/package.json) open on your screen. Highlight the `dependencies` and `devDependencies` sections.

🗣 **What to speak (Word-for-Word):**  
> *"Let's look at the technology stack.*
>
> *On the frontend, we built this using **Next.js 16 with the App Router**, **React 19**, and strict **TypeScript**. Instead of using generic CSS frameworks like Tailwind, we extracted and curated the reference design tokens directly into custom CSS variables and stylesheets in `app/reference.css`. This preserved the authentic Figtree body font, Fraunces serif headings, and Shantell Sans handwritten accents.*
>
> *For backend and data handling, we used Next.js Route Handlers coupled with a dual-storage adapter: native **Node 24 SQLite** for zero-dependency local development, and **PostgreSQL / Supabase** with Row-Level Security for production.*
>
> *For validation, we used **Zod** to guarantee strict type-safe schemas shared between the client forms and server routes.*
>
> *For testing and quality, our pipeline includes **Vitest** for unit and integration testing, **Playwright** for end-to-end cross-browser testing across Chromium and WebKit, and **Lighthouse** for performance and accessibility verification."*

---

### SCENE 3: Development Process & Architecture
⏱ **Time:** `1:30 – 2:30`  
🖥 **What to show on screen:**  
Still in **VS Code**, expand the file tree in the sidebar (`app/`, `components/`, `lib/`, `data/`, `supabase/`). Click and open [`app/[...route]/page.tsx`](file:///c:/Users/admin/Downloads/teddypups-website-clone-checkpoint/teddypups-website-clone/app/[...route]/page.tsx).

🗣 **What to speak (Word-for-Word):**  
> *"Now let's examine the project structure and architectural decisions.*
>
> *Rather than creating 49 redundant static page directories, we engineered a unified dynamic catch-all route inside `app/[...route]/page.tsx`. This single route handler dynamically resolves all 7 main content pages—like How It Works, FAQ, and Happy Families—as well as all 42 individual puppy profile slugs, providing server-side rendering and a proper custom HTTP 404 for invalid paths.*
>
> *Looking at our directories:*
> - *`components/` separates UI concerns cleanly: galleries, enquiry forms, navigation, home motion, and lightboxes.*
> - *`lib/` contains our core business logic: `catalogue.ts` for filtering, `validation.ts` for Zod schemas, and `enquiry-store.ts` for persistent form storage.*
> - *`data/` stores pinned JSON snapshots for puppies, families, and templates.*
> - *`supabase/` contains the full PostgreSQL migration script with Row-Level Security policies and database seed files."*

---

### SCENE 4: Live Functional Website Walkthrough
⏱ **Time:** `2:30 – 4:30`  
🖥 **What to show on screen:**  
Switch to the **Browser** (`http://localhost:3000`).

#### 1. Homepage Scroll (`2:30 – 2:55`):
*Action:* Slowly scroll down the homepage past the quilt sections, scrapbook cards, happy families preview, adoption passport, down to the footer, then scroll back to top.  
🗣 **What to speak:**  
> *"Let's see the application running live in the browser.*
>
> *Starting on the homepage: observe how the scrapbook aesthetic is maintained—the cream paper texture, the tilted polaroid puppy cards, the hand-drawn illustrated mascots, and smooth scroll reveals. The persistent assessment banner clearly discloses this as a demonstration, and noindex headers protect SEO integrity."*

#### 2. Puppies Catalogue & Dynamic Filtering (`2:55 – 3:30`):
*Action:* Click **"Puppies"** in the navigation header. Once on `/puppies`, click the **"Imported"** origin filter, then click the **"Poodle"** breed filter. Point out the URL changing to `?breed=poodle`. Then click **"All"** to reset.  
🗣 **What to speak:**  
> *"Now let's go to the `/puppies` catalogue. All 15 available puppies load instantly. Notice our dynamic filtering system: when I click 'Imported', the list updates immediately. When I select 'Poodle', the URL updates to `?breed=poodle`. Browser back and forward history works seamlessly without page reloads. Clicking 'All' resets the catalogue back to the full list."*

#### 3. Puppy Profile & Media Lightbox (`3:30 – 3:55`):
*Action:* Click on a puppy card (e.g. **Max** or **Mimi**). Click through photo thumbnails, switch to the video player, and click the fullscreen button to open the lightbox. Press Right Arrow on your keyboard once, then press Escape to close.  
🗣 **What to speak:**  
> *"Opening a puppy profile displays complete metadata, origin details, and an interactive media gallery. We can switch between photos, play local video clips, and launch the fullscreen lightbox modal with native keyboard arrow navigation and Escape-key focus restoration."*

#### 4. Additional Pages & FAQ Search (`3:55 – 4:15`):
*Action:* Click **"Happy Families"** to show the 64-photo wall. Then navigate to **"FAQ"** (`/faq`). Click the search box and type **"Korea"**. Show the matching questions automatically expanding. Clear the search box.  
🗣 **What to speak:**  
> *"Under 'Happy Families', we have the complete 64-photo gallery with lightbox capabilities. And on the FAQ page, typing 'Korea' into the search box dynamically filters and auto-expands the matching questions in real-time, highlighting the relevant answers."*

#### 5. Contact Form Validation & Persistence (`4:15 – 4:30`):
*Action:* Navigate to **"Contact"** (`/contact`). Click the submit button with empty fields to trigger validation errors. Then quickly fill fictional data (*"Alex Taylor"*, *"+971501234567"*, message) and submit. Show the success confirmation.  
🗣 **What to speak:**  
> *"On the contact page, clicking submit empty triggers immediate client-side validation. Filling valid details submits the enquiry to our independent API endpoint, which validates via Zod on the server and persists to our database with rate limiting and deduplication."*

---

### SCENE 5: AI Tools Used & Exact Prompts
⏱ **Time:** `4:30 – 5:15`  
🖥 **What to show on screen:**  
Switch to **VS Code** and display [`docs/AI_PROMPTS.md`](file:///c:/Users/admin/Downloads/teddypups-website-clone-checkpoint/teddypups-website-clone/docs/AI_PROMPTS.md). Scroll through the prompt sections.

🗣 **What to speak (Word-for-Word):**  
> *"Now for complete transparency on AI tooling and prompt engineering.*
>
> *This implementation was directed using OpenAI Codex and GPT-6 models through a structured 2000-line Master Prompt documented in `docs/AI_PROMPTS.md`.*
>
> *Key aspects of our prompting methodology included:*
> - *A mandatory 'Phase 0' reference investigation using automated Playwright scripts to extract DOM structure, computed styles, and screenshots across 9 responsive viewport sizes before writing any application code.*
> - *Strict non-negotiable constraints: no generic boilerplate templates, no iframes, no mockups masquerading as real data, and full test suite enforcement.*
> - *This discipline ensured the code produced was tailored specifically to the reference rather than generic AI output."*

---

### SCENE 6: Implementation Decisions & Challenges Faced
⏱ **Time:** `5:15 – 6:00`  
🖥 **What to show on screen:**  
In **VS Code**, switch to [`docs/IMPLEMENTATION_DECISIONS.md`](file:///c:/Users/admin/Downloads/teddypups-website-clone-checkpoint/teddypups-website-clone/docs/IMPLEMENTATION_DECISIONS.md).

🗣 **What to speak (Word-for-Word):**  
> *"We tackled several significant engineering challenges:*
>
> 1. *First, **Deconstructing Wix Presentation**: The reference site was built on Wix, using convoluted markup. We extracted computed CSS tokens and SVG artwork, sanitized them, and re-engineered all animations and interactive logic from scratch in clean TypeScript.*
> 2. *Second, **Dual-Engine Persistence**: In `lib/enquiry-store.ts`, we implemented a storage adapter that runs on Node's native SQLite for local development and unit tests, and seamlessly connects to Supabase PostgreSQL in production without code changes.*
> 3. *Third, **Media Optimization**: Original media totaled hundreds of megabytes. We optimized all images to maximum 1600px quality-85 WebP and JPEG, saving 27.8 MB of network payload while maintaining pristine visual quality.*
> 4. *Fourth, **Streaming 404 Resolution**: Next.js App Router was initially returning HTTP 200 for unknown routes due to a streaming boundary; we restructured the root loading boundary so invalid routes reliably return HTTP 404."*

---

### SCENE 7: Testing, GitHub Commits & Deployment
⏱ **Time:** `6:00 – 6:50`  
🖥 **What to show on screen:**  
1. Switch to **Terminal** and press Enter on `npm test`. Show all 42 tests passing.  
2. Switch to **Browser** tab with your GitHub repository: `https://github.com/Tirth0604/PUPPY_INSTA-BIZ`. Scroll down the commits list.

🗣 **What to speak (Word-for-Word):**  
> *"Let's verify the project empirically.*
>
> *Here in the terminal, running our test suite executes 42 automated tests—28 domain tests covering catalogue querying, slug resolution, and validation, plus 14 integration tests covering real database persistence, rate-limiting, and idempotency. All 42 tests pass with zero failures.*
>
> *In Lighthouse, the application scored **98 in Performance**, **100 in Accessibility**, and **100 in Best Practices**, with an LCP of 1.4 seconds.*
>
> *Turning to GitHub at `github.com/Tirth0604/PUPPY_INSTA-BIZ`: the entire project has been pushed across **473 granular, semantic commits**. Every configuration, component, route, script, test, and document was committed individually in clean dependency order.*
>
> *For deployment, full production instructions are provided in `docs/DEPLOYMENT.md`, including our Supabase PostgreSQL schema, seed scripts, and Vercel configuration."*

---

### SCENE 8: Conclusion
⏱ **Time:** `6:50 – 7:15`  
🖥 **What to show on screen:**  
Switch back to the **Browser** showing the live homepage (`http://localhost:3000`).

🗣 **What to speak (Word-for-Word):**  
> *"To conclude: this assessment represents a complete, accessible, and robust Next.js 16 full-stack web application—featuring 7 main pages, 42 puppy profiles, 64 family gallery photos, real database persistence, thorough automated testing, and comprehensive documentation.*
>
> *Thank you very much for your time and review!"*

---

## 💡 Quick Tips for a Flawless Recording
1. **Use `Alt + Tab` smoothly**: Practice switching between Browser, VS Code, and Terminal once before recording.
2. **Cursor movement**: Move your mouse deliberately to draw the viewer's eye to buttons, filters, and code lines you are talking about.
3. **If you make a small stumble**: Don't restart the whole video! Just pause for 2 seconds, repeat that sentence, and continue. You can trim pauses in Loom in 10 seconds.
4. **Volume**: Speak with steady energy, about 6–8 inches from your microphone.
