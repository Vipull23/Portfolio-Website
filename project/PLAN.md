# Netflix Portfolio: Analysis & Next Step

## Context
Vipul asked for a full analysis of the portfolio (a Vite + React 18 + TS + Tailwind site with a Netflix theme), an opinion on it, a list of what's missing, and a recommendation for what to work on next. The recommended next step is a **foundation pass**: fix real bugs, remove duplicated and dead code, and make the site ready for mobile and deployment, so that the bigger Netflix-style features later have a clean base.

## What each file does
- `src/main.tsx`: mounts `<App/>`. `src/App.tsx`: React Router with 6 routes.
- `src/pages/Landing.tsx`: the "Who's watching" profile picker at `/`. It has 4 tiles; clicking one plays a framer-motion zoom and then navigates after 550ms.
- `src/pages/About.tsx`: hero, a bio paragraph, and Email/LinkedIn/GitHub icons.
- `src/pages/Projects.tsx`: one `CarouselRow` called "Backend Projects" with 3 cards that link to `/projects/:id`.
- `src/pages/ProjectDetail.tsx` (606 lines): holds all project case-study data (`projectData`). It shows the overview, an architecture diagram, accordion flows and problems, tech stack and endpoint tables, placeholder screenshots, and a GitHub CTA.
- `src/pages/Skills.tsx`: 4 skill carousels plus a certifications row. Clicking a cert opens it in `CertificateModal`.
- `src/pages/Resume.tsx`: view/download `public/resume/resume.pdf`, plus project, education and cert cards.
- `src/components/`: `Navbar` (fixed top bar with a back arrow and links), `CarouselRow` (horizontal snap scroller with arrows), `ProfileTile` (landing tile), `CertificateModal` (iframe PDF viewer).
- `public/`: the resume and 2 certificate PDFs. `public/another/` is empty.
- `.bolt/`: leftovers from the Bolt.new scaffold.

## Verdict
The structure is solid and the case-study pages are the strongest part, well above an average portfolio. The weak points are the "Netflix feel" (it is mostly limited to the landing page) and some Bolt-scaffold leftovers.

### Bugs found
1. **The landing entrance animation never runs.** The code uses `animate-fade-up`, but `tailwind.config.js` defines the animation as `fadeUp`, so the class Tailwind generates is `animate-fadeUp`.
2. The landing avatar is an **Unsplash stock photo** with the alt text "Vipul Sharma".
3. The "Manage Profiles" button does nothing.
4. The `ProjectDetail` architecture connector says **"REST / OpenFeign" for every project**, which is wrong for the Library and MovieNow monoliths.
5. The Screenshots section shows literal "Postman screenshot 1/2/3" placeholders, and the `screenshots` field is never used.
6. `index.html`: the title is "Netflix Themed Portfolio", the OG image is Bolt's, and the favicon `/vite.svg` does not exist. There is no meta description.
7. The Navbar overflows on phones (wordmark plus 4 links, no mobile menu).
8. `CarouselRow`: `hover:scale-105` cards get clipped by the overflow container, and the arrows show even when nothing can scroll.
9. `CertificateModal`: Esc does not close it, the page behind still scrolls, there is no `role="dialog"`, and PDFs in iframes often don't render on mobile, so it needs an "Open in new tab" fallback.
10. There is no 404 route, and scroll position is kept between routes.

### Inconsistencies and cleanup
- The same data is copied in several places. Certs are defined in both `Skills.tsx` and `Resume.tsx`. Project info is in `Projects.tsx`, `ProjectDetail.tsx` and `Resume.tsx`, and the copies already disagree: the E-Wallet dates are "2024 — Present" in one place and "Dec 2025 — Present" in another.
- Large commented-out old versions remain in `CarouselRow.tsx`, `Skills.tsx` and `Resume.tsx`. Git already keeps that history.
- `@supabase/supabase-js` is installed but never used. The package name is still `vite-react-typescript-starter`.
- `#141414`, `#E50914` and the other colours are hard-coded hex values all over the code instead of Tailwind theme tokens.
- Every page repeats the same `min-h-screen bg-[#141414]` + `<Navbar/>` wrapper.
- **Check the claims against your repos.** The E-Wallet page mentions the Saga pattern, circuit breakers, Eureka, Docker and "sub-100ms" latency. Interviewers will ask about these, so keep only what the code actually does.

### What's missing (feature ideas, for later)
- **Netflix billboard hero** on Projects: a large featured project with "▶ View Case Study" and "ⓘ More Info" buttons, the signature Netflix screen.
- **Poster-style project cards** (art or gradient plus title treatment) instead of flat colour blocks, and hover-expand previews.
- **Experience / Journey as an "episodes" list**, plus a "Continue Watching = currently learning" row.
- **Persona-based profiles** on the landing page (Recruiter / Developer / Curious) that reorder the content, instead of tiles that just duplicate the navbar.
- Netflix "ta-dum" intro on first visit, "98% Match"-style skill badges, and a contact form.
- Real screenshots or GIFs, a live demo or Swagger link per project.
- SEO and social preview, deploy config, analytics.

## Recommended next step: the foundation pass
Do this before adding features, because every feature above becomes easier with a single data source and a shared layout.

1. **Centralise content** into `src/data/`: `projects.ts` (merge the card data from `Projects.tsx` with `projectData` from `ProjectDetail.tsx`, and add `period`/`resumeBullets` so `Resume.tsx` reads from it), `certifications.ts`, `skills.ts`, `profile.ts` (name, links, location, bio). The pages then only import data.
2. **Theme tokens** in `tailwind.config.js`: `colors.netflix.{bg:'#141414', surface:'#1f1f1f', red:'#E50914', muted:'#9b9b9b', …}`. Replace the hex values across pages and components.
3. **Layout route**: a `src/components/Layout.tsx` with the Navbar, the background, an `<Outlet/>` and scroll-to-top. Nest the inner routes under it in `App.tsx`, and add a `*` route for a Netflix-style "Lost your way?" 404 page.
4. **Bug fixes**:
   - `animate-fade-up` → `animate-fadeUp` (Landing).
   - A real avatar in `public/`.
   - Remove or repurpose "Manage Profiles".
   - Add a `connectorLabel` to each project's architecture.
   - Render `screenshots` when present; otherwise hide the section.
   - Mobile hamburger menu in `Navbar`.
   - `CarouselRow`: add `py-3` padding inside the scroller so scaled cards aren't clipped, and hide the arrows when the row doesn't overflow or is at the start or end.
   - `CertificateModal`: Esc to close, body scroll lock, `role="dialog"`/`aria-modal`, and an "Open in new tab" link.
5. **Cleanup**: delete the commented-out blocks and the empty `public/another/`, uninstall `@supabase/supabase-js`, rename the package.
6. **`index.html`**: a real title and meta description, a favicon (a red "V" SVG), and OG tags.
7. **Deploy readiness**: add `vercel.json` (or `public/_redirects` for Netlify) with an SPA rewrite so that refreshing `/projects/movienow` doesn't return a 404.

After that, the next feature to build is the **Projects billboard and poster cards**, since that is the most visible Netflix upgrade.

## Verification
- `npm run typecheck` and `npm run lint` pass.
- `npm run dev` checks:
  - The landing tiles fade up on load.
  - Every route renders and an unknown URL shows the 404 page.
  - Resume and Skills show the same certs, taken from one source.
  - The E-Wallet dates match everywhere.
  - At 375px width the navbar collapses into the menu with no horizontal scroll.
  - Carousel cards scale without clipping.
  - The modal closes on Esc and the background doesn't scroll.
- `npm run build && npm run preview`, then refresh on a `/projects/:id` URL.

## Progress
- [x] Foundation pass (data in `src/data/`, `nf-*` theme tokens, Layout + 404, bug fixes, cleanup, deploy config), done 2026-10-03.
- [x] Experience page: a 5th landing tile plus `/experience`, in Netflix "series + episodes" style, driven by `work` in `src/data/experience.ts`. Done 2026-10-05.
- [x] Projects billboard hero + poster-style cards.
- [x] Netflix redesign of every page (2026-10-05): shared `Billboard`, transparent-on-top navbar, footer; Projects (poster art, Top 3 row, genre filter, hover cards, "More Info" preview modal); ProjectDetail (episodes, behind the scenes, more like this); Skills (Top 10, search, "Seen in" links computed from project/work data, certificate cards); Resume and Experience billboards.
- [x] Review fixes (2026-10-05): landing redesigned as Netflix "Who's exploring?" with vivid profiles, "V" intro (once per session, skipped for reduced motion), Download Resume button; content left-aligned with the billboard; billboard art on phones; per-page tab titles; reduced-motion support; per-page code splitting; screenshot lightbox ("Trailers & More"); link-preview image + app icons (sources in `scripts/`).
- [ ] Add Vipul's photo (`avatarUrl` in `src/data/profile.ts`) and Postman screenshots (`screenshots` in `src/data/projects.tsx`, files in `public/screenshots/`).
- [ ] After deploying: make `og:image` in `index.html` an absolute URL and add `og:url`.
