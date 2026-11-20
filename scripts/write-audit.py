from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1];D=R/'docs';ref=D/'reference';pages=json.loads((ref/'pages.json').read_text()); pups=json.loads((ref/'puppies-data.json').read_text());css=(ref/'10jf32vdx50lp.css').read_text()
(D/'REFERENCE_AUDIT.md').write_text('''# Reference audit — 2026-11-20

Source: https://puppy.instabizweb.com/. Public read-only HTTP crawl and live Chromium inspection. No source enquiries or messages sent. Media reuse authorized by the user in this chat. Snapshot content is assessment data, not current inventory.

## Evidence and limitations

`reference/pages.json` contains page URLs, statuses, section headings, links, forms, and images. HTML responses are retained for reproducibility (including streamed profile content). `robots.txt` and `sitemap.xml` returned 200. Crawl discovered 49 unique content routes: seven main pages and 42 profiles. An empty pathname duplicated `/`; `/cdn-cgi/l/email-protection` is a broken infrastructure link, not a content route.

Live inspection: homepage, Max profile, FAQ, catalogue local query, How It Works imported tab, Contact. The separate Playwright reference browser failed with ERR_CERT_AUTHORITY_INVALID. Certificate verification was not bypassed. Consequently the nine-size reference screenshot matrix and full animation recordings are NOT complete; screenshots visible in chat cover the accessible browser's desktop viewport only. The audit is complete to available access, not comprehensive visual verification.

## Verified behavior

- Hero is six arched puppy positions around a mascot, not a traditional slider. Its puppy selection changes over time; no visible pagination or drag controls were observed.
- Home: hero, all 15 available cards, two adoption pathways, journey plus demonstrative WhatsApp conversation, passport trust, eight family previews, three static FAQ answers, final CTA, footer.
- Catalogue: sketchbook cards; `?origin=local` still displays 15 cards. Clone must implement meaningful filtering, as requested. All 15 available profiles identify their origin as imported. Local filter should therefore be empty, not relabel inventory.
- Profiles: main image, arrow controls, thumbnails, fullscreen button and videos. Max has two media; selecting video updates count to 2/2. Browser exposed “Unable to play media”; do not claim source video playback verified.
- FAQ: nine folded notes. Search Korea returns two notes, automatically expanded, matching answers. Homepage FAQ is a static definition list.
- How It Works: local/imported tabs hide the alternate panel. Anchors: two-ways, promise, delivery, why.
- Contact: letter form. name and phone required; email/area/puppy/message optional; website honeypot. Validation submission was blocked by automatic approval review due to possible source-side effects. Read-only attributes inspected instead.
- Profile forms include puppy ID and prefilled message; previous/next available navigation wraps from Max back to final Pomeranian.
- Family gallery contains 64 positions and fullscreen controls, with 8 preview photos on home. Preserve page order separately from home preview order.

## Reference inconsistencies

Displayed +971 50 000 0000 is a placeholder. All WhatsApp destinations observed resolve to +91 9898124987 with an agency project message. User explicitly requested retaining the existing destination. Clone uses that configurable number with contextual assessment messages and never sends automatically. Email points to info@instabizweb.com; social links point to https://www.instabizweb.com/. No invented social accounts.

## Network

Reference is Next.js server rendering with streamed React payloads, public `/media/` assets, `/_next/image` optimization and static font/CSS/JS bundles. Data is observable in rendered responses. Original backend writes were not replayed or used. Clone will use independent Supabase/PostgreSQL storage, with an isolated local SQLite development adapter.

## Route inventory

| Route | Response | Sections / profile media | Implementation at audit |
|---|---|---|---|
'''+''.join(f"| `{p['path'] or '/'}` | {p['status']} | {'; '.join(p['headings'])[:500]} | Pending |\n" for p in pages if p['path']!='')+'\n## Profile data\n\n| Slug | Status | Origin | Media |\n|---|---|---|---|\n'+''.join(f"| {p['slug']} | {p['status']} | {p['origin']} | {len(p['media'])} |\n" for p in pups))
tokens=re.findall(r'(--(?:color|font|ease)[\w-]+):([^;}]+)',css)
(D/'DESIGN_SYSTEM.md').write_text('# Observed design system\n\nExtracted from public CSS and checked against computed styles in the live browser. No guessed palette.\n\n'+ '\n'.join(f'- `{a}: {b}`' for a,b in dict(tokens).items())+'\n\nComputed desktop body: Figtree, 17px, rgb(42,23,14), background rgb(255,253,248). Hero h1: Fraunces, 87.89px at observed desktop viewport. Handwritten font: Shantell Sans. Exact selectors, spacing, media queries, z-indices, masks, card tilts and shadows retained in `app/reference.css` with source attribution. This is deliberate preservation of the authorized reference presentation, not a generic template.\n\nNine-viewport computed styles remain unverified because the independent browser hit a certificate error.\n')
rules=[s+'}' for s in css.split('}') if any(k in s for k in ['transition:','animation:','@keyframes'])]
(D/'ANIMATION_INVENTORY.md').write_text('# Animation inventory\n\n## Live observations\n\n- Initial full-screen quilt curtain and walking mascot; clears to page. Exact JS duration not verified.\n- Header transform: 0.5s cubic-bezier(.22,1,.36,1). Logo rotate: 0.6s cubic-bezier(.34,1.56,.64,1).\n- Nav color: 0.25s; paw opacity: 0.25s; paw scale: 0.45s pounce easing.\n- Buttons transform: 0.35s pounce; background 0.25s; shadow 0.35s silk.\n- Hero seats: CSS tp-peek 0.75s, delay .62s + index*90ms; hover lift 12%. Selection changes over time, interval unverified.\n- FAQ folds: grid rows .55s silk; unfold rotates to 0deg, scale 1.015. Search auto-opens matches.\n- Scroll reveals have component-specific CSS; preserve these rather than one universal fade.\n\n## Source stylesheet rules\n\n```css\n'+'\n'.join(rules)+'\n```\n\nFull JS mascot choreography, pointer-follow behavior, timing recordings, and mobile animation parity not independently verified.\n')
(D/'FEATURE_PARITY.md').write_text('# Feature parity\n\n| Feature | Reference behavior | Clone behavior | Test evidence | Status | Known discrepancy |\n|---|---|---|---|---|---|\n| All routes and content | 42 profiles / 64 family photos / 9 FAQ | Pending | reference JSON | Not implemented | None yet |\n| Query filtering | Local parameter ignored | Meaningful filters planned | Browser returned 15 | Not implemented | Intentional fix |\n| Reference visual matrix | Nine viewports requested | Pending | Browser certificate failure | Not independently verifiable | No similarity score |\n')
(D/'IMPLEMENTATION_CHECKLIST.md').write_text('# Implementation checklist\n\n- [x] Crawl all content routes and inventory data\n- [x] Extract design and animation CSS\n- [x] Verify representative live interactions\n- [x] Confirm media reuse authorization\n- [ ] Complete reference screenshot matrix (certificate blocker)\n- [ ] Shared shell and homepage\n- [ ] Catalogue, profile template and archive\n- [ ] Family lightbox, tabs, FAQ, letter forms\n- [ ] Independent database and APIs\n- [ ] Tests, responsive QA, production build\n- [ ] Deployment and submission documentation\n')
(D/'AI_PROMPTS.md').write_text('# AI usage disclosure\n\nTool: OpenAI Codex. Model family: GPT-6; exact serving identifier not exposed. Date: 2026-11-20.\n\nThe user supplied the following exact prompt. Work is AI-generated; no human/manual review is claimed. Source inspection, execution, and test results are reported separately. No subagents were used. Subsequent tool-call scripts are retained under `scripts/`, and validation evidence under `docs/`.\n\n'+(D/'MASTER_PROMPT.md').read_text()+'\n\n## User clarifications (verbatim)\n\n- Yes, reuse is authorized\n- use the one that is used only\n\n## Work log\n\nReference inspection: rendered DOM, screenshots, HTTP crawl and public CSS. Discovered placeholder contact destinations and ignored query filtering. Browser audit limited by certificate trust failure in independent Chromium; no bypass attempted. Automatic review blocked source form submission; no test enquiry sent. Implementation and validation entries follow after execution.\n')
print('Audit documents written')
