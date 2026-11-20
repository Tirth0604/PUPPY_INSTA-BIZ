# TeddyPups parity follow-up

This update addresses the page layout and interaction findings in the [comparison report](TEDDYPUPS_COMPARISON_REPORT.md). The comparison report retains the earlier baseline.

| Matched first viewport | Before | After |
|---|---:|---:|
| Home, 1440 × 900 | 96.78% | 99.63% |
| Home, 390 × 844 | 91.92% | 99.32% |
| Contact, 390 × 844 | 88.30% | 99.83% |
| Max profile, 390 × 844 | 87.60% | 97.81% |
| Ace profile, 390 × 844 | 86.61% | 99.26% |
| Cases meeting the 95% threshold | 12/25 | 25/25 |

The figures use the same Chromium viewport, reduced motion and RGB channel tolerance of 16 as the comparison report. The percentages measure the sampled first viewports. Motion and scroll behavior were checked separately.

- The homepage uses one persistent animated Teddy. It follows the page on desktop, walks in the fixed hallway, peeks on phones and reacts to the pointer. Standalone page and footer mascots animate while visible. Reduced motion leaves the static artwork in place.
- The desktop hallway now pans horizontally as the page scrolls and opens doors when they pass the display threshold. Phones and reduced motion retain the card grid.
- The contact letter restores the stamp, dashed fields and signature. The fictional-data notice stays with the form, and the global assessment disclosure sits in the footer.
- Photo clicks open fullscreen directly. The photo viewer uses the original arrangement of caption and controls, with an elastic drag gesture and a spring-like slide. Video playback retains native controls.
- The project runs on the local production preview with SQLite. The source's exact mascot choreography and fullscreen physics remain approximate. Business account details, remote Supabase, public hosting and native iOS testing require separate verification.

## Verification

- Production build and lint passed. The unit and integration suite passed 42 tests.
- The functional browser suite passed 19 tests with one desktop-only skip for the mobile menu. It covered all 49 public pages, filters, anchors, form persistence and fallback, and reduced motion. The mascot tests were rerun after adjusting the leg joints.
- The [viewport measurements](parity-followup-evidence/visual-results.json) cover all 25 pairs. All scored 97.81% to 99.97%, with no visible missing images or observed horizontal overflow.
- The [hallway measurements](parity-followup-evidence/hallway-motion.json) record 2, 6, and 11 open doors at the same three progress points in both implementations. The [reference hallway](parity-followup-evidence/hallway-original.jpg) and [project hallway](parity-followup-evidence/hallway-project.jpg) show the mid-scroll state.
- Dragging a fullscreen image advanced the Ace gallery from 1 of 4 to 2 of 4.
