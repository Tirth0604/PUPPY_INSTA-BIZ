# AI usage disclosure

Tool: OpenAI Codex. Model family: GPT-6; exact serving identifier not exposed. Date: 2026-11-20.

The user supplied the following exact prompt. Work is AI-generated; no human/manual review is claimed. Source inspection, execution, and test results are reported separately. No subagents were used. Subsequent tool-call scripts are retained under `scripts/`, and validation evidence under `docs/`.

# MASTER PROMPT — COMPLETE WEBSITE CLONING & FULL-STACK IMPLEMENTATION

## 1. Role and responsibilities

Act as a Senior Full-Stack Software Engineer, UI/UX Designer, Creative Frontend Developer, Animation Specialist, QA Engineer and DevOps Engineer with extensive experience building pixel-perfect, production-grade web applications.

Your assignment is to analyse, recreate, implement, test and prepare a complete functional clone of the following reference website:

**Reference:** https://puppy.instabizweb.com/

**Brand:** TeddyPups U.A.E.

This is a professional technical hiring assignment. The final implementation will be evaluated based on visual accuracy, responsiveness, functional completeness, code quality, problem-solving ability, performance and deployment.

Do not build a website merely inspired by the reference. Recreate the actual reference website as closely as technically possible.

---

## 2. Non-negotiable requirements

- Recreate every publicly accessible page and section.
- Match the original visual design with pixel-level accuracy.
- Reproduce all animations, transitions and micro-interactions.
- Implement all clickable elements and navigation routes.
- Implement all puppy profiles, images, videos and galleries.
- Implement all WhatsApp redirections with appropriate messages.
- Implement functional enquiry and contact forms.
- Reproduce searchable FAQs and catalogue filtering behavior.
- Support desktop, laptop, tablet and mobile devices.
- Ensure the website is independently hosted and functional.
- Do not embed the original website using an iframe.
- Do not use generic website templates.
- Do not replace reference-specific designs with generic AI-generated designs.
- Do not leave unfinished components, TODO comments or non-functional buttons.
- Do not fabricate functionality, test results or deployment URLs.
- Use original media and branding only where authorised for this assignment.
- Clearly identify the deployed website as an assessment demonstration without implying it is the actual business.

The project must be complete, maintainable, independently functional and ready for evaluation.

---

## 3. Phase 0 — Mandatory reference website investigation

Do not begin implementation until a comprehensive website audit has been completed.

Use Playwright, Chromium, browser automation and browser developer tools to inspect the reference website.

### A. Website crawling

Discover every public internal route, including:

- Header navigation
- Footer navigation
- Buttons and CTA links
- Puppy cards
- Adopted puppy cards
- Gallery elements
- Previous and next navigation
- Query parameter routes
- Section anchors
- External links
- Mobile navigation

Recursively visit all discovered internal pages.

Inspect public sitemaps and robots.txt if available. Respect access restrictions and do not bypass authentication.

Create `docs/REFERENCE_AUDIT.md` containing:

- Page URL
- Page name
- Section inventory
- Components
- Interactive elements
- Media assets
- Navigation behavior
- Forms
- Animations
- Responsive differences
- Implementation status
- Known uncertainties

### B. Visual investigation

Capture full-page reference screenshots at these viewport sizes:

- 1920 × 1080
- 1440 × 900
- 1280 × 800
- 1024 × 768
- 768 × 1024
- 430 × 932
- 390 × 844
- 375 × 812
- 360 × 800

Capture additional screenshots of:

- Open mobile navigation
- Hero slides
- Hovered puppy cards
- Active image galleries
- Video playback states
- Expanded FAQs, if expandable
- FAQ search results
- Form validation errors, without submitting test enquiries to the original business
- Active process tabs or selectors
- Lightboxes, if present
- Footer and sticky mobile CTAs

### C. Design token extraction

Inspect computed browser styles to identify:

- Primary and secondary colors
- Background colors and textures
- Text colors
- Accent colors
- Font families and font files
- Heading weights and sizes
- Body typography
- Handwritten typography
- Letter spacing
- Line heights
- Container widths
- Section padding
- Grid gaps
- Border thickness
- Border radius
- Shadows
- Image dimensions and aspect ratios
- Card rotations
- Decorative illustrations
- Responsive breakpoints
- Z-index hierarchy

Create `docs/DESIGN_SYSTEM.md` with exact observed values.

Never guess colors, typography or spacing when they can be extracted from the browser.

### D. Animation investigation

Observe the original website during:

- Initial page loading
- Scrolling down and up
- Navigation between pages
- Hovering cards and buttons
- Opening and closing menus
- Switching carousel slides
- Changing gallery thumbnails
- Playing videos
- Expanding content
- Interacting with forms
- Resizing the browser

Record each observed animation's:

- Trigger
- Duration
- Delay
- Easing function
- Translation
- Rotation
- Scale
- Opacity
- Stagger
- Repetition
- Desktop and mobile behavior

Create `docs/ANIMATION_INVENTORY.md`.

Do not introduce unnecessary animations that change the reference design.

### E. Network investigation

Inspect publicly observable browser Network requests to determine whether the original functionality is powered by:

- Static data
- APIs
- Server-rendered content
- Client-side filtering
- Form submission endpoints
- Third-party integrations

Do not copy private credentials, replay real enquiry requests, access restricted data or depend on the original website's backend.

Where the original backend is unavailable, implement an equivalent independent backend.

---

## 4. Technology stack

Use the following preferred technologies unless the audit establishes a strong technical reason to choose an alternative.

### Frontend

- Next.js with App Router
- React
- TypeScript with strict mode
- Tailwind CSS
- Custom CSS and CSS variables
- Motion / Framer Motion
- GSAP only for complex verified animations
- Embla Carousel
- Lucide React
- Custom SVG illustrations
- React Hook Form
- Zod

### Backend

- Next.js Route Handlers
- PostgreSQL
- Supabase
- Server-side validation
- API-based enquiry submission
- Persistent enquiry storage

### Development and testing

- ESLint
- Prettier
- Playwright
- Vitest
- Lighthouse
- Git and GitHub

### Deployment

- Vercel
- Supabase managed database
- Environment variables
- Production build verification

Use stable and mutually compatible dependency versions. Commit the package lockfile.

Avoid unnecessary libraries, excessive client-side rendering and overengineered architecture.

---

## 5. Complete application routing

Implement the following routes:

```text
/
├── /puppies
│   ├── ?origin=local
│   ├── ?origin=imported
│   ├── ?breed=maltipoo
│   ├── ?breed=pomeranian
│   ├── ?breed=poodle
│   ├── ?breed=cavapoo
│   ├── ?breed=shih-tzu
│   └── /[slug]
├── /gone-home
├── /happy-families
├── /how-it-works
├── /faq
└── /contact
```

Verify every exact query value and anchor identifier against the actual website.

Implement all additional public routes discovered during the audit.

Routing requirements:

- Working browser back and forward navigation
- Direct URL access
- Refresh persistence
- Query parameter handling
- Active navigation indicators
- Section anchor navigation
- Correct scroll restoration
- Dynamic puppy routes
- Appropriate page titles and metadata
- Functional custom 404 page
- No broken internal links

---

## 6. Global design system

Reproduce the original TeddyPups visual identity.

The website uses a premium, affectionate scrapbook and illustrated storybook concept.

Investigate and recreate all observed:

- Paper-inspired backgrounds
- Handwritten annotations
- Decorative stamps
- Heart motifs
- Paw illustrations
- Hand-drawn arrows
- Sketch-style graphics
- Polaroid-inspired imagery
- Organic shapes
- Puppy passport designs
- Ticket-inspired adopted puppy cards
- Letter-style contact forms
- Custom decorative dividers
- Layered and rotated imagery

Define global CSS design tokens for colors, typography, layout, animation and spacing.

Preserve the positioning, proportions and visual hierarchy of decorative elements.

Do not introduce generic gradients, glassmorphism, dashboard cards, excessive shadows or modern UI elements unless they appear on the reference.

---

## 7. Global header and navigation

Create a reusable header component matching the reference.

Include:

- TeddyPups brand identity
- Brand tagline
- Home
- Puppies
- Happy Families
- How It Works
- FAQ
- Visit & Contact
- WhatsApp CTA
- Mobile menu trigger

Implement:

- Exact logo placement
- Correct desktop navigation alignment
- Active route styling
- Reference hover effects
- Header positioning and scroll behavior
- Mobile menu opening and closing animations
- Reference menu illustration and decorative text
- Mobile contact information
- Menu dismissal after navigation

Support keyboard navigation, Escape-to-close behavior, focus restoration and body scroll locking when an overlay menu is open.

---

## 8. Homepage implementation

Recreate the complete homepage in its original section order.

### Section 1 — Hero

Reproduce the premium teacup puppy hero section.

Include:

- Brand tagline
- Primary headline
- Supporting content
- Available puppies CTA
- WhatsApp enquiry CTA
- Puppy imagery
- Featured puppy names
- All decorative graphics

The public homepage exposes six featured puppy labels:

- Max
- Korean Teacup Maltipoo
- Korean Teacup Poodle
- Maltipoo & Cavapoo
- Toy Poodle
- Maltipoo

Inspect whether these are displayed as slides, stacked cards or another animated presentation.

Reproduce the actual behavior, including slide movement, pagination, autoplay, drag interactions and transition timing wherever present.

### Section 2 — Meet the Pups

Build the complete featured puppy showcase.

Implement all 15 available puppy listing targets in their observed order.

Each card should reproduce:

- Actual puppy media, where authorised
- Name or breed
- Gender
- Age
- Availability status
- Video indicator where applicable
- Original framing
- Decorative elements
- Hover and interaction behavior
- Navigation to its individual profile

Implement the final link leading to the complete puppy catalogue.

### Section 3 — Two ways to meet your puppy

Recreate both adoption pathway cards.

**Local puppies:**

- Dubai showroom imagery
- Local availability content
- Original illustrations
- CTA to `/puppies?origin=local`

**Imported puppies:**

- Imported puppy content
- Reference graphics and media
- CTA to `/puppies?origin=imported`

Preserve the original card layout, typography, decorative elements and transitions.

### Section 4 — Puppy journey

Reproduce the three-stage adoption journey:

1. Breed selection
2. Receiving puppy photographs and information
3. Safe delivery

Recreate the numbered layout, accompanying graphics and visual connections between steps.

Include the associated navigation to the How It Works page.

### Section 5 — WhatsApp conversation experience

Recreate the WhatsApp-inspired conversation preview visible on the homepage.

Include:

- Business avatar
- Business name
- Online status presentation
- Incoming and outgoing message bubbles
- Puppy photographs
- Breed selection chips
- Conversation styling
- WhatsApp CTA

Breed chips:

- Maltipoo
- Pomeranian
- Poodle
- Cavapoo
- Shih Tzu

Each chip must navigate to its corresponding verified catalogue query route.

Inspect whether messages, photographs and status indicators animate into view.

Reproduce the observed animation sequence.

This is a demonstrative conversation interface unless the reference shows genuine messaging functionality. Do not claim it represents an actual live chat connection.

### Section 6 — Trust and puppy passport

Recreate the puppy passport-inspired trust section.

Include the four trust categories covering:

- Veterinary health checks
- Safe international transport
- Ongoing customer support
- Worldwide family trust

Match all decorative illustrations, stamps, icons and passport styling.

### Section 7 — Happy families preview

Include:

- Original section arrangement
- Customer testimonial presentation
- Eight featured family photograph targets
- Image captions
- Link to the complete Happy Families page

Recreate any verified gallery movement, hover interactions or photograph lightboxes.

### Section 8 — FAQ preview

Include the three homepage questions covering:

- Vaccinations and health checks
- Meeting puppies in person
- Same-day collection

Reproduce the reference interaction model.

Include the link to the complete FAQ page.

### Section 9 — Final CTA

Recreate the final adoption CTA section with:

- Heading
- Supporting content
- Featured puppy imagery
- Welcome-home motif
- WhatsApp enquiry button
- Visit and contact button
- Decorative graphics

### Section 10 — Footer

Implement the global footer as specified in the footer section below.

---

## 9. Available puppies catalogue

Route: `/puppies`

Reproduce the complete catalogue layout, heading, sketchbook theme and all puppy cards.

### Available puppy data

Seed the following 15 listing targets:

| Slug | Breed / Name | Gender | Age | Video |
|---|---|---|---|---|
| maltipoo-max-male | Max — Maltipoo | Boy | 3 months | Yes |
| korean-teacup-maltipoo-female | Korean Teacup Maltipoo | Girl | 2 months | Yes |
| korean-teacup-poodle-female | Korean Teacup Poodle | Girl | 2 months | No |
| maltipoo-cavapoo-male | Maltipoo & Cavapoo | Boy | 3 and 2 months | Yes |
| toy-poodle-male-female | Toy Poodle | Boy & Girl | 2 months | No |
| maltipoo-female-2 | Maltipoo | Girl | 3 months | Yes |
| pomeranian-female | Pomeranian | Girl | 3 months | No |
| copper-male | Copper — Cavapoo | Boy | 2 months | No |
| shitzu-female | Shih Tzu | Girl | 2 months | No |
| shitzu-male | Shih Tzu | Boy | 2 months | No |
| maltipoo-female-1 | Maltipoo | Girl | 2.5 months | No |
| maltipoo-female | Maltipoo | Girl | 2 months | No |
| korean-teacup-pomeranian-1 | Korean Teacup Pomeranian | Girl | 2 months | No |
| korean-teacup-pomeranian | Korean Teacup Pomeranian | Girl | 2 months | No |
| korean-teacup-pomeranian-male | Korean Teacup Pomeranian | Boy | 2 months | No |

Verify the data against each individual reference profile.

Preserve the original slugs, including unconventional spellings.

### Catalogue functionality

Inspect and implement the original behavior for:

- Local and imported origin parameters
- Breed-specific parameters
- Combination of query parameters, if supported
- Direct filtered URL navigation
- Card interactions
- Responsive card layout
- Empty results handling
- Browser navigation

The query parameter links are confirmed, but their filtering effect must be verified in a live browser. If the reference does not filter correctly, document the discrepancy and implement meaningful filtering without changing the visible design unnecessarily.

Do not add unobserved sorting controls or filter panels merely for decoration.

### Adopted puppies preview

Include the five observed adopted puppy preview cards:

- Ace
- Leo
- Mia
- Sadie
- Pomeranian

Include navigation to the complete Gone Home page.

---

## 10. Individual puppy profile pages

Route: `/puppies/[slug]`

Build a reusable dynamic profile template.

It must support every available and adopted puppy rather than hardcoding separate pages.

### Profile header

Include:

- Breadcrumb navigation
- Puppy name
- Breed
- Gender
- Age
- Origin information
- Availability or adopted badge
- Additional descriptions if available

Distinguish between named puppies and unnamed breed-based listings.

### Multimedia gallery

Implement:

- Main photograph viewer
- Previous and next buttons
- Image position indicator
- Thumbnail strip
- Active thumbnail state
- Video thumbnail indicators
- Video playback
- Appropriate transitions
- Touch gestures where observed
- Keyboard navigation
- Loading and error states

Representative media counts already identified:

- Max: 2 media items
- Korean Teacup Maltipoo: 11 media items
- Korean Teacup Poodle: 4 media items
- Maltipoo & Cavapoo: 3 media items
- Ace: 4 media items

Audit every remaining profile and preserve its actual media count and ordering.

If the reference provides a lightbox, reproduce its appearance and functionality.

### Puppy health information

Reproduce the health-information section and its illustrations, covering:

- Vaccination
- Deworming
- Veterinary certification
- Health examination

These are reference-site content elements, not independently verified health claims. Do not represent assessment data as current commercial inventory.

### Adoption journey

Conditionally render the correct journey based on the puppy's origin and status.

For imported puppies, reproduce:

1. Reservation
2. Personal consultation
3. Import and arrival
4. Settling into the new home

For local puppies, reproduce the verified local adoption process.

For adopted puppies, reproduce the reference's alternate layout and enquiry intent.

### Profile CTAs

Implement:

- Puppy-specific WhatsApp enquiry
- Similar-puppy enquiry for adopted puppies
- Scroll-to-enquiry CTA
- Previous puppy navigation
- Next puppy navigation

Preserve the navigation sequence and wraparound behavior where observed.

### Puppy-specific enquiry form

Include:

- Name — required
- Phone or WhatsApp — required
- Email — optional
- Area — optional
- Associated puppy identifier
- Prefilled puppy-specific message
- Hidden anti-spam field
- Submit button

Implement real form validation, enquiry persistence and submission feedback.

---

## 11. Gone Home page

Route: `/gone-home`

Recreate the adopted puppy archive with its ticket-inspired visual theme.

The reference contains 27 adopted puppy listing targets.

Preserve:

- Exact card order
- Puppy names
- Breeds
- Gender
- Photographs
- Origin labels
- Adopted status
- Ticket-style decorations
- Heart motifs
- Hover effects

Every adopted puppy card must open its corresponding dynamic profile.

Adopted puppy profiles must not display the puppy as available.

Instead, provide an enquiry option for finding a similar puppy.

Include the CTA returning users to available puppies.

Crawl all 27 profile links and use their exact original slugs.

---

## 12. Happy Families page

Route: `/happy-families`

Recreate the complete customer gallery.

The public reference describes 64 family moments.

Implement:

- Page heading and introduction
- Photograph count
- Customer testimonial presentation
- All 64 photograph positions
- Exact image ordering
- Existing captions and emojis
- Original gallery arrangement
- Decorative elements
- Responsive gallery layout

Inspect whether the reference uses a masonry grid, scrapbook collage or another custom layout. Implement the actual observed layout.

Where present, reproduce:

- Image hover animations
- Lightbox opening
- Previous and next image controls
- Image captions
- Escape-to-close behavior
- Touch navigation

Use family photographs only if their reuse is authorised. Otherwise, use permitted replacement media with matching aspect ratios and document the substitution.

---

## 13. How It Works page

Route: `/how-it-works`

Recreate the complete adoption information page.

### In-page section navigation

Implement links for:

1. Two adoption pathways
2. Premium puppy promise
3. Delivery and collection
4. Reasons to choose TeddyPups

Preserve the actual anchor IDs and scrolling behavior.

### Local adoption pathway

Recreate the four-step journey:

1. Explore available puppies
2. Select a puppy
3. Meet the puppy
4. Collection or delivery

Include the Dubai showroom content and associated illustrations.

### Imported adoption pathway

Recreate:

1. Reservation
2. Consultation
3. Import process
4. Welcome-home support

Include international sourcing information and all associated visual elements.

Inspect the local/imported selector for tabs, toggles or conditional content. Recreate its exact interaction behavior.

### Premium puppy promise

Include the original presentation covering:

- Selected breeders
- Transparent information
- Safe transport

### Delivery and collection

Include all four delivery categories:

- Same-day collection
- Dubai home delivery
- International cargo
- Worldwide delivery

### Why choose TeddyPups

Include:

- International transport
- Customer support
- Health assurance
- Puppy care guidance

Reproduce section-level animations, decorative elements and final WhatsApp/catalogue CTAs.

---

## 14. FAQ page

Route: `/faq`

Recreate the complete FAQ experience.

Include all nine reference question topics:

1. Vaccination and health checks
2. Meeting puppies before adoption
3. Same-day collection
4. Imported puppies
5. International transportation
6. Photographs and health information
7. Delivery services
8. Available breeds
9. Post-adoption support

### Live FAQ search

Implement the searchable FAQ functionality.

Requirements:

- Instant filtering while typing
- Case-insensitive matching
- Matching against both questions and answers
- Updating result count if appropriate
- Clearing the search
- No-results behavior
- Responsive search field
- Keyboard accessibility

Example search terms:

- Korea
- Delivery
- Vaccinated
- Dubai
- Poodle

Inspect whether FAQ answers are permanently visible, expandable or animated.

Recreate the actual interaction rather than automatically introducing a generic accordion.

Include the WhatsApp button for submitting additional questions.

---

## 15. Visit & Contact page

Route: `/contact`

Recreate the original letter-inspired contact form.

Preserve the visual appearance of an interactive personal letter rather than converting it into a conventional form card.

### Form fields

Include:

- Full name
- Phone or WhatsApp number
- Optional email address
- Area or location
- Optional puppy selection
- Optional personalised message
- Hidden website honeypot field
- Submission button

Inspect the exact field order, required attributes, dropdown options, helper text and validation behavior.

### Form functionality

Implement:

- Client-side validation
- Server-side validation
- Trimmed and normalised inputs
- Phone number validation with country code
- Valid optional email formatting
- Puppy selection
- Loading state
- Duplicate submission prevention
- Success state
- Error state
- Retry handling
- Database persistence
- Honeypot protection
- Basic rate limiting

Never display a successful submission message unless the backend has confirmed successful persistence or delivery.

### Contact information

Recreate:

- WhatsApp link
- Telephone link
- Email link
- Showroom information
- Google Maps CTA
- Showroom imagery

Verify actual destinations during the audit.

The assessment clone must not send real customer enquiries or personal data to the reference business without explicit authorisation.

---

## 16. Complete WhatsApp integration

Build a reusable WhatsApp URL utility.

General structure:

```ts
function buildWhatsAppURL(
  phone: string,
  message: string
): string {
  const normalizedPhone = phone.replace(/\D/g, "");

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
```

Configure the destination using environment variables.

Inspect each original WhatsApp link and record:

- Button location
- Destination number
- Prefilled message
- Desktop behavior
- Mobile behavior

Implement appropriate messages for:

- General enquiries
- Specific puppies
- Imported puppies
- Similar adopted puppies
- FAQ questions
- Showroom visits, if applicable

Example puppy-specific message:

```text
Hi! I'd love to know more about Max, the Maltipoo puppy.
```

Required behavior:

- Correct international number formatting
- Proper URL encoding
- Functional mobile WhatsApp redirection
- Functional desktop WhatsApp redirection
- Correct puppy context
- No accidental automatic message sending
- Safe external links

Use an authorised test number for demonstrations and document any placeholder contact values found in the reference.

Do not implement a paid WhatsApp Business API or chatbot unless genuinely required by verified reference functionality.

---

## 17. Footer and persistent contact controls

Recreate the complete global footer.

Include:

- Brand logo and description
- Available puppies
- Gone Home
- Happy Families
- How It Works
- Delivery and collection
- FAQ
- Visit and contact
- WhatsApp information
- Email information
- Showroom location
- Instagram
- TikTok
- Facebook
- Copyright
- Brand tagline

Inspect and reproduce the persistent WhatsApp and Call controls, particularly on mobile.

Implement all verified external destinations.

Where reference links lead to placeholders, preserve the intended function using configurable demonstration destinations rather than silently inventing business accounts.

---

## 18. Animation and transition system

Animation accuracy is a primary evaluation criterion.

Implement every motion behavior recorded in the animation inventory.

Pay particular attention to:

- Initial page entrance
- Hero text and image transitions
- Carousel transitions
- Staggered content reveals
- Scroll-triggered animations
- Decorative element motion
- Card hover transformations
- Button interaction effects
- Mobile navigation transitions
- Image gallery transitions
- WhatsApp conversation animation
- FAQ state transitions
- Form focus and submission feedback
- Page navigation transitions
- Footer entrance effects

Only implement these effects where they are observed in the reference.

Use the simplest suitable technology:

- CSS transitions for basic interactions
- CSS keyframes for repeating decorative effects
- Motion for component and layout animations
- GSAP for complex timelines where necessary
- IntersectionObserver for scroll-triggered behavior

Performance requirements:

- Prefer transform and opacity animations
- Avoid layout thrashing
- Prevent animation-induced layout shifts
- Clean up animation listeners
- Stop offscreen animation where appropriate
- Respect `prefers-reduced-motion`
- Ensure mobile performance
- Avoid hydration errors

Match observed duration, easing, direction, delay, stagger and scale.

Do not approximate all animations with a single generic fade-in effect.

---

## 19. Asset management

Inventory all publicly accessible and authorised website assets.

Include:

- Logos
- Icons
- SVG illustrations
- Puppy photographs
- Puppy videos
- Customer photographs
- Decorative textures
- Fonts
- Background images
- Stamps and illustrations

Organise permitted media inside the project or dedicated storage.

```text
public/
├── images/
│   ├── brand/
│   ├── hero/
│   ├── puppies/
│   ├── adopted/
│   ├── families/
│   ├── illustrations/
│   ├── backgrounds/
│   └── showroom/
├── videos/
├── fonts/
└── icons/
```

Create an asset manifest containing:

- Original source URL
- Local path
- Asset type
- Dimensions
- Usage location
- Permission or attribution requirements
- Replacement status, where applicable

Do not depend on unstable hotlinked media.

Optimise photographs while preserving quality. Preserve video aspect ratios and thumbnails.

Never redistribute copyrighted or private media without permission.

---

## 20. Backend and database architecture

Implement the public behavior independently using a maintainable backend.

These are proposed implementation models, not claims about the original website's private database.

### Puppies table

```text
id
slug
name
breed
gender
age_display
origin
status
description
cover_image
featured
sort_order
created_at
updated_at
```

Supported status values:

```text
available
adopted
```

Supported origin values:

```text
local
imported
```

### Puppy media table

```text
id
puppy_id
media_type
media_url
thumbnail_url
alt_text
sort_order
```

### Family gallery table

```text
id
image_url
caption
alt_text
sort_order
```

### FAQ table

```text
id
question
answer
sort_order
```

### Enquiries table

```text
id
name
phone
email
area
puppy_id
message
source_page
status
created_at
```

Create:

- Database migrations
- Seed scripts
- TypeScript data models
- Repository functions
- Validation schemas
- Appropriate unique constraints
- Foreign key relationships
- Indexes for relevant queries

The initial dataset must include all 42 catalogue profile targets, 64 family gallery positions and nine FAQ entries.

Use seeded demonstration data instead of continuously scraping the reference website.

---

## 21. API implementation

Implement appropriate APIs where needed.

```text
GET  /api/puppies
GET  /api/puppies/[slug]
GET  /api/families
GET  /api/faqs
POST /api/enquiries
```

Optional:

```text
GET /api/health
```

These APIs are implementation recommendations, not verified reference endpoints.

Support:

- Breed filtering
- Origin filtering
- Availability filtering
- Stable ordering
- Validated identifiers
- Correct HTTP status codes
- Consistent response structures
- Structured error handling

Example enquiry response:

```json
{
  "success": true,
  "message": "Enquiry received successfully."
}
```

The form submission endpoint must:

1. Validate the request.
2. Detect honeypot submissions.
3. Apply rate limiting.
4. Validate the associated puppy.
5. Persist the enquiry.
6. Return a meaningful response.

Keep all database credentials server-side.

Implement appropriate Supabase Row Level Security policies, preventing public access to customer enquiry records.

Optional email notification may be implemented using an authorised test email service. Do not consider email delivery successful without confirmation from the provider.

An administration dashboard is not required unless one exists in the authorised assignment scope.

---

## 22. Recommended project structure

```text
teddypups-clone/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── puppies/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── gone-home/
│   ├── happy-families/
│   ├── how-it-works/
│   ├── faq/
│   ├── contact/
│   └── api/
├── components/
│   ├── layout/
│   ├── home/
│   ├── puppies/
│   ├── gallery/
│   ├── animations/
│   ├── forms/
│   ├── faq/
│   ├── contact/
│   └── ui/
├── lib/
│   ├── database/
│   ├── services/
│   ├── repositories/
│   ├── validations/
│   └── whatsapp.ts
├── hooks/
├── types/
├── data/
├── public/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── visual/
├── docs/
├── .github/workflows/
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── playwright.config.ts
```

Use reusable components and separate business logic from presentation.

Keep server and client component boundaries clear.

Avoid creating one excessively large component containing the entire website.

---

## 23. Responsive implementation

Reproduce the original responsive behavior across:

- Large desktop
- Standard desktop
- Laptop
- Tablet landscape
- Tablet portrait
- Large mobile
- Standard mobile
- Small mobile

Verify:

- Navigation adaptation
- Heading line wrapping
- Hero image positioning
- Card column counts
- Section spacing
- Image aspect ratios
- Gallery layout
- Thumbnail scrolling
- Form layout
- Footer layout
- Button sizing
- Decorative element visibility
- Persistent contact controls
- Touch interactions

There must be no unintended horizontal overflow, clipped content, overlapping elements or inaccessible controls.

Do not merely shrink the desktop design for mobile.

Inspect and reproduce the actual mobile composition of every section.

---

## 24. Accessibility

Ensure:

- Semantic HTML
- Meaningful heading hierarchy
- Appropriate alternative text
- Keyboard-accessible navigation
- Accessible form labels
- Accessible validation messages
- Visible keyboard focus states
- Appropriate button semantics
- Modal focus management
- Screen-reader-friendly carousel controls
- Reduced-motion support
- Appropriate color contrast
- Skip-to-content link
- Accessible touch targets

Preserve visual fidelity while improving accessibility where necessary.

Target WCAG 2.2 AA for the implemented interface.

---

## 25. Performance and SEO

Implement:

- Optimised images
- Responsive image loading
- Lazy-loaded below-the-fold assets
- Font optimisation
- Video posters
- Deferred video loading
- Server-rendered static content where appropriate
- Minimal client-side JavaScript
- Appropriate caching
- Code splitting
- Layout stability
- Unique page metadata
- Dynamic puppy page metadata
- Open Graph metadata
- Favicon
- Sitemap
- Robots configuration

Production performance targets:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- LCP: 2.5 seconds or less under representative test conditions
- CLS: 0.1 or less
- INP: 200 milliseconds or less where measurable

Report actual measured results rather than claiming target scores without testing.

Use `noindex` for the public assessment deployment to avoid misleading users or competing with the original business website.

---

## 26. Security requirements

Implement:

- Server-side input validation
- Safe HTML rendering
- XSS prevention
- Parameterised database queries
- Secure environment variables
- Request size limits
- Form rate limiting
- Honeypot spam prevention
- Secure external links
- Appropriate security headers
- Generic production error messages
- Prevention of duplicate enquiries
- Protection of stored customer data

Do not expose:

- API keys
- Database credentials
- Supabase service-role keys
- SMTP passwords
- Personal enquiry details
- Internal stack traces

Provide `.env.example` with variable names and safe placeholder values.

Ensure real secrets are excluded from Git.

---

## 27. Testing strategy

Testing is mandatory. A successful compilation alone is not sufficient.

### Unit tests

Test:

- WhatsApp URL generation
- Phone number validation
- Email validation
- Enquiry schema
- Puppy filtering
- Status handling
- Previous and next puppy selection
- FAQ search
- Media index navigation

### Integration tests

Test:

- Puppy data retrieval
- Dynamic profile lookup
- Invalid slug handling
- Enquiry creation
- Invalid enquiry rejection
- Database failure handling
- Rate limiting
- Honeypot rejection

### End-to-end tests

Use Playwright to test:

- Every navigation link
- All 42 puppy profile destinations
- All available cards
- All adopted cards
- Mobile navigation
- Origin query URLs
- Breed query URLs
- Media galleries
- Video controls
- FAQ searching
- Contact form validation
- Puppy-specific enquiry submission
- Successful database persistence
- WhatsApp link correctness
- Telephone and email links
- Browser back and forward navigation
- Direct URL loading
- Page refresh
- Section anchors
- Error and empty states

Run tests against the clone using isolated test fixtures. Do not submit test forms or messages to the original business.

### Cross-browser testing

Test using:

- Chromium
- Firefox
- WebKit
- Mobile browser emulation

### Visual regression testing

Capture equivalent reference and clone screenshots at the same viewport sizes.

Compare:

- Section boundaries
- Typography
- Colors
- Spacing
- Alignment
- Media positioning
- Card dimensions
- Responsive composition
- Decorative details

Generate screenshot overlays and image difference reports.

Aim for at least 95% visual similarity in stable, comparable regions.

Document the measurement methodology, excluded dynamic regions and asset substitutions.

Never report an unsupported similarity percentage.

### Animation comparison

Compare reference and clone recordings for:

- Scroll timing
- Motion direction
- Easing
- Hover behavior
- Carousel movement
- Menu transitions
- Component entrance and exit behavior

Fix observed discrepancies.

---

## 28. GitHub and development workflow

Create a professional Git repository named:

```text
teddypups-website-clone
```

Use meaningful commits reflecting actual development progress.

Suggested commit milestones:

```text
chore: initialize Next.js project
docs: complete reference website audit
feat: implement design system and navigation
feat: build complete homepage
feat: implement puppy catalogue and dynamic profiles
feat: recreate adopted puppy archive
feat: implement happy families gallery
feat: build adoption journey and FAQ pages
feat: implement contact and enquiry backend
feat: integrate dynamic WhatsApp links
feat: reproduce reference animations
fix: resolve responsive layout issues
test: add unit and end-to-end coverage
test: complete visual regression assessment
docs: add deployment and submission instructions
```

Do not fabricate Git history.

Configure GitHub Actions to run:

- Dependency installation
- Linting
- Type checking
- Unit tests
- Production build
- End-to-end tests where appropriate

---

## 29. Deployment

Deploy the completed application using Vercel.

Deployment workflow:

1. Run the complete local test suite.
2. Verify the production build.
3. Configure Supabase.
4. Run database migrations.
5. Seed authorised demonstration data.
6. Configure Vercel environment variables.
7. Connect the GitHub repository.
8. Deploy the project.
9. Verify every production route.
10. Test enquiry persistence using demonstration data.
11. Verify WhatsApp destinations without sending messages.
12. Check mobile rendering on the production URL.

Verify the deployed URL independently.

If deployment credentials or authorisation are unavailable, provide precise deployment instructions and identify the blocker.

Never invent a successful deployment or fake URL.

---

## 30. Documentation

Create a professional `README.md` containing:

- Project overview
- Reference website
- Assignment objectives
- Feature inventory
- Technology stack
- Architecture
- Project structure
- Installation instructions
- Environment configuration
- Database setup
- Development commands
- API documentation
- Testing instructions
- Deployment instructions
- Demo screenshots
- Implementation decisions
- Known limitations
- Asset attribution
- Live deployment URL
- Loom video URL

Required documentation files:

```text
docs/
├── REFERENCE_AUDIT.md
├── DESIGN_SYSTEM.md
├── ANIMATION_INVENTORY.md
├── ASSET_MANIFEST.md
├── ARCHITECTURE.md
├── IMPLEMENTATION_DECISIONS.md
├── FEATURE_PARITY.md
├── TEST_REPORT.md
├── AI_PROMPTS.md
├── DEPLOYMENT.md
├── LOOM_SCRIPT.md
└── SUBMISSION.md
```

The feature parity document must track:

```text
Feature | Reference behavior | Clone behavior |
Test evidence | Status | Known discrepancy
```

Use statuses:

- Verified
- Implemented
- Partially implemented
- Not implemented
- Not independently verifiable

Do not mark a feature verified unless it has actually been tested.

---

## 31. AI usage documentation

The assignment explicitly requires disclosure of AI tools and exact prompts.

Maintain `docs/AI_PROMPTS.md` throughout development.

Record:

- AI tool name
- Model name when known
- Date
- Task
- Exact prompt submitted
- AI-generated output summary
- Manual modifications
- Validation performed
- Issues encountered

Include this master prompt in full.

Also record subsequent prompts used for:

- Website investigation
- UI implementation
- Animation recreation
- Backend development
- Debugging
- Testing
- Deployment

Explain how AI was used to accelerate development while implementation decisions and output correctness were independently reviewed.

Never fabricate AI tool interactions or claim manual work that was not performed.

---

## 32. Loom video preparation

Create a structured Loom recording script lasting approximately 8–12 minutes.

### Part 1 — Project introduction

Explain:

- Assignment objective
- Reference website
- Live deployed clone
- Overall implementation approach

### Part 2 — Reference and clone comparison

Show both websites using identical viewport sizes.

Demonstrate:

- Homepage design
- Typography
- Layout
- Animations
- Puppy cards
- Gallery behavior
- Desktop and mobile navigation

### Part 3 — Functional demonstration

Show:

- Puppy catalogue
- Breed and origin navigation
- Individual puppy profile
- Image and video gallery
- Adopted puppy profiles
- Happy Families page
- Adoption pathways
- Live FAQ search
- WhatsApp link generation
- Contact form validation
- Successful demonstration enquiry submission
- Database persistence

### Part 4 — Architecture

Show:

- Next.js routing
- Reusable components
- Data models
- Database schema
- Backend APIs
- Validation
- Animation architecture
- Responsive design system

### Part 5 — AI tools and exact prompts

Show `docs/AI_PROMPTS.md`.

Explain the actual tools used, exact prompts, how generated code was reviewed and how implementation issues were corrected.

### Part 6 — Challenges and implementation decisions

Explain actual challenges encountered, such as:

- Matching complex layouts
- Preserving media proportions
- Reproducing animation timing
- Responsive scrapbook layouts
- Dynamic profile generation
- Replicating observable functionality without access to the original backend

Explain only challenges that actually occurred.

### Part 7 — Testing and deployment

Show:

- Test execution
- Visual regression results
- Lighthouse report
- GitHub repository
- Commit history
- Vercel deployment
- Production URL

Finish by demonstrating the deployed application.

Do not fabricate a Loom recording. Generate the script and recording checklist if screen recording access is unavailable.

---

## 33. Execution phases

Execute the project in the following order.

**Phase 1:** Complete website crawling, visual inspection and feature inventory.

**Phase 2:** Extract the design system and create the project architecture.

**Phase 3:** Implement the global header, footer and shared components.

**Phase 4:** Implement the complete homepage.

**Phase 5:** Implement the catalogue, all puppy profiles and adopted archive.

**Phase 6:** Implement Happy Families, How It Works, FAQ and Contact.

**Phase 7:** Implement database, APIs, enquiry forms and external integrations.

**Phase 8:** Recreate and tune every verified animation.

**Phase 9:** Complete responsive and accessibility improvements.

**Phase 10:** Execute unit, integration, browser and visual regression tests.

**Phase 11:** Resolve all critical defects and visual mismatches.

**Phase 12:** Deploy, verify production and prepare documentation.

**Phase 13:** Prepare the Loom script and final submission.

Complete the implementation, not just the planning.

After each phase, run relevant checks and update the feature parity report.

---

## 34. Final acceptance criteria

The project is considered complete only when:

- Every discovered public route is implemented.
- All 15 available puppy targets are present.
- All 27 adopted puppy targets are present.
- All 42 puppy profile destinations resolve correctly.
- All 64 family gallery positions are implemented.
- All nine FAQ entries are present.
- FAQ search works.
- Query parameter navigation works.
- Media galleries work.
- Available and adopted states are correct.
- Enquiry forms validate and persist data.
- WhatsApp links use correct contextual messaging.
- Desktop and mobile layouts match the reference closely.
- All observed animations are reproduced or discrepancies documented.
- No critical browser console errors exist.
- No broken internal links exist.
- No missing required media exist.
- No unintended horizontal overflow exists.
- No exposed credentials exist.
- Core automated tests pass.
- Production build succeeds.
- GitHub contains the complete source code.
- The live deployment is verified.
- AI prompts are documented.
- The Loom recording or recording preparation is complete.

Do not declare completion until these criteria have been evaluated.

---

## 35. Final deliverable report

At the end of the implementation, provide:

```text
PROJECT: TeddyPups U.A.E. Website Clone

Live URL:
GitHub Repository:
Loom Video:

IMPLEMENTATION
Pages completed:
Puppy profiles completed:
Gallery entries completed:
Interactive features completed:

QUALITY
Visual comparison result:
Unit test results:
Integration test results:
End-to-end test results:
Lighthouse performance:
Accessibility:
Known limitations:

DEPLOYMENT
Production build status:
Database status:
Production verification status:
```

Use actual measured values.

Clearly disclose incomplete work, unavailable credentials, unresolved issues and any differences from the reference.

## FINAL INSTRUCTION

Begin by thoroughly investigating https://puppy.instabizweb.com/ using browser inspection.

Create the reference audit, route inventory, asset manifest, design system, animation inventory and implementation checklist.

Then proceed with the complete implementation.

Prioritise reference fidelity over personal design preferences. Every page, component, animation, transition, interaction and functional behavior must be implemented according to verified evidence.

The final result should look and behave as closely as possible to the reference website while maintaining professional engineering standards.

Do not stop after creating a homepage, project scaffold, implementation plan or static mockup.

Deliver the complete, tested, deployable full-stack application.

## User clarifications (verbatim)

- Yes, reuse is authorized
- use the one that is used only

## Work log

Reference inspection: rendered DOM, screenshots, HTTP crawl and public CSS. Discovered placeholder contact destinations and ignored query filtering. Browser audit limited by certificate trust failure in independent Chromium; no bypass attempted. Automatic review blocked source form submission; no test enquiry sent. Implementation and validation entries follow after execution.

## Subsequent user prompts (verbatim)

- continue where you left
- show me the website till you have created
- continue where you left , dont show website continue with the master prompt that i provided
- continue where it left
- before the limit excedd ,just when 2 percent limit is there stop the session so that it cannot be interuppted and give me the zip file , till that much work had been done

## Implementation and validation

Codex generated the TypeScript application, backend, migrations, tests and documentation in this same conversation; no separate AI service or subagent prompts were used. Tools executed the saved audit scripts, npm installation, build, lint, type checking, Vitest and Playwright. All review and fixes were agent-driven, not claimed as manual human work. Exact generated scripts and final source are retained in the archive. Test-reported defects were corrected, including font paths, validation origin checks and missing-route HTTP status. A checkpoint archive was created at the user's request.
