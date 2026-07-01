# Wedding Invitation Gallery — Unique-per-Template Redesign

## Goal
Move away from "one page + color swap". Each invitation becomes its own **design family**: layout, typography, decorations, gallery style, animations, and interactive components all differ. Browsing the gallery should feel like flipping through a curated luxury portfolio.

## Current state (what we keep)
- `WeddingFullPage.tsx` renders a single layout driven by `theme` tokens.
- `GalleryDispatcher` already varies gallery style per theme (good pattern — we'll generalize it).
- 10 themes in `data/themes.ts`, mostly color/decor variants.
- Envelope intro, music player, wishes wall, countdown, RSVP already exist as reusable pieces.

## Architecture: "Template = full composition", not just tokens

Introduce a **Template Registry** where each template is a self-contained React component (its own JSX tree, sections, motion, decorations). Shared primitives (Countdown, RSVP, Gallery variants, MusicPlayer, WishesWall) stay reusable, but **each template arranges them differently**.

```text
src/templates/
  _registry.ts               // id → { meta, Component, thumbnail }
  _shared/
    primitives/              // Countdown, RSVP, Lightbox, Map, Timeline, Gift, DressCode, Guestbook
    galleries/               // 12 gallery variants (see below)
    decor/                   // FloatingPetals, Sparkles, Ribbons, GoldParticles, Sakura, Butterflies, SunRays, PaperFold, GlassOrbs
    motion/                  // tilt, parallax, reveal hooks
  luxury-gold/index.tsx
  modern-minimal/index.tsx
  korean-soft/index.tsx
  japanese-sakura/index.tsx
  vintage-sepia/index.tsx
  rustic-kraft/index.tsx
  garden-botanical/index.tsx
  beach-coastal/index.tsx
  royal-palace/index.tsx
  european-classic/index.tsx
  watercolor-blush/index.tsx
  floral-romance/index.tsx
  boho-desert/index.tsx
  dark-elegant/index.tsx
  emerald-forest/index.tsx
  black-and-gold/index.tsx
  champagne-editorial/index.tsx
  pastel-storybook/index.tsx
  autumn-harvest/index.tsx
  winter-snow/index.tsx
  spring-blossom/index.tsx
  chinese-traditional/index.tsx
  vietnamese-traditional/index.tsx
  sakura-poem/index.tsx
  lavender-field/index.tsx
  rose-garden-magazine/index.tsx
  polaroid-scrapbook/index.tsx
  folded-paper/index.tsx
  glassmorphism-aurora/index.tsx
  timeline-story/index.tsx
```

Each template file owns:
- Its **layout skeleton** (one of ~20 composition archetypes below)
- Its **type pairing** (loaded via Google Fonts on demand)
- Its **color palette** + decoration set
- Its **gallery choice** + **hero style**
- Its **motion language** (dramatic / editorial / soft / cinematic)

`WeddingFullPage` becomes a thin dispatcher: `TemplateRegistry[id].Component(props)`. The `weddingConfigStore` still feeds names/date/venue/photos — templates read the same data, render it differently.

## 20 layout archetypes (each template picks one; no two templates share the same)
1. Fullscreen hero + parallax scroll
2. Magazine editorial (columns + drop caps)
3. Folded paper (CSS 3D fold reveal)
4. Luxury envelope preview (wax seal, opens on click)
5. Scrapbook (tape, torn edges, rotated cards)
6. Glassmorphism aurora (blurred glass panels)
7. Minimal white-space (Swiss grid)
8. Vintage frame (ornate borders, sepia)
9. Floral border wrap
10. Modern editorial split
11. Timeline story (vertical rail)
12. Polaroid collage
13. Storybook (page-turn transitions)
14. Accordion sections
15. Masonry-first
16. Split screen (left fixed / right scroll)
17. Curved sections (SVG dividers)
18. Circular composition (radial hero)
19. Asymmetrical broken grid
20. Floating layered cards (depth stacking)

## 12 gallery variants (each template gets one; increases visible photos)
Masonry · Polaroid scatter · Film strip · Carousel · Floating cards · Timeline photos · Circular cluster · Before/After · Memory collage · Pinterest grid · Magazine spread · Hero+thumbnails

## 3D / depth effects toolkit
Tilt-on-mouse hook, parallax layers, hover lift, glass blur, soft shadow tokens, floating decor (petals/sparkles/butterflies/gold particles), animated ribbons, page-fold CSS, depth stacking via translateZ + perspective.

## Gallery browse page (`/templates`)
Redesign `TemplateGallery.tsx` to make it obvious each card is a different design family:
- Cards use **live mini-previews** (scaled iframes or static hero snippets from the template itself) instead of one uniform thumbnail component.
- Filter chips: Style, Color, Season, Culture.
- Hover: card lifts, plays a 2-second motion loop.
- Layout: broken grid — not equal cells — to reinforce "each is unique".

## Interactive components (drop-in per template)
Countdown · RSVP · Timeline · Map · Gift · Love Story · Family · Dress Code · Music · Guestbook · Slideshow · Lightbox. Each template picks 6–9 of these, arranged differently.

## Mobile-first
Sticky RSVP bar, large touch targets, reduced-motion fallback, responsive gallery variants (masonry→2col, film-strip→horizontal snap, circular→stack).

---

## Phased delivery (this is big — I'll ship in phases and check in)

**Phase A — Foundation (this turn if you approve)**
- Create `src/templates/` structure + registry + dispatcher
- Build shared primitives: `Tilt3D`, `Parallax`, `Reveal`, `FloatingDecor`, `Lightbox`
- Add 6 gallery variants beyond what exists (Floating cards, Timeline photos, Circular cluster, Pinterest, Memory collage, Magazine spread)
- Migrate existing 10 themes into template files (each gets a distinct archetype instead of shared layout)
- Rebuild `/templates` gallery page with broken-grid + live previews

**Phase B — Expand to 20 templates**
- Add 10 new templates covering the missing archetypes (folded paper, envelope, scrapbook, storybook, accordion, curved, circular, split-screen, asymmetric, floating-layered)

**Phase C — Expand to 30 templates + cultural set**
- Chinese, Vietnamese, Korean, Japanese, Islamic, Catholic, seasonal (Autumn/Winter/Spring/Summer), Lavender, Rose Garden, Black&Gold, Champagne, Pastel Storybook

**Phase D — Polish**
- Sticky mobile RSVP, reduced-motion, lightbox everywhere, per-template thumbnail generation, SEO per template

---

## Technical notes
- Fonts loaded per-template via `<link>` injected on mount (avoid bundling 30 font pairs globally).
- Motion via existing `framer-motion`.
- 3D tilt via a small `useTilt` hook (no new dep).
- `weddingConfigStore` gains `photos: string[]` so templates that show many photos have real data.
- Backwards compatible: existing `/invitation/:slug?t=romantic` keeps working — registry maps legacy ids.

## Deliverable
After all phases: **30 templates**, each visually and structurally distinct; a redesigned browse gallery where each card telegraphs its own design family; richer galleries showing many more photos; premium motion + 3D depth throughout; fully responsive.

---

**Reply "go phase A" to start**, or tell me which phase / which specific templates to prioritize first.