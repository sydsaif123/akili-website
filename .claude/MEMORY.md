# Session memory -- akili-website

## Current status
- Phase: Design and content refresh, on branch `design/restrained-palette`
- Last action: Rotating proof moved inside the teal hero; separate band removed
- Next action: Push branch and open PR for team review

## Decisions made
| Date | Decision | Reason |
|------|----------|--------|
| 2026-09-27 | Logo stays exactly as-is (#FF4413 vermilion, #969292 warm grey). The page palette moves to serve it, not the reverse. | The mark is the fixed brand asset. Recolouring it to fit the page was the wrong direction. |
| 2026-09-27 | Vermilion appears in the logo only. Zero references in the stylesheet. | A 100% saturation red-orange on a control reads as an error state, not an invitation. Premium sites keep the brand's hot colour off the CTA. |
| 2026-09-27 | Interaction colour is verdigris #226D60 -- the ground hue (170) lifted, not a new hue. | A hover in the brand's own hue reads as the page responding. An unrelated hue reads as decoration. Earlier bronze/sienna attempts both read as brown. |
| 2026-09-27 | Neutrals warmed from hue 220 cool slate to hue ~23. | The logo's grey is a warm neutral at hue 0. The 220-degree disagreement was the real mismatch, not the orange. |
| 2026-10-04 | Buttons are pills in sentence case; cards carry a 14px radius. Georgia serif retained. | Borrowed from revolut.com. The serif is the "advisory firm not startup" signal -- switching to geometric sans is a separate identity decision, not taken. |
| 2026-10-04 | "Vendor independent / we do not sell technology" removed site-wide. Replaced with "No Sales Agenda": partnerships held and disclosed, but no vendor pushing. | The old claim directly contradicted being the official Africa implementation partner for NewgenONE. |
| 2026-10-04 | Maturity journey (Gen 1-4), governance practice (Hierarchies/Committees/Conglomerates) and the four founding-partner bios stay OFF the website. | Reserved as pitch material. The site earns the meeting; the deck delivers the substance. Putting everything online leaves nothing to present. |
| 2026-10-04 | The three proof figures rotate INSIDE the teal hero, between the headline and the CTA. Headline and "Start a conversation" both stay static; only the figures move. The separate bone band is gone. | One block instead of two: About moved up 121px and the page lost 206px. Earlier attempts (strip inside a 756px hero, then a separate band) were both rejected. |
| 2026-10-04 | Preloader hidden via `<noscript>`. | Pre-existing bug: the overlay is removed by script, so with JS disabled it covered the whole site permanently. Present on live main too. |
| 2026-10-04 | Nothing from Rwanda_Digital_Transformation_Roadmap_v8.pptx or Akili_Response_to_Irembo1.9.pptx appears on the site. | Client-confidential. The Irembo deck contains a slide marked "Not for distribution. For Akili partner review only." Used only to understand capability. |

| 2026-10-04 | Single type scale in :root -- 11 / 14 / 16 / 20 / 24 / 38 / 52 px. Every section heading, card sub-head and body paragraph pulls from it. | Sizes had drifted per section: sub-heads at 22/19/22/20 and body at 18/17/14 made About read heavy and Services read small. Do not set a font-size outside these tokens. |
| 2026-10-04 | "We stay until it works." is the closing sentence of the Who We Are paragraph, not a pull-quote. | As a 48px block quote it outsized every section heading and unbalanced the page. |

## Open questions
- [ ] Partnerships section lists Newgen and Cave Digital. The pitch names Smart Governance as the governance platform -- is its omission from the site deliberate?
- [ ] Georgia serif vs a geometric sans for headings. Identity decision, left to the team.

## Session log
| Date | What was done |
|------|---------------|
| 2026-09-27 | Palette rebuilt around the logo; buttons neutralised; headline fitted to one line; commit 1940d70 |
| 2026-10-04 | Hero proof strip added, slider generalised to any [data-slides] container, noscript preloader guard, three specificity collisions fixed |
| 2026-10-04 | About section restructured into lead + auto-rotating slides (no library, degrades without JS); Revolut-style pills and card radii; verdigris interaction colour; all copy rebuilt from pitch deck v2.3 |
