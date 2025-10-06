# Sjuul Studios — Portfolio (Next.js 14)

Production-ready portfolio with anchored single-page sections, case study subpages (MDX frontmatter), and a contact page.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + class-variance-authority
- shadcn/ui-ready components (can be added later)
- Framer Motion (optional subtle reveals)
- Embla Carousel or CSS scroll-snap (lightweight variant used here)
- next-themes (dark mode default)
- Icons: lucide-react + simple-icons
- Media: next/image + HTML5 video

## Getting Started
1. cd "@SJUUL STUDIOS WEBSITE"
2. Install deps: npm i (or pnpm i)
3. Dev: npm run dev
4. Build: npm run build && npm start

## Content
- Config at `config/site.ts` (company, links, services, order)
- Case studies: add MDX files in `content/case-studies/*.mdx` using frontmatter model
- Assets under `public/images` and `public/logos`

### MDX Frontmatter Model
```
title: "Campaign Title"
client: "Client Name"
slug: "client-campaign"
date: "2025-01-01"
excerpt: "Short summary."
tags: ["TikTok","Strategy","Creative","Advertising","Music Marketing"]
heroVideo: "/videos/client-hero.mp4"
cover: "/images/client-cover.jpg"
videos:
  - src: "/videos/vertical-1.mp4"
  - src: "/videos/vertical-2.mp4"
  - src: "/videos/vertical-3.mp4"
results:
  - label: "Views"
    value: "—"
  - label: "Engagement Rate"
    value: "—"
```

The app reads frontmatter only; MDX body is optional.

## Accessibility
- Keyboard arrow buttons on carousel
- Reduced-motion friendly marquee
- Visible focus states

## SEO
- `app/robots.ts`, `app/sitemap.ts`
- Add env `NEXT_PUBLIC_SITE_URL` for absolute URLs

## Analytics
Set `analytics.plausibleDomain` in `config/site.ts` and add your provider.

## Enable Contact Form Later
- Implement in `app/api/contact/route.ts`
- Connect Resend/SMTP and send emails on POST with rate limiting
- Add a form to `/contact` and POST to `/api/contact`

## Deploy (Vercel)
1. Push to GitHub
2. Import on Vercel (set Root Directory to `@SJUUL STUDIOS WEBSITE` if needed)
3. Set env `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com`
4. Configure DNS to the Vercel project
