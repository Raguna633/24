# AI Coding Agent Instructions for Buken Web (Yearbook 2025)

## Project Overview
This is an **Astro-based digital yearbook website** for Indonesian high school (AZZARQO - Class 2025). It's a static site generator project built with Astro 5.x, Tailwind CSS 4.x, and deployed on Vercel. The site showcases student profiles, class galleries, teacher greetings, and nostalgic memories from the school years.

**Tech Stack:**
- Framework: Astro 5.16.6 (SSG - Static Site Generation)
- Styling: Tailwind CSS 4.1.18 + Tailwind CSS Vite plugin
- Client Components: React 19 (minimal usage, for interactive elements)
- Content: Static/hardcoded (no CMS yet)
- Carousel Library: Swiper 12.x
- Deployment: Vercel

**Dev Commands:**
```bash
npm run dev          # Start dev server (hot reload)
npm run build        # Build static site to /dist
npm run preview      # Preview built site locally
npm run astro        # Run astro CLI commands
```

---

## Architecture & Data Flow

### Page Structure (Astro Routing)
- **Home** (`src/pages/index.astro`): Multi-section landing with hero, greetings, carousel
- **Classes Index** (`src/pages/classes/index.astro`): List all classes
- **Dynamic Class Pages** (`src/pages/classes/[jenjang]/[kelas].astro`):
  - Jenjang values: `smk`, `sma`
  - Routes like `/classes/smk/xii-a-pplg` render specific class content
  - Uses `getStaticPaths()` for static generation - **must update both places when adding classes**
- **Uniform** (`src/pages/uniform.astro`): Uniform gallery page

### Component Architecture
```
MainLayout (global header/footer, meta, transitions)
├── Section Components (HeroSection, AboutSection, GreetingSection, JourneySection)
├── Card Components (StudentCard, TeacherCard, ClassesCard, MemoryCard)
├── Class-specific Components
│   └── /classes/smk/a-pplg.astro (XII A PPLG layout - hardcoded content)
└── Utility Components (Button, Input, FormattedDate, WaveCanvas)
```

### Key Design Pattern: Hardcoded Class Content
Each class currently has its own Astro component file (e.g., `src/components/classes/smk/a-pplg.astro`). When adding new classes:
1. Create new file in `src/components/classes/{jenjang}/{class-name}.astro`
2. Import it in the dynamic route file
3. Add static path to `getStaticPaths()` in `[kelas].astro`
4. Follow existing class component structure (hero image, wali kelas, student grid)

---

## Styling & Theme

### Tailwind Configuration
**Color System** (defined in `tailwind.config.mjs`):
- **Primary** (Beige): `#f5f0ea` - base background & warm tone
- **Secondary** (Blue): `#3557A2` - accents & secondary CTAs
- **Accent** (Purple): `#2A358F` - special highlights

**Typography:**
- Headings: Nirmala UI
- Body: Poppins
- Use `text-shadow` utility for depth on dark overlays

### CSS Patterns
- Global styles in `src/styles/global.css` (customizable theme vars)
- Tailwind utilities in `src/styles/tailwind.css`
- **No component CSS files** - all styles inline in Astro templates
- Use `clamp()` for responsive sizing (e.g., `text-[clamp(1.5rem,6vw,4rem)]`)

### Responsive Approach
- Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Hero sections use absolute positioning with responsive heights
- Images use `sizes="100vw"` attribute for Astro Image optimization

---

## Layout & Viewport Management

### MainLayout Features
- **Client Router** with `fade` & `slide` transitions enabled (`astro:transitions`)
- **forceDesktopView** prop: Forces desktop layout even on mobile (used for class pages)
  - Set via `MainLayout` prop: `forceDesktopView={true}`
  - Managed by inline script in head (applies before render)
- **Viewport Meta** dynamically set based on viewport preference
- **Vercel Analytics** integrated
- **SEO Meta Tags**: title, description, OG image, canonical URL, noIndex support

### Common Props Pattern
```astro
<MainLayout 
  title="Page Title"
  description="SEO description"
  image="/og-image.jpg"
  noIndex={false}
  forceDesktopView={false}
>
  {/* content */}
</MainLayout>
```

---

## Client-Side Features & Interactions

### Swiper Carousel
Used in index homepage (`src/pages/index.astro`):
- Import: `swiper/css`, `swiper/css/autoplay`, `swiper/css/pagination`, etc.
- Initialized via `src/scripts/swiper.ts` (if used)
- **Important**: CSS imports must come before component in `.astro` files

### WaveCanvas
React component (`src/components/WaveCanvas.astro`) - handles animated wave effect
- Client-side animation
- Uses React interop

### Form Components
- `Button.astro`: Variants (primary, secondary, outline, ghost), sizes (sm, md, lg), full-width support
- `Input.astro`: Basic form input wrapper
- Both use Tailwind classes + custom component-level defaults

---

## Image Handling

### Image Imports & Optimization
- **Use Astro Image component**: `import Image from "astro/components/Image.astro"`
- **Type safety**: `import type { ImageMetadata } from 'astro'`
- **Local images**: Import as ES modules from `src/assets/` or `public/assets/class/`
- **Astro optimizes**: Automatic AVIF/WebP conversion, responsive srcset
- **Always provide `sizes` attribute** for proper responsive behavior
- **Class assets** stored in: `public/assets/class/{jenjang}/{class-name}/`

Example:
```astro
import heroBg from "../../../../public/assets/class/a_pplg/bg1.jpg";
<Image src={heroBg} alt="Hero" sizes="100vw" />
```

---

## Common Workflows & Conventions

### Adding a New Class
1. Create student data file or hardcode in component
2. Create class component: `src/components/classes/{jenjang}/{class-name}.astro`
3. Add to dynamic route's `getStaticPaths()` array
4. Add class assets to `public/assets/class/{jenjang}/{class-name}/`
5. Follow existing class layout: hero section, wali kelas info, student grid

### Page Transitions
- Built-in via `astro:transitions` in MainLayout
- Default: `fade` transition
- Can use `slide` for specific elements
- **Note**: Transitions bypass full page reload - state persists

### Responsive Image Galleries
- Use `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4` pattern
- Wrap images in containers for consistent aspect ratio
- Example: `src/components/StudentCard.astro`, `src/components/ClassesCard.astro`

---

## Known Issues & Patterns

### Static Generation
- `output: 'static'` in `astro.config.mjs` - fully pre-built HTML
- No server-side rendering - all pages pre-rendered at build time
- Dynamic content must use `getStaticPaths()` to define all routes

### Asset Paths
- `src/assets/` - Source assets (imported via JS/TS)
- `public/assets/` - Static assets (direct file references)
- Class-specific assets: `public/assets/class/{jenjang}/{class-name}/`

### Unused Integrations
- Content collections disabled in `src/content.config.ts` (blog not implemented yet)
- MDX integration available but not in use
- Sitemap & RSS configured but may need URL updates

---

## Commands & Build Info

**Development:**
```bash
npm run dev      # http://localhost:3000 with hot reload
```

**Production:**
```bash
npm run build    # Creates /dist folder with optimized static files
npm run preview  # Serve built site locally to test before deploy
```

**Build Optimizations** (in `astro.config.mjs`):
- `inlineStylesheets: 'auto'` - Inlines small CSS/JS bundles
- Tailwind CSS v4 Vite plugin for efficient CSS processing
- Sharp for fast image optimization

---

## Important Files Reference

| File | Purpose |
|------|---------|
| `src/layouts/MainLayout.astro` | Global layout with header, footer, transitions, viewport logic |
| `src/pages/index.astro` | Homepage - greeting sections, carousel, hero |
| `src/pages/classes/[jenjang]/[kelas].astro` | Dynamic class route & path definitions |
| `src/components/classes/smk/a-pplg.astro` | Example class component structure |
| `tailwind.config.mjs` | Theme colors, typography, custom utilities |
| `src/styles/global.css` | Global CSS & theme variables |
| `astro.config.mjs` | Astro config, integrations, build settings |

---

## When to Ask for Clarification
- Class naming conventions (slug format varies: `xii-a-pplg` vs `XII-A-PPLG`)
- Whether new content should be hardcoded or prepared for CMS integration
- Image requirements (dimensions, formats, compression targets)
- Deployment environment specifics (Vercel config, domain, analytics)
