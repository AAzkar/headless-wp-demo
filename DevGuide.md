# Headless WordPress + Next.js Learning Journey

## Project Goal
Build a modern headless WordPress website using:

- WordPress as CMS
- WPGraphQL
- ACF Gutenberg Blocks
- Next.js frontend
- Tailwind CSS
- Component-driven architecture

---

# Phase 1 — Project Setup

## Created Next.js App

Command:

```bash
npx create-next-app@latest headless-wp-demo
```

Tech selected:

- App Router
- Tailwind CSS
- JavaScript
- ESLint

---

## Connected WordPress GraphQL

Installed WordPress plugin:

- WPGraphQL

Created:

```txt
lib/wordpress.js
```

Purpose:

Reusable GraphQL fetch helper.

Built:

- fetchGraphQL()
- endpoint communication
- error handling

Learned:

- GraphQL POST requests
- async fetching
- reusable data layer

---

# Phase 2 — Blog Integration

Built homepage blog listing.

Query:

- posts
- title
- slug
- excerpt
- date

Created:

```txt
app/page.js
```

Learned:

- server components
- data fetching in Next.js
- mapping arrays
- dangerouslySetInnerHTML

---

## Single Blog Post Page

Created dynamic route:

```txt
app/post/[slug]/page.js
```

Built:

- query by slug
- dynamic rendering
- fallback handling

Learned:

- dynamic routing
- params
- GraphQL variables
- notFound()

---

# Phase 3 — Images

Added:

- featured images
- Next Image

Updated:

```txt
next.config.mjs
```

Added remote domain support.

Learned:

- image optimization
- hostname whitelisting

---

# Phase 4 — Header / Footer

Built:

```txt
components/Header.js
components/Footer.js
```

Integrated:

- WordPress menu
- general settings

Learned:

- shared layout components
- reusable site structure

---

# Phase 5 — Dynamic Pages

Created:

```txt
app/[slug]/page.js
```

Built:

- WordPress page rendering
- dynamic metadata

Learned:

- generateMetadata()
- dynamic SEO titles
- route rendering

---

# Phase 6 — Gutenberg + ACF Blocks

Installed:

- Advanced Custom Fields
- WPGraphQL Blocks

Created custom WordPress blocks:

```txt
blocks/hero/
blocks/features-grid/
blocks/testimonials/
```

Built:

- block.json
- PHP render templates
- ACF field groups

Learned:

- Gutenberg block registration
- ACF block architecture
- block JSON schema

---

# Phase 7 — React Block Renderer

Created:

```txt
components/BlockRenderer.js
```

Architecture:

WordPress block JSON
→ React component mapping

Started with:

```js
if statements
```

Refactored to:

```js
blockMap registry
```

Example:

```js
'acf/hero': HeroBlock
```

Learned:

- scalable component architecture
- registry patterns

---

# Phase 8 — Hero Block

Created:

```txt
components/blocks/HeroBlock.js
```

Features:

- dynamic content
- CTA
- SaaS styling
- gradients
- glass UI

Learned:

- reusable props
- component rendering
- premium UI composition

---

# Phase 9 — Features Grid

Created:

```txt
components/blocks/FeaturesGridBlock.js
```

Built:

- ACF repeater parsing
- dynamic feature cards
- Lucide icon system prep

Learned:

- indexed repeater extraction
- array rebuilding

Example:

```js
features_0_title
features_1_title
```

converted into:

```js
features[]
```

---

# Phase 10 — Testimonials Slider

Installed:

```bash
npm install swiper
```

Created:

```txt
components/blocks/TestimonialsBlock.js
```

Features:

- client component
- Swiper slider
- profile images
- breakpoints

Learned:

- "use client"
- interactive components
- browser-side rendering

---

# Phase 11 — Native Gutenberg Support

Created:

```txt
components/CoreBlockRenderer.js
```

Supports:

- paragraph
- heading
- image
- list

Learned:

- core Gutenberg rendering
- fallback component rendering

---

# Phase 12 — UI System

Created:

```txt
components/ui/IconRenderer.js
```

Installed:

```bash
npm install lucide-react
```

Purpose:

Reusable icon rendering by name.

Example:

```js
<IconRenderer name="Shield" />
```

Learned:

- global component systems
- icon registry pattern

---

# Phase 13 — Git Workflow

Learned:

Main branch:

```bash
main
```

Feature branches:

```bash
git checkout -b saas-landing-v1
```

Deployment:

```bash
git add .
git commit -m "..."
git push
```

---


# Phase 14 — GSAP + Premium Motion UI

## Goal
Add smooth, premium animations to the headless WordPress + Next.js landing page.

## Packages

```bash
npm install gsap @gsap/react

---

# Architecture Summary

WordPress CMS
↓
WPGraphQL
↓
GraphQL fetch layer
↓
Next.js App Router
↓
Dynamic routes
↓
BlockRenderer registry
↓
React block components
↓
Tailwind UI
↓
Vercel deployment

---

# Next Learning Steps

## UI
- FAQ block
- Pricing block
- Logo cloud
- CTA banner

## Content
- blog archive
- categories
- search

## SEO
- metadata
- OG tags
- sitemap
- robots

## Advanced
- authentication
- headless WooCommerce
- dashboards
- server actions
- API routes