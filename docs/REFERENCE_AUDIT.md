# Reference audit — 2026-11-20

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
| `/` | 200 | Premium teacup puppies in Dubai; Meet the pups; Two ways to meet your puppy; Puppies in Dubai; Imported for you; Your puppy journey; Choose your breed; Get photos & details; Secure & safe delivery; Why families trust TeddyPups; Happy families & puppies; Questions, answered; Ready to meet your new best friend?; Explore; Say hello | Pending |
| `/puppies` | 200 | Available puppies; Already gone home; Explore; Say hello | Pending |
| `/happy-families` | 200 | Happy families; Explore; Say hello | Pending |
| `/how-it-works` | 200 | How it works; Two ways home; Meet your puppy in person; Order upon request; Our premium puppy promise; Delivery & collection; Take your puppy home the same day; Delivery within Dubai; Safe international cargo; Worldwide delivery; Why choose us; International cargo; Support 24/7; Health guarantee; Unique and high quality puppies; Explore; Say hello | Pending |
| `/faq` | 200 | Questions & answers; Are your puppies vaccinated and health-checked?; Can I meet a puppy before I decide?; Can I take my puppy home the same day?; Do you import puppies from abroad?; How does an imported puppy travel to Dubai?; Will I see photos and health details first?; Do you deliver?; Which breeds do you usually have?; Is there help after my puppy comes home?; Explore; Say hello | Pending |
| `/contact` | 200 | Get in touch with us; Visit us in Downtown Dubai; Explore; Say hello | Pending |
| `/puppies/maltipoo-max-male` | 200 | Explore; Say hello; Max; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about Max | Pending |
| `/puppies/korean-teacup-maltipoo-female` | 200 | Explore; Say hello; Korean Teacup Maltipoo; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/korean-teacup-poodle-female` | 200 | Explore; Say hello; Korean Teacup Poodle; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/maltipoo-cavapoo-male` | 200 | Explore; Say hello; Maltipoo & Cavapoo; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/toy-poodle-male-female` | 200 | Explore; Say hello; Toy Poodle; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/maltipoo-female-2` | 200 | Explore; Say hello; Maltipoo; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/pomeranian-female` | 200 | Explore; Say hello; Pomeranian; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/copper-male` | 200 | Explore; Say hello; Copper; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about Copper | Pending |
| `/puppies/shitzu-female` | 200 | Explore; Say hello; Shih Tzu; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/shitzu-male` | 200 | Explore; Say hello; Shih Tzu; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/maltipoo-female-1` | 200 | Explore; Say hello; Maltipoo; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/maltipoo-female` | 200 | Explore; Say hello; Maltipoo; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/korean-teacup-pomeranian-1` | 200 | Explore; Say hello; Korean Teacup Pomeranian; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/korean-teacup-pomeranian` | 200 | Explore; Say hello; Korean Teacup Pomeranian; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/puppies/korean-teacup-pomeranian-male` | 200 | Explore; Say hello; Korean Teacup Pomeranian; Every Teddy Pup comes; Coming home from abroad; Reserve your puppy; Personalized consultation; Import and arrival; Welcome home; Ask about this puppy | Pending |
| `/gone-home` | 200 | Gone home; Explore; Say hello | Pending |
| `/cdn-cgi/l/email-protection` | 404 | Email Protection; You are unable to access this email address instabizweb.com | Pending |
| `/puppies/pomeranian-ace-boy` | 200 | Explore; Say hello; Ace; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/poodle-leo-male` | 200 | Explore; Say hello; Leo; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltipoo-mia-girl` | 200 | Explore; Say hello; Mia; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltipoo-sadie-girl` | 200 | Explore; Say hello; Sadie; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/blue-marle-pomeranian` | 200 | Explore; Say hello; Pomeranian; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomsky-ollie-boy` | 200 | Explore; Say hello; Ollie; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltipoo-bruno-boy` | 200 | Explore; Say hello; Bruno; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltese-buddy-male` | 200 | Explore; Say hello; Buddy; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltese-charlie-male` | 200 | Explore; Say hello; Charlie; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomeranian-daisy-girl` | 200 | Explore; Say hello; Daisy; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomeranian-bella-female` | 200 | Explore; Say hello; Bella; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/poodle-teddy-male` | 200 | Explore; Say hello; Teddy; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/poodle-molly-female` | 200 | Explore; Say hello; Molly; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomski-coco-girl` | 200 | Explore; Say hello; Coco; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomsky-rosie-girl` | 200 | Explore; Say hello; Rosie; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomeranian-leo-boy` | 200 | Explore; Say hello; Leo; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/poodle-molly-girl` | 200 | Explore; Say hello; Molly; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/poodle-rocky-boy` | 200 | Explore; Say hello; Rocky; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltipoo-sophie-girl` | 200 | Explore; Say hello; Sophie; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltipoo-lola-girl` | 200 | Explore; Say hello; Lola; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomeranian-rex-boy` | 200 | Explore; Say hello; Rex; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomsky-finn-male` | 200 | Explore; Say hello; Finn; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltipoo-zoe-girl` | 200 | Explore; Say hello; Zoe; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/pomeranian-mimi-girl` | 200 | Explore; Say hello; Mimi; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/bichon-bailey-boy` | 200 | Explore; Say hello; Bailey; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/puppy` | 200 | Explore; Say hello; Maltipoo; Every Teddy Pup comes; Looking for a puppy like this? | Pending |
| `/puppies/maltipo` | 200 | Explore; Say hello; Poodle; Every Teddy Pup comes; Looking for a puppy like this? | Pending |

## Profile data

| Slug | Status | Origin | Media |
|---|---|---|---|
| maltipoo-max-male | available | imported | 2 |
| korean-teacup-maltipoo-female | available | imported | 11 |
| korean-teacup-poodle-female | available | imported | 4 |
| maltipoo-cavapoo-male | available | imported | 3 |
| toy-poodle-male-female | available | imported | 3 |
| maltipoo-female-2 | available | imported | 7 |
| pomeranian-female | available | imported | 3 |
| copper-male | available | imported | 4 |
| shitzu-female | available | imported | 2 |
| shitzu-male | available | imported | 2 |
| maltipoo-female-1 | available | imported | 4 |
| maltipoo-female | available | imported | 4 |
| korean-teacup-pomeranian-1 | available | imported | 2 |
| korean-teacup-pomeranian | available | imported | 2 |
| korean-teacup-pomeranian-male | available | imported | 4 |
| pomeranian-ace-boy | adopted | imported | 4 |
| poodle-leo-male | adopted | imported | 4 |
| maltipoo-mia-girl | adopted | local | 4 |
| maltipoo-sadie-girl | adopted | imported | 4 |
| blue-marle-pomeranian | adopted | imported | 1 |
| pomsky-ollie-boy | adopted | imported | 3 |
| maltipoo-bruno-boy | adopted | local | 4 |
| maltese-buddy-male | adopted | local | 1 |
| maltese-charlie-male | adopted | imported | 1 |
| pomeranian-daisy-girl | adopted | local | 1 |
| pomeranian-bella-female | adopted | imported | 1 |
| poodle-teddy-male | adopted | imported | 1 |
| poodle-molly-female | adopted | local | 1 |
| pomski-coco-girl | adopted | imported | 3 |
| pomsky-rosie-girl | adopted | local | 4 |
| pomeranian-leo-boy | adopted | local | 5 |
| poodle-molly-girl | adopted | imported | 3 |
| poodle-rocky-boy | adopted | imported | 3 |
| maltipoo-sophie-girl | adopted | local | 3 |
| maltipoo-lola-girl | adopted | local | 4 |
| pomeranian-rex-boy | adopted | imported | 3 |
| pomsky-finn-male | adopted | imported | 1 |
| maltipoo-zoe-girl | adopted | imported | 5 |
| pomeranian-mimi-girl | adopted | local | 6 |
| bichon-bailey-boy | adopted | local | 3 |
| puppy | adopted | imported | 1 |
| maltipo | adopted | local | 1 |
