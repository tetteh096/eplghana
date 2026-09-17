# EPL Ghana — CMS / Content Studio Plan

> Tracking doc for building the no-code editing experience on top of Payload CMS.
> Keep this updated as we go. Last updated: 2026-06-16.

---

## 1. Goal (in plain words)

Make **everything on the site editable without code**, through an admin that feels
like WordPress / Elementor — not a wall of settings forms.

The owner (Henry) should be able to:
- Open a **Pages** list, click a page, and edit its text + images with the **real
  page shown live next to the fields** (side-by-side live preview).
- Edit the **Header** (menu items, dropdowns, renames, logo, CTA).
- Edit the **Footer** (links, social, copyright).
- Edit **Site Settings** (phone, email, address, social links).

No drag-and-drop layout building. You **edit the content in the slots the design
already has** — the layout can't break.

---

## 2. Stack (the real one)

- **Next.js 16** (App Router) + **React 19**
- **Payload CMS 3.85** (admin at `/admin`)
- **MongoDB** (`@payloadcms/db-mongodb`)
- **Tailwind v4** + **Manrope** font
- S3/MinIO for media in prod; local disk in dev
- Frontend design system = "Charitics" components in `src/components/charitics/`

> NOTE: The old `../PROJECT_STATUS.md` describes a **WordPress/Elementor** plan. That
> is **obsolete** — ignore it. This Next.js + Payload app is the real project.

---

## 3. Decisions locked in

| # | Decision | Choice |
|---|----------|--------|
| 1 | Editing feel | **Payload Live Preview** — fields left, live iframe right (not in-iframe click-to-edit; that's a maybe-later layer) |
| 2 | Scope of editing | **Everything** — Header, Footer, Site Settings, and every existing page |
| 3 | Pages | **Fixed set, edit-only.** No "Add New Page" for now (revisit later) |
| 4 | Admin redesign depth | **Brand reskin + custom views** (not a fully bespoke shell) |
| 5 | Design direction | **Propose one** based on EPL branding (approved look below) |
| 6 | Build order | **Small first:** Header + Site Settings → Footer → Pages list. Admin reskin foundation comes first. |

---

## 4. Information architecture (the admin sidebar)

Four "doors" + a welcome screen:

```
Home (welcome dashboard)
Pages          -> list of all pages -> click -> side-by-side editor + live iframe
Header         -> menu items, dropdowns, logo, CTA button
Footer         -> footer link columns, social, copyright
Site Settings  -> phone, email, address, social links
```

- **Pages** = a Payload **collection** (its list view = the "all pages" screen).
- **Header**, **Footer**, **Site Settings** = Payload **globals** (single editable docs).

---

## 5. Design / brand tokens

Pulled from `src/app/(frontend)/globals.css` — admin will reuse these exactly.

| Token | Value | Use in admin |
|---|---|---|
| `epl-primary` | `#0a3d6b` (navy) | sidebar, headers, primary buttons |
| `epl-secondary` | `#1e6bb8` | links, active states, accents |
| `epl-soft` | `#5b9bd5` | hovers |
| `epl-sky` | `#e8f3fb` | panel backgrounds |
| `epl-mist` | `#f6fafd` | page background |
| `epl-dark` | `#0c2238` | text |
| `epl-muted` | `#5a6b7d` | secondary text |
| `epl-border` | `#d4e4f2` | dividers, card borders |
| font | **Manrope** | everything |

Logo assets available: `public/assets/cropped-EPL-Ghana-logo.png`,
`public/assets/img/logo.svg`, `public/assets/img/logo-white.svg`.

**Approved screens (mockups):** custom navy login, custom welcome dashboard with
4 cards, side-by-side page editor, restyled Pages list, nicer "click to replace"
image tiles. (See chat history for ASCII mockups.)

---

## 6. Current state of the codebase (what's wired vs hardcoded)

- **Already CMS-driven** via `SiteSettings` global (`src/globals/SiteSettings.ts`):
  homepage hero, mission, fellowship banner, core values, stats, contact info.
  Consumed by ~9 of 42 components.
- **Hardcoded** (text + images in JSX): the other ~33 `charitics/*` components
  (~6,700 lines) — team page, fellowship details, contact cards, etc.
- **Header**: `src/components/Header.tsx` (+ Charitics nav in `ChariticsChrome.tsx`)
  reads nav from `src/config/navigation.ts` (hardcoded array). Logo via
  `getSiteLogo()`.
- **Footer**: links hardcoded in `src/config/navigation.ts` (`footerLinks`).
- **Live Preview**: NOT set up yet.
- **Globals today**: one `SiteSettings` global with everything in tabs (the
  "settings tab" feel we're replacing).

> The real bulk of the work = moving hardcoded copy/images out of components and
> into Payload, so the editor has something to edit.

---

## 7. Build phases & checklist

### Phase 0 — Admin reskin foundation
- [x] Add Payload admin branding: custom CSS (navy/Manrope), `admin.meta` title
      -> `src/app/(payload)/custom.scss`, `admin.meta.titleSuffix` in config
- [x] Custom **login** screen (logo + brand)
      -> `src/components/admin/Logo.tsx` via `admin.components.graphics.Logo`
- [x] Custom **welcome dashboard** cards (4 doors, "Coming soon" until each phase lands)
      -> `src/components/admin/BeforeDashboard.tsx` via `admin.components.beforeDashboard`
- [x] Restyle sidebar/nav (navy gradient, light links) + nav brand mark
      -> `.nav` rules in custom.scss, `src/components/admin/NavBrand.tsx`
- [x] Header theme toggle (light / dark / auto) in the main nav bar
      -> `src/components/admin/ThemeToggle.tsx` via `admin.components.actions`
- [x] Dark mode palette + layout surfaces (mist light / navy dark)
      -> `custom.scss` `html[data-theme='dark']` + admin surface tokens
- [x] Welcome dashboard cards use theme-aware CSS classes
      -> `BeforeDashboard.tsx` + `.epl-dashboard` in custom.scss
- [x] Custom "click to replace" image field styling (rounded brand tiles)

### Phase 1 — Header + Site Settings (small first)
- [x] New **`Header`** global: nav items (label + url + dropdown children) + CTA button
      -> `src/globals/Header.ts` (+ `rowLabels/NavItemLabel.tsx` for readable rows)
      - NOTE: logo NOT moved here yet — still lives in Site Settings (avoids dual
        logo fields). Move to Header later if desired.
- [x] Wire **Live Preview** on Header + Site Settings (iframe + refresh-on-save)
      -> `admin.livePreview.url` on both globals + `RefreshRouteOnSave` in
        frontend layout (`@payloadcms/live-preview-react` added)
- [x] `ChariticsChrome` / `ChariticsNav` / frontend layout read nav + CTA from the
      `Header` global via `getHeader()`; fall back to hardcoded `navigation.ts`
- [x] Seed Header global from current nav on first run (`onInit` in payload.config)
- [x] Header + Site Settings dashboard cards flipped to live
- [ ] VERIFY: restart dev server so the new `header` global registers + seed runs,
      then open `/admin/globals/header`, edit a menu label, confirm live preview
      updates the iframe
- [ ] (Phase 3) Slim `SiteSettings` to just contact/social once hero/mission move
      into the Pages collection

### Phase 2 — Footer
- [x] **`Footer`** global: link columns (title + links), about paragraph, copyright
      -> `src/globals/Footer.ts` (+ `rowLabels/FooterColumnLabel.tsx`),
        `defaultValue`-seeded so it opens pre-filled (no manual seed needed)
- [x] `ChariticsChrome` renders footer columns / about / copyright from the global
      via `getFooter()`; falls back to defaults when empty/DB down. `{year}` token
      in the copyright is auto-replaced.
- [x] Live preview on the Footer global + Footer dashboard card flipped to live
- [ ] VERIFY: restart dev server so the `footer` global registers, open
      `/admin/globals/footer`, edit a column/copyright, confirm preview updates
- NOTE: contact row, social icons and footer logo still come from Site Settings

### Phase 3 — Pages (the big one) — IN PROGRESS
- [x] **`Pages`** collection: edit-only (no create/delete), per-slug Live Preview
      (`url: ({data}) => serverURL + data.slug`), `useAsTitle: title`
      -> `src/collections/Pages.ts`
- [x] Seeded 14 fixed page docs (title + slug) via `src/scripts/seedPages.ts`
      -> Pages list is complete; run with `--force` to update content
- [x] Per-page content modeled as a slug-gated group (only that page's fields show)
- [x] **Contact page fully migrated**: hero (eyebrow/title/lead/image/buttons),
      visit, map URL, forms section + both form panels
      -> `getPage()` + `getContactContent()`; Contact route + `ChariticsContactPage`
        read CMS with config fallback; image is an upload (replaces the photo)
- [x] Pages dashboard card flipped to live (`/admin/collections/pages`)
- [ ] VERIFY: restart dev server, open Pages → Contact, edit text / swap the hero
      image, confirm side-by-side preview updates
- [x] **Home page migrated** (decisions: recent/featured projects; Home static
      content moves into Pages → Home):
      - `Pages.home` group (slug '/'): hero, about, mission, core values, stats,
        fellowship + editable section headings (Projects/Events/Blog)
      - `getHomeContent()` layers Pages → Home over Site Settings (blank = falls
        back), returns a Site-Settings-shaped object so home subcomponents are
        unchanged; section headings now editable (`ChariticsHome` reads them)
      - Projects collection: `featuredOnHome` + `homeOrder`; Home shows featured
        projects by order. Events section now shows **upcoming only** (date >= now)
      - Projects/Events/Blog items still come from their collections (API) — only
        headings + static copy are edited here
      - Hero **slider** (multiple slides), **core values** (6), **impact stats**
        (4) and the **gallery** are now editable too — pre-filled from the config
        defaults. Hero-slide + gallery IMAGES fall back to the current photos;
        upload in the admin to replace (text/structure pre-fills, images don't —
        external CDN URLs can't be upload defaults without sideloading to Media)
- [ ] STAGED: slim Site Settings UI (hide the now-duplicated home tabs) once
      Pages → Home is verified — currently Site Settings still holds them as the
      fallback source (nothing broken, just redundant)
- [x] CDN image import: `src/scripts/importMedia.ts` pulls the live-site images
      into Media and wires them into Home + Contact image fields (run once).
      Home doc now fully populated (heroSlides/coreValues/stats/gallery + images).
- [x] **About page migrated**: `Pages.about` group (intro, approach, story,
      mission/vision/impact tabs, why-partner, stats, testimonials);
      `getAboutContent()` merges CMS over `aboutPageContent` with config fallback;
      `ChariticsAboutPage` + Intro/Tabs/WhyPartner/Stats wired to props.
      Seeded from config + images via `src/scripts/seedAbout.ts`.
- [x] **Our Team page migrated (API pattern)**: new **`Team` collection**
      (name, role, group board/team, bio, photo, socials, order, status); page
      heading is static in `Pages.team`; `getTeamContent()` GETs published members
      (avatar fallback) + intro; `ChariticsTeamPage` reads `content` prop; route
      is async. Seeded 10 members via `src/scripts/seedTeam.ts` (photos empty →
      generated avatar until real photos uploaded).
- PRINCIPLE (confirmed): dynamic lists (team, board, testimonials, projects,
  events, news) come from collections via API — only static text/images become
  page fields. Migrate remaining pages accordingly.
- [x] About-page testimonials now come from the **Testimonials collection**
      (route queries it + `resolveFellowTestimonials`, mock fallback when empty);
      removed the static testimonials field from `Pages.about` / `getAboutContent`
      / `seedAbout`. Matches the Home page pattern.
- [x] **Testimonials collection built**: publish/draft status, featured flag for
      Home, portrait photo, order; `getFeaturedTestimonials()` / `getPublishedTestimonials()`;
      `seedTestimonials.ts` (7 fellow quotes + photos from live site). Dashboard door.
- [x] **What We Do page migrated**: `Pages.whatWeDo` group (intro, programmes
      section headings, approach steps, CTA); programme cards from the **Projects
      collection** (published, config fallback); `getWhatWeDoContent()` merges CMS
      over `aboutSectionContent`; `ChariticsWhatWeDoPage` reads `content` prop;
      route is async. Seeded via `src/scripts/seedWhatWeDo.ts`.
- [x] **Country Director message migrated**: `Pages.directorMessage` group
      (header, greeting, paragraphs, pull quote, signoff, team CTA); director
      name/photo/contact from **Team collection** (Country Director role, config
      fallback); `getDirectorMessageContent()`; `ChariticsDirectorMessage` reads
      `content` prop; route is async. Seeded via `src/scripts/seedDirectorMessage.ts`.
- [x] **Projects page migrated**: `Pages.projects` group (intro paragraphs, partner CTA);
      bento grid from **Projects collection**; `getProjectsPageContent()`;
      seeded via `seedProjects.ts` + `seedProjectsPage.ts`.
- [x] **Public Service Fellowship detail migrated**: `Projects.fellowshipDetail`
      group (hero, impact, why join, programme steps, application process,
      eligibility, CTAs) when `detailLayout` = fellowship; live preview on Projects;
      `getFellowshipProjectContent()`; seeded via `seedFellowshipDetail.ts`.
- [x] **P.E.A.C.E detail migrated**: `Projects.peaceDetail` group; `detailLayout` =
      peace; `getPeaceProjectContent()`; seeded via `seedPeaceDetail.ts`.
- [x] **Women on the Rise detail migrated**: `Projects.wotrDetail` group;
      `detailLayout` = wotr; `getWotrProjectContent()`; seeded via `seedWotrDetail.ts`.
      All three flagship project pages are now CMS-editable in Projects.
- [x] **Our Partners page migrated**: `Pages.partnersPage` group (intro, section
      headings, stats, CTA); **Partners collection** (strategic + host types, logo,
      description, programmes, publish/draft, create/edit/delete);
      `getPartnersPageContent()`; dashboard **Partners** door. Seeded via
      `seedPartnersPage.ts` + `seedPartners.ts`.
- [x] **Current Fellows page migrated**: `Pages.currentFellowsPage` group (hero,
      highlight headings, cohort band, CTA); **Fellows collection** (photo, bio,
      institution, featured highlight, contact/socials, publish/draft);
      `getCurrentFellowsContent()`; click-to-view profile drawer (same pattern as
      Team); dashboard **Fellows** door. Seeded via `seedCurrentFellowsPage.ts` +
      `seedFellows.ts`.
- [x] **EPLAN page migrated**: `Pages.eplanPage` group (all static sections);
      **Alumni collection** (stories + featured profiles with toggles); stories
      carousel when more than 3 entries; click-to-read story drawer; Community
      Moments as scrolling gallery; `getEplanPageContent()`; dashboard **Alumni**
      door. Seeded via `seedEplanPage.ts` + `seedAlumni.ts`.
- [x] **Blog migrated (API-only)**: **News** collection relabelled Blog Posts —
      rich text (Lexical), category, tags, featured on home; dynamic sidebar
      categories/tag cloud; article detail renders CMS rich text;
      `seedBlogPosts.ts` imports from live WordPress. Dashboard **Blog Posts** door.
- [x] **News & Events page migrated (API)**: `/news/events` pulls **featured stories**
      from Blog Posts (`featuredOnHome` or latest) and **past events** from Events
      collection (`eventDate` in the past). Home **countdown** to next upcoming event.
      `seedEvents.ts` seeds event records. Dashboard **Events** door.
- [x] **Annual Reports migrated (CMS)**: **Publications** collection — annual impact
      reports (cover + PDF) and research documents; `Pages.annualReportsPage` for intro
      and headings; `getAnnualReportsPageContent()`; `seedPublications.ts` +
      `seedAnnualReportsPage.ts`. Dashboard **Publications** door.
- [x] **Get Involved page migrated (CMS)**: `Pages.getInvolvedPage` group (hero,
      fellowship copy, pathways, register-interest form labels); `getGetInvolvedPageContent()`
      with Site Settings fallback for fellowship fields; `seedGetInvolvedPage.ts`.
      Form submissions saved to **Form Submissions** collection.
- [x] **Form submissions (dashboard inbox)**: Register Interest, Internship &
      Volunteering, and Partnership forms POST to `/api/form-submit` and appear in
      **Form Submissions** (`new` / `reviewed` / `archived`). Email notifications later.
- [ ] Migrate the remaining ~2 pages one by one (static fields + collections)
- [ ] Restyle the page-edit view (brand polish on the split view)

### Later / maybe
- [ ] In-iframe click-to-edit layer (Elementor-style) — only if side-by-side isn't enough
- [ ] "Add New Page" (freeform / block-based)
- [ ] REST API to fetch members (separate future task)

---

## 8. Way forward (next step)

Start **Phase 0** (admin reskin foundation) so we're building features into a
branded shell, then immediately roll into **Phase 1** (Header + Site Settings
with live preview). Update the checkboxes above as each item lands.
